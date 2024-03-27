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
const TaskManagement = lazy(() => import('views/BlockManagement'))
const InprogressBlockManagement = lazy(() => import('views/BlockManagement/InProgressManagement'))
const ReviewBlockManagement = lazy(() => import('views/BlockManagement/ReviewBlockManagement'))
const CompletedBlockManagement = lazy(() => import('views/BlockManagement/CompletedBlockManagement'))
const UnAllottedBlockManagement = lazy(() => import('views/BlockManagement/unAllottedBlockManagement'))
const AllottedBlockManagement = lazy(() => import('views/BlockManagement/AllottedBlockManagement'))


const PropertyManagement = lazy(() => import('views/PropertyManagement'))
const POIManagement = lazy(() => import('views/POImanagement'))

const SurveyManagement = lazy(() => import('views/SurveyManagement'))
const DoneSurveyManagement = lazy(() => import('views/SurveyManagement/DoneSurvey'))
const ReportManagement = lazy(() => import('views/ReportManagement/ProgressReport'))
const ConsolidatedReport = lazy(() => import('views/ReportManagement/ConsolidatedReport'))


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
      { path: route.inProgressBlock, Component: InprogressBlockManagement, exact: true },
      { path: route.reviewBlock, Component: ReviewBlockManagement, exact: true },
      { path: route.completedBlock, Component: CompletedBlockManagement, exact: true },
      { path: route.unAlloctaedBlock, Component: UnAllottedBlockManagement, exact: true },
      { path: route.alloctaedBlock, Component: AllottedBlockManagement, exact: true },

      { path: route.propertyManagement, Component: PropertyManagement, exact: true },
      { path: route.surveyManagenet, Component: SurveyManagement, exact: true },
      { path: route.doneSurveyManagenet, Component: DoneSurveyManagement, exact: true },

      { path: route.poiManagement(':id'), Component: POIManagement, exact: true },

      { path: route.ReportManagenet, Component: ReportManagement, exact: true },
      { path: route.consolidatedReport, Component: ConsolidatedReport, exact: true },
    ]
  }
]

export default RoutesDetails
