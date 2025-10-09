import type { Core } from '@strapi/strapi'
import type { Config } from '../config'

import { PLUGIN_ID } from '../pluginId'

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  config() {
    const plugin = strapi.plugin(PLUGIN_ID)
    return {
      version: plugin.config<Config['version']>('version'),
      date: plugin.config<Config['date']>('date'),
      url: plugin.config<Config['url']>('url'),
    }
  },
})

export default controller
