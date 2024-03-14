export const route = {
  login: '/',
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
  propertyManagement: '/my-task/Property-Management',

  surveyManagenet: '/my-survey',
  ReportManagenet: '/my-report'

}
