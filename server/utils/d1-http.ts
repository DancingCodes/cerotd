import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { H3Event } from 'h3'

type D1HttpMeta = {
  changes?: number
  last_row_id?: number
  duration?: number
  rows_read?: number
  rows_written?: number
  size_after?: number
  changed_db?: boolean
}

type D1HttpQueryResult = {
  results?: Record<string, unknown>[]
  success?: boolean
  meta?: D1HttpMeta
}

type CredentialSet = {
  accountId: string
  databaseId: string
  token: string
}

function readWranglerOauthToken() {
  const home = homedir()
  const candidates = [
    join(process.env.APPDATA || '', 'xdg.config', '.wrangler', 'config', 'default.toml'),
    join(home, '.config', '.wrangler', 'config', 'default.toml'),
    join(home, '.wrangler', 'config', 'default.toml')
  ]

  for (const file of candidates) {
    if (!file || !existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    const matched = text.match(/oauth_token\s*=\s*"([^"]+)"/)
    if (matched?.[1]) return matched[1]
  }
  return ''
}

function resolveCredentials(event: H3Event): CredentialSet | null {
  const env = event.context.cloudflare?.env as Record<string, string | undefined> | undefined

  // Defaults match wrangler.toml; override via env when needed.
  const accountId = String(
    env?.CLOUDFLARE_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID || '667e3f45b48352fd6cdaabd75e08d5dd'
  ).trim()
  const databaseId = String(
    env?.CLOUDFLARE_D1_DATABASE_ID ||
      process.env.CLOUDFLARE_D1_DATABASE_ID ||
      'f1c1d1b6-4952-401e-a005-49cad234dfa6'
  ).trim()
  const token = String(
    env?.CLOUDFLARE_API_TOKEN ||
      process.env.CLOUDFLARE_API_TOKEN ||
      (import.meta.dev ? readWranglerOauthToken() : '') ||
      ''
  ).trim()

  if (!accountId || !databaseId || !token) return null
  return { accountId, databaseId, token }
}

async function queryD1(creds: CredentialSet, sql: string, params: unknown[]) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${creds.accountId}/d1/database/${creds.databaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sql, params })
    }
  )

  const payload = (await response.json()) as {
    success?: boolean
    errors?: Array<{ message?: string }>
    result?: D1HttpQueryResult[]
  }

  if (!response.ok || payload.success === false) {
    const message = payload.errors?.map((item) => item.message).filter(Boolean).join('; ') || `HTTP ${response.status}`
    throw createError({
      statusCode: 500,
      statusMessage: `D1 HTTP error: ${message}`
    })
  }

  return payload.result?.[0] || { results: [], success: true, meta: {} }
}

class HttpD1PreparedStatement {
  constructor(
    private readonly creds: CredentialSet,
    private readonly sql: string,
    private readonly params: unknown[] = []
  ) {}

  bind(...values: unknown[]) {
    return new HttpD1PreparedStatement(this.creds, this.sql, values)
  }

  async first<T = Record<string, unknown>>(colName?: string): Promise<T | null> {
    const result = await queryD1(this.creds, this.sql, this.params)
    const row = (result.results || [])[0]
    if (!row) return null
    if (colName) return (row[colName] as T) ?? null
    return row as T
  }

  async all<T = Record<string, unknown>>(): Promise<D1Result<T>> {
    const result = await queryD1(this.creds, this.sql, this.params)
    return {
      success: true,
      meta: {
        changes: result.meta?.changes || 0,
        last_row_id: result.meta?.last_row_id || 0,
        duration: result.meta?.duration || 0,
        rows_read: result.meta?.rows_read || 0,
        rows_written: result.meta?.rows_written || 0,
        size_after: result.meta?.size_after || 0,
        changed_db: Boolean(result.meta?.changed_db)
      },
      results: (result.results || []) as T[]
    }
  }

  async run(): Promise<D1Result> {
    return this.all()
  }

  async raw<T = unknown[]>(options?: { columnNames?: boolean }): Promise<T[] | [string[], ...T[]]> {
    const result = await this.all<Record<string, unknown>>()
    const rows = result.results || []
    if (!rows.length) {
      return (options?.columnNames ? [[]] : []) as T[] | [string[], ...T[]]
    }
    const firstRow = rows[0]
    if (!firstRow) {
      return (options?.columnNames ? [[]] : []) as T[] | [string[], ...T[]]
    }
    const columns = Object.keys(firstRow)
    const values = rows.map((row) => columns.map((key) => row[key])) as T[]
    if (options?.columnNames) return [columns, ...values] as [string[], ...T[]]
    return values
  }
}

class HttpD1Database {
  constructor(private readonly creds: CredentialSet) {}

  prepare(sql: string) {
    return new HttpD1PreparedStatement(this.creds, sql)
  }

  async dump() {
    throw createError({ statusCode: 500, statusMessage: 'D1 dump() is not supported via HTTP fallback' })
  }

  async batch<T = unknown>(statements: D1PreparedStatement[]) {
    const results: D1Result<T>[] = []
    for (const statement of statements) {
      results.push((await statement.all()) as D1Result<T>)
    }
    return results
  }

  async exec(query: string) {
    await queryD1(this.creds, query, [])
    return { count: 0, duration: 0 }
  }
}

export function tryCreateHttpD1(event: H3Event): D1Database | null {
  const creds = resolveCredentials(event)
  if (!creds) return null
  return new HttpD1Database(creds) as unknown as D1Database
}
