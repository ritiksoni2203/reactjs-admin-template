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
    path: '/forgot-password',
    component: lazy(() => import('../../views/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/reset-password',
    component: lazy(() => import('../../views/authentication/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/otp',
    component: lazy(() => import('../../views/authentication/Otp')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/account-settings/Profile')),
  },
  {
    path: '/clubs',
    component: lazy(() => import('../../views/clubs/index')),
  },
  {
    path: '/addclub',
    component: lazy(() => import('../../views/clubs/AddClub')),
  },
  {
    path: '/updateclub/:id',
    component: lazy(() => import('../../views/clubs/UpdateClub')),
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
