import {createClient, type ClientConfig} from '@sanity/client'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {projectId, dataset, apiVersion} from './env'

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // public dataset — fast, cached reads from the browser
}

export const client = createClient(config)

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type {SanityImageSource}
