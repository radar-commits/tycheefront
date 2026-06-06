import {defineCliConfig} from 'sanity/cli'

// Used by the Sanity CLI (e.g. `npx sanity schema deploy`).
export default defineCliConfig({
  api: {
    projectId: 'x25im1lt',
    dataset: 'production',
  },
})
