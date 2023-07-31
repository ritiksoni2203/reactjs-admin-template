import { lazy } from 'react'

// ** Document title
const TemplateTitle = 'DOPE GOLF'

// ** Default Route
const DefaultRoute = '/home'

const admin = localStorage.getItem("isAdmin") === "true" ? true : false

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/home/Home')),
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/workouts',
    component: lazy(() => import('../../views/workouts/index')),
  },
  {
    path: '/goals',
    component: lazy(() => import('../../views/goals/index')),
  },
  {
    path: '/addclub',
    component: lazy(() => import('../../views/workouts/AddClub')),
  },
  {
    path: '/updateclub/:id',
    component: lazy(() => import('../../views/workouts/UpdateClub')),
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/Login')),
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
