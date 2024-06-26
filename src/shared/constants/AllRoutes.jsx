export const route = {
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: (token) => `/reset-password/${token}`,
  changePassword: '/change-password',
  editProfile: '/profile',

  dashboard: '/dashboard',
  transactionStats: '/Transaction-Stats',
  statistics: '/Statistics',

  taskManagement: '/My-Block',
  inProgressBlock: '/In-progress-block',
  reviewBlock: '/Review-block',
  completedBlock: '/Completed-block',
  unAlloctaedBlock: '/UnAllotted-block',
  alloctaedBlock: '/Allotted-block',


  // poiManagement: '/POI-Management',
  poiManagement: (id) => `/POI-Management/${id}`,
  propertyManagement: (id) => `/Property-Management/${id}`,


  surveyManagenet: '/my-survey',
  doneSurveyManagenet: '/my-survey-done',
  ReportManagenet: '/my-report',
  consolidatedReport: '/consolidated-report',


}
