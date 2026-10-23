/// <reference types="@cloudflare/workers-types" />

declare module 'h3' {
  interface H3EventContext {
    cloudflare?: {
      env: {
        DB: D1Database
        MEDIA: R2Bucket
        ADMIN_API_TOKEN?: string
      }
    }
  }
}


export {}
