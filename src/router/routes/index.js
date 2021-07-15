import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - InfoNow'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/meetings',
    component: lazy(() => import('../../pages/meetings/MeetingHome'))
  },
  {
    path: '/meetings/:id',
    exact: true,
    component: lazy(() => import('../../pages/blog/details')),
    meta: {
      navLink: '/meetings/:id'
    }
  },
  {
    appLayout: true,
    className: 'chat-application',
    path: '/chat',
    component: lazy(() => import('../../pages/chat'))
  },
  {
    appLayout: true,
    path: '/documents',
    component: lazy(() => import('../../pages/documents'))
  },
  {
    path: '/blog',
    exact: true,
    component: lazy(() => import('../../pages/blog/list'))
  },
  {
    path: '/blog/:id',
    exact: true,
    component: lazy(() => import('../../pages/blog/details')),
    meta: {
      navLink: '/blog/:id'
    }
  },
  {
    path: '/lessons',
    exact: true,
    className: 'lesson-application',
    component: lazy(() => import('../../pages/lessons'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../pages/auth/login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/unauthorized',
    component: lazy(() => import('../../views/NotAuthorized')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
