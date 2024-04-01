
import { faChalkboardUser, faCircleCheck, faCity, faFileInvoice, faHouse, faListCheck, faMagnifyingGlassLocation, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import { route } from 'shared/constants/AllRoutes'

const GetUerData = JSON.parse(localStorage.getItem('userData'));

console.log('GetUerData', GetUerData)


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
      // {
      //   path: route.unAlloctaedBlock,
      //   icon: faChalkboardUser,
      //   title: 'UnAlloctaed Block'
      // },
      // {
      //   path: route.alloctaedBlock,
      //   icon: faChalkboardUser,
      //   title: 'Alloctaed Block'
      // },
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
  // {
  //   path: route.poiManagement(1),
  //   icon: faCity,
  //   title: 'POI Management'
  // },
  // {
  //   path: route.propertyManagement(1),
  //   icon: faCity,
  //   title: 'Porperty management'
  // },
  {
    path: route.surveyManagenet,
    icon: faFileInvoice,
    title: 'Survey Management',
    children: [
      {
        path: route.surveyManagenet,
        icon: faChalkboardUser,
        title: 'Total Survey'
      },
      {
        path: route.doneSurveyManagenet,
        icon: faListCheck,
        title: 'Done Survey'
      },
    ]
  },
  {
    path: route.ReportManagenet,
    icon: faSquarePollVertical,
    title: 'Progress Report',
    children: [
      {
        path: route.ReportManagenet,
        icon: faChalkboardUser,
        title: 'Progress Report'
      },
      {
        path: route.consolidatedReport,
        icon: faListCheck,
        title: 'Consolidated Report'
      },
    ]
  },
]

export const SuperviserSidebar = [
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
        path: route.unAlloctaedBlock,
        icon: faChalkboardUser,
        title: 'UnAlloctaed Block'
      },
      {
        path: route.alloctaedBlock,
        icon: faChalkboardUser,
        title: 'Alloctaed Block'
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
    path: route.poiManagement,
    icon: faCity,
    title: 'POI Management'
  },
  {
    path: route.propertyManagement(1),
    icon: faCity,
    title: 'Porperty management'
  },
  // {
  //   path: route.surveyManagenet,
  //   icon: faFileInvoice,
  //   title: 'Survey Management',
  //   children: [
  //     {
  //       path: route.surveyManagenet,
  //       icon: faChalkboardUser,
  //       title: 'Review Survey'
  //     },
  //     {
  //       path: route.doneSurveyManagenet,
  //       icon: faListCheck,
  //       title: 'Done Survey'
  //     },
  //   ]
  // },
  {
    path: route.ReportManagenet,
    icon: faSquarePollVertical,
    title: 'Progress Report',
    children: [
      {
        path: route.ReportManagenet,
        icon: faChalkboardUser,
        title: 'Progress Report'
      },
      // {
      //   path: route.consolidatedReport,
      //   icon: faListCheck,
      //   title: 'Consolidated Report'
      // },
    ]
  },
]