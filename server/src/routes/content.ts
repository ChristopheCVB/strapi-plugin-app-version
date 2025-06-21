export default [
  {
    method: 'GET',
    path: '/config/version',
    handler: 'content.configVersion',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
]
