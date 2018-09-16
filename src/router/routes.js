const authRoutes = [
  {
    path: '/licenses', name: 'licenses', meta: { requiresAuth: true }, component: () => import('@/views/Licenses/Licenses'),
  },
  {
    path: '/licenses/:id', name: 'licenses-details', meta: { requiresAuth: true }, component: () => import('@/views/Licenses/LicenseDetails'),
  },
  {
    path: '/clients', name: 'clients', meta: { requiresAuth: true }, component: () => import('@/views/clients/clients'),
  },
  {
    path: '/clients/:id', name: 'client-details', meta: { requiresAuth: true }, component: () => import('@/views/clients/clientDetails'),
  },
  {
    path: '/blog', name: 'blog', meta: { requiresAuth: true }, component: () => import('@/views/Blog/Blog'),
  },
  {
    path: '/blog/:id', name: 'blog-details', meta: { requiresAuth: true }, component: () => import('@/views/Blog/BlogDetails'),
  },
  {
    path: '/releases', name: 'releases', meta: { requiresAuth: true }, component: () => import('@/views/Releases/Releases'),
  },
  {
    path: '/releases/:id', name: 'releases-details', meta: { requiresAuth: true }, component: () => import('@/views/Releases/ReleaseDetails'),
  },
]

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    redirect: '/licenses',
    children: authRoutes,
    component: () => import('@/views/base/Home'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('@/views/base/Login'),
  },
]

export default routes
