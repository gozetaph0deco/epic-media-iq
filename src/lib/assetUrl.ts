/** Resolve a public-folder path for both local dev and GitHub Pages base URL. */
export function assetUrl(path: string) {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}
