import { lazy } from 'react'

// ** Document title
const TemplateTitle = 'FITNESS TRACKER'

// ** Default Route
const DefaultRoute = '/home'

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
    path: '/addworkout',
    component: lazy(() => import('../../views/workouts/AddWorkout')),
  },
  {
    path: '/editworkout/:id',
    component: lazy(() => import('../../views/workouts/AddWorkout')),
  },
  {
    path: '/addgoal',
    component: lazy(() => import('../../views/goals/AddGoal')),
  },
  {
    path: '/editgoal/:id',
    component: lazy(() => import('../../views/goals/AddGoal')),
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
