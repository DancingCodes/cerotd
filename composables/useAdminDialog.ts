export type AdminDialogKind = 'confirm' | 'alert'

export type AdminDialogState = {
  open: boolean
  kind: AdminDialogKind
  title: string
  message: string
  confirmText: string
  cancelText: string
}

export function useAdminDialog() {
  const { t } = useI18n()
  const dialog = reactive<AdminDialogState>({
    open: false,
    kind: 'alert',
    title: '',
    message: '',
    confirmText: '',
    cancelText: ''
  })

  let resolver: ((confirmed: boolean) => void) | null = null

  function close(confirmed: boolean) {
    const resolve = resolver
    resolver = null
    dialog.open = false
    resolve?.(confirmed)
  }

  function open(options: {
    kind: AdminDialogKind
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
  }) {
    dialog.kind = options.kind
    dialog.title = options.title || t(options.kind === 'confirm' ? 'admin.dialog.confirmTitle' : 'admin.dialog.alertTitle')
    dialog.message = options.message
    dialog.confirmText = options.confirmText || t(options.kind === 'confirm' ? 'admin.dialog.confirm' : 'admin.dialog.close')
    dialog.cancelText = options.cancelText || t('admin.dialog.cancel')
    dialog.open = true

    return new Promise<boolean>((resolve) => {
      resolver = resolve
    })
  }

  function confirm(message: string, options: { title?: string; confirmText?: string; cancelText?: string } = {}) {
    return open({
      kind: 'confirm',
      message,
      title: options.title,
      confirmText: options.confirmText,
      cancelText: options.cancelText
    })
  }

  async function alert(message: string, options: { title?: string; confirmText?: string } = {}) {
    await open({
      kind: 'alert',
      message,
      title: options.title,
      confirmText: options.confirmText
    })
  }

  return {
    dialog,
    confirm,
    alert,
    close
  }
}
