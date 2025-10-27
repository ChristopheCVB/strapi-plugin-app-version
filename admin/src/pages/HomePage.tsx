import type { Config } from '../../../server/src/config'

import { useState, useEffect } from 'react'
import { Layouts, Page, getFetchClient } from '@strapi/strapi/admin'
import { Loader, Flex, Typography, Card, LinkButton } from '@strapi/design-system'
import { Code, ExternalLink } from '@strapi/icons'
import { PLUGIN_ID } from '../pluginId'

const HomePage = () => {
  const { get } = getFetchClient()
  
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState<Config | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    get<Config>(`/${PLUGIN_ID}/config`).then(({ data }) => {
      setConfig(data)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch version:', error)
      setConfig({ version: 'unknown' })
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
        <Card padding={8}>
          <Flex direction="column" gap={2}>
            {
              isLoading ? (
                <Loader />
              ) : (
                <>
                  <Code style={{ width: '60px', height: '60px' }} />
                  <Typography variant='alpha'>Version: {config?.version}</Typography>
                  {
                    (config?.date || config?.url) && <Flex style={{ marginTop: '4rem'}} direction="column" gap={2}>
                      {config?.date && <Typography variant='delta'>Date: {config?.date}</Typography>}
                      {config?.url && <LinkButton variant='tertiary' href={config.url} isExternal endIcon={<ExternalLink />}>More information</LinkButton>}
                    </Flex>
                  }
                </>
              )
            }
          </Flex>
        </Card>
      </Layouts.Content>
    </Page.Main>
  )
}

export default HomePage

