import type { Config } from '../../../server/src/config'

import { PLUGIN_ID } from '../pluginId'
import { EmptyStateLayout, Loader } from '@strapi/design-system'
import { Code } from '@strapi/icons'
import { Layouts, Page, getFetchClient } from '@strapi/strapi/admin'
import { useState, useEffect } from 'react'

const HomePage = () => {
  const { get } = getFetchClient()
  
  const [isLoading, setIsLoading] = useState(true)
  const [version, setVersion] = useState<string | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    get<{ version: Config['version'] }>(`/${PLUGIN_ID}/config/version`).then(({ data }) => {
      setVersion(data.version)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch version:', error)
      setVersion('unknown')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <Page.Main>
      <Layouts.Header
        title={'App Version'}
      />
      <Layouts.Content>
        <EmptyStateLayout icon={isLoading ? <Loader /> : <Code style={{ width: '60px', height: '60px' }} />} content={`Version: ${version}`} />
      </Layouts.Content>
    </Page.Main>
  )
}

export { HomePage }

