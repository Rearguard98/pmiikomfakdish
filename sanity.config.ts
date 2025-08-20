import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './sanitystudio/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'pmiikomfakdish',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
