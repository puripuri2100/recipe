export function escapeHtml(str: string | number | undefined): string {
  return str
    ? typeof str === 'number'
      ? String(str)
      : str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
    : ''
}
