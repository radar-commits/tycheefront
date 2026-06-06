'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'
import {projectId, dataset, apiVersion} from './sanity/env'

// This config powers the embedded Studio mounted at /studio.
export default defineConfig({
  name: 'tychee',
  title: 'tychee',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {types: schemaTypes},
  plugins: [structureTool(), visionTool({defaultApiVersion: apiVersion})],
})
