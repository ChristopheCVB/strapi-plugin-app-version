import type { Core } from '@strapi/strapi'

const handler: Core.PolicyHandler = (_policyContext, _config, { strapi: _strapi }) => {
  return true
}

export default handler
