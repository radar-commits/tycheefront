// Public Sanity project config. projectId/dataset are NOT secret — they ship to
// the browser, so we hardcode sensible defaults to keep static builds working
// even if Netlify env vars aren't set, while still allowing overrides.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x25im1lt'
