import type { StrapiApp } from '@strapi/strapi/admin'

import { PLUGIN_ID } from './pluginId'
import { Initializer } from './components/Initializer'

export default {
  register(app: StrapiApp) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    })
  },

  bootstrap(app: StrapiApp) {
    // Add the settings link
    app.addSettingsLink('global', {
      id: `${PLUGIN_ID}.plugin.name`,
      to: `/settings/${PLUGIN_ID}`,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'App Version',
      },
      // @ts-expect-error component type mismatch
      Component: async () => {
        const { App } = await import('./pages/App')
        return App
      },
      permissions: [],
    })
  },

  registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`)

          return { data, locale }
        } catch {
          return { data: {}, locale }
        }
      }),
    )
  },
}
