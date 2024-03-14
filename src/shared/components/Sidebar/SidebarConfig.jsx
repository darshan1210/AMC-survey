
import { faFileInvoice, faHouse, faListCheck, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import { route } from 'shared/constants/AllRoutes'

export const sidebarConfig = [
  {
    path: route.dashboard,
    icon: faHouse,
    title: 'Dashboard',
  },
  {
    path: route.taskManagement,
    icon: faListCheck,
    title: 'My Block',
  },
  {
    path: route.login,
    icon: faFileInvoice,
    title: 'Survey',
  },
  {
    path: route.login,
    icon: faSquarePollVertical,
    title: 'Progress',
  },
]
