import type { Config } from '../../../server/src/config'

import { useState, useEffect, useMemo } from 'react'
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

  const dateFormatter = useMemo(() => Intl.DateTimeFormat(navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }), [])

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
                  <Flex gap={4}>
                    <Code width={60} height={60} />
                    <Typography variant='beta'>Version: {config?.version}</Typography>
                  </Flex>
                  {
                    (config?.date || config?.url) && <Flex style={{ marginTop: '3rem'}} direction="column" gap={6}>
                      {config?.date && <Typography variant='delta'>Date: {dateFormatter.format(new Date(config.date))}</Typography>}
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

