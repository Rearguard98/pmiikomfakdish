import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './sanitystudio/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'pmiikomfakdish',
  projectId: 'ywo19okn',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
