import type { Core } from '@strapi/strapi'
import { type Config } from '../config'
import { PLUGIN_ID } from '../pluginId'

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  configVersion() {
    return {
      version: strapi.plugin(PLUGIN_ID).config('version') as Config['version'],
    }
  },
})

export default controller
