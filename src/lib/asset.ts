// Resolve a public-folder asset path against Vite's configured base URL.
//
// Runtime image paths (e.g. "/photos/first.jpg" in src/data/moments.ts) are
// plain strings, so Vite does NOT rewrite them at build time the way it does
// for index.html or statically-imported assets. When the app is served from a
// sub-path (GitHub Pages → /xavila_story/), a leading-slash path would resolve
// against the domain root and 404. Prefixing with import.meta.env.BASE_URL
// keeps it correct everywhere: BASE_URL is "/" in dev and "/xavila_story/" in
// the Pages build.
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
