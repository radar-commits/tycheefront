import {NextStudio} from 'next-sanity/studio'
import config from '../../../sanity.config'

// Studio is a client-side SPA; in a statically-exported site we render the
// shell statically and let the Studio handle its own routing in the browser.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{tool: []}]
}

export {metadata, viewport} from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
