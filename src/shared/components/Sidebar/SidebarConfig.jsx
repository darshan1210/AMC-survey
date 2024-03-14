
import { faChalkboardUser, faCircleCheck, faFileInvoice, faHouse, faListCheck, faMagnifyingGlassLocation, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import { route } from 'shared/constants/AllRoutes'

export const sidebarConfig = [
  {
    path: route.dashboard,
    icon: faHouse,
    title: 'Dashboard'
  },
  {
    path: route.taskManagement,
    icon: faChalkboardUser,
    title: 'Block Management',
    children: [
      {
        path: route.taskManagement,
        icon: faChalkboardUser,
        title: 'My Block'
      },
      {
        path: route.inProgressBlock,
        icon: faListCheck,
        title: 'In Progress Block'
      },
      {
        path: route.reviewBlock,
        icon: faMagnifyingGlassLocation,
        title: 'Review Block'
      },
      {
        path: route.completedBlock,
        icon: faCircleCheck,
        title: 'Completed Block'
      },
    ]
  },
  {
    path: route.surveyManagenet,
    icon: faFileInvoice,
    title: 'Survey',
  },
  {
    path: route.ReportManagenet,
    icon: faSquarePollVertical,
    title: 'Progress',
  },
]
