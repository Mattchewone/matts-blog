// Next rejects basePath "/"; same normalisation as next.config.js.
const raw = process.env.NEXT_PUBLIC_BASE_PATH || ''
const basePath = raw === '/' ? '' : raw

/** Prefix root-relative URLs when the site uses Next `basePath` (e.g. GitHub Pages project site). */
export function withBasePath(url: string): string {
  if (!url || !basePath) return url
  if (!url.startsWith('/')) return url
  if (url === basePath || url.startsWith(`${basePath}/`)) return url
  return `${basePath}${url}`
}
