import { lazy } from 'react'
import { route } from 'shared/constants/AllRoutes'

const PublicRoute = lazy(() => import('routes/PublicRoutes'))
const PrivateRoute = lazy(() => import('routes/PrivateRoutes'))

// public Routes Files
const Login = lazy(() => import('views/auth/login'))
const ForgotPassword = lazy(() => import('views/auth/forgot-password'))
const ResetPassword = lazy(() => import('views/auth/reset-password'))

// Private Routes Files
const Profile = lazy(() => import('views/profile'))
const ChangePassword = lazy(() => import('views/profile/changePassword'))


//CRM Management
const Dashboard = lazy(() => import('views/dashboard'))


//My Task Management
const TaskManagement = lazy(() => import('views/TaskManagement'))
const PropertyManagement = lazy(() => import('views/PropertyManagement'))



const RoutesDetails = [
  {
    defaultRoute: '',
    Component: PublicRoute,
    props: {},
    isPrivateRoute: false,
    children: [
      { path: '/login', Component: Login, exact: true },
      { path: route.forgotPassword, Component: ForgotPassword, exact: true },
      {
        path: route.resetPassword(':token'),
        Component: ResetPassword,
        exact: true
      }
    ]
  },
  {
    defaultRoute: '',
    Component: PrivateRoute,
    props: {},
    isPrivateRoute: true,
    children: [
      { path: route.editProfile, Component: Profile, exact: true },
      { path: route.changePassword, Component: ChangePassword, exact: true },

      { path: route.dashboard, Component: Dashboard, exact: true },

      { path: route.taskManagement, Component: TaskManagement, exact: true },
      { path: route.propertyManagement, Component: PropertyManagement, exact: true },
    ]
  }
]

export default RoutesDetails
