import adminRoutes from './admin'
import contentRoutes from './content'

const routes = {
  admin: {
    type: 'admin',
    routes: adminRoutes,
  },
  'content-api': {
    type: 'content-api',
    routes: contentRoutes,
  },
}

export default routes
