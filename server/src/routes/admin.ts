export default [
  {
    method: 'GET',
    path: '/config/version',
    handler: 'admin.configVersion',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
]
