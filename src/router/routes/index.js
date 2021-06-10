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
    appLayout: true,
    className: 'chat-application',
    path: '/chat',
    component: lazy(() => import('../../pages/chat'))
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
  }
]

export { DefaultRoute, TemplateTitle, Routes }
