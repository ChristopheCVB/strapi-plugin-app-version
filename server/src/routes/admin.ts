export default [
  {
    method: 'GET',
    path: '/config',
    handler: 'admin.config',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
]
