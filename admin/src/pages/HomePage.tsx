import type { Config } from '../../../server/src/config'

import { PLUGIN_ID } from '../pluginId'
import { EmptyStateLayout } from '@strapi/design-system'
import { Layouts, Page, getFetchClient } from '@strapi/strapi/admin'
import { useState, useEffect } from 'react'

const HomePage = () => {
  const { get } = getFetchClient()
  
  const [version, setVersion] = useState<string>('Loading...')

  useEffect(() => {
    get<{ version: Config['version'] }>(`/${PLUGIN_ID}/config/version`).then(({ data }) => {
      setVersion(data.version || 'unknown')
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch version:', error)
      setVersion('unknown')
    })
  }, [])

  return (
    <Page.Main>
      <Layouts.Header
        title={'App Version'}
      />
      <Layouts.Content>
        <EmptyStateLayout icon={<div />} content={`Version: ${version}`} />
      </Layouts.Content>
    </Page.Main>
  )
}

export { HomePage }

