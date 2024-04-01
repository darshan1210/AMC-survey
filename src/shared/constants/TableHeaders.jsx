

// export const UserListColumn = [
//     { name: 'No', isSort: true },
//     { name: 'UserName', internalName: 'sUserName', type: 1, isSort: false },
//     { name: 'Email', internalName: 'sEmail', type: 1, isSort: false },
//     { name: 'Mobile', internalName: 'sPhone', type: 1, isSort: false },
//     { name: 'Cash', internalName: 'nCash', type: 1, isSort: false },
//     { name: 'State', internalName: 'sState', type: 1, isSort: false },
//     { name: 'Status', internalName: 'eStatus', type: 1, isSort: false },
//     { name: 'Created Date', internalName: 'dCreatedDate', type: 1, isSort: false },
//     { name: 'Actions', isSort: false }
// ]


export const TaskColumm = [
    { name: 'No', isSort: true },
    { name: 'Block name', isSort: false },
    { name: 'Ward', isSort: false },
    { name: 'zone', isSort: false },
    { name: 'Total POI', isSort: false },
    { name: 'Created by', isSort: false },
    { name: 'Created Date', isSort: false },
    { name: 'Actions', isSort: false },
]

export const ReviewBlockColumm = [
    { name: 'No', isSort: true },
    { name: 'Block name', isSort: false },
    { name: 'Ward', isSort: false },
    { name: 'zone', isSort: false },
    { name: 'Total POI', isSort: false },
    { name: 'Allocated Date', isSort: false },
    { name: 'Survey Date', isSort: false },
    { name: 'Actions', isSort: false },
]


export const CompletdBlockColumm = [
    { name: 'No', isSort: true },
    { name: 'Block name', isSort: false },
    { name: 'Ward', isSort: false },
    { name: 'zone', isSort: false },
    { name: 'Total POI', isSort: false },
    { name: 'Allocated Date', isSort: false },
    { name: 'Complete Date', isSort: false },
    { name: 'Actions', isSort: false },
]

export const InProgressBlockColum = [
    { name: 'No', isSort: true },
    { name: 'Block name', isSort: false },
    { name: 'Total POI', isSort: false },
    { name: 'Survey POI', isSort: false },
    { name: 'Remain POI', isSort: false },
    { name: 'Progress', isSort: false },
    { name: 'Progress Date', isSort: false },
    { name: 'Actions', isSort: false }
]

export const ProgressReportColums = [
    { name: 'No', isSort: true },
    { name: 'Date', isSort: false },
    { name: 'Allocated Block', isSort: false },
    { name: 'InProgress Block', isSort: false },
    { name: 'Review  Block', isSort: false },
    { name: 'Completed Block', isSort: false },
    { name: 'Total progress (%)', isSort: false }
]

export const ConsolidatedReportColums = [
    { name: 'No', isSort: true },
    { name: 'Date', isSort: false },
    { name: 'Allocated Property', isSort: false },
    { name: 'InProgress Property', isSort: false },
    { name: 'Review  Property', isSort: false },
    { name: 'Completed Property', isSort: false },
    { name: 'Total progress (%)', isSort: false }
]

export const ProptyColums = [
    { name: 'No', isSort: true },
    { name: 'Ward', isSort: false },
    { name: 'Zone', isSort: false },
    { name: 'Society', isSort: false },
    { name: 'Property Details', isSort: false },
    { name: 'Actions', isSort: false },
]

export const POIColums = [
    { name: 'No', isSort: true },
    { name: 'Zone', isSort: false },
    { name: 'Ward', isSort: false },
    { name: 'Society', isSort: false },
    { name: 'Total House', isSort: false },
    { name: 'Total Shops', isSort: false },
    { name: 'Actions', isSort: false }
]

export const RevviewSurveyColums = [
    { name: 'No', isSort: true },
    { name: 'Block name', isSort: false },
    { name: 'Ward', isSort: false },
    { name: 'zone', isSort: false },
    { name: 'Total POI', isSort: false },
    { name: 'Created by', isSort: false },
    { name: 'Created Date', isSort: false },
    { name: 'Actions', isSort: false },
]

export const GenderColumns = [
    { label: 'All', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
]


export const statusColumns = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'y' },
    { label: 'Inactive', value: 'n' },
    { label: 'Deleted', value: 'd' }
]

export const wardColums = [
    { "label": "Jamalpur", "value": "Jamalpur" },
    { "label": "Dariapur", "value": "Dariapur" },
    { "label": "Shahibag", "value": "Shahibag" },
    { "label": "Shahpur", "value": "Shahpur" },
    { "label": "Khadia", "value": "Khadia" },
    { "label": "Asarwa", "value": "Asarwa" },
    { "label": "Virat Nagar", "value": "Virat Nagar" },
    { "label": "Odhav", "value": "Odhav" },
    { "label": "Amraiwadi", "value": "Amraiwadi" },
    { "label": "Bhaipura-Hatkeshwar", "value": "Bhaipura-Hatkeshwar" },
    { "label": "Gomtipur", "value": "Gomtipur" },
    { "label": "Nikol", "value": "Nikol" },
    { "label": "Vastral", "value": "Vastral" },
    { "label": "Ramol-Hathijan", "value": "Ramol-Hathijan" },
    { "label": "Bodakdev", "value": "Bodakdev" },
    { "label": "Chandlodia", "value": "Chandlodia" }
]


export const zoneColums = [
    { "label": "East Zone", "value": "East Zone" },
    { "label": "West Zone", "value": "West Zone" },
    { "label": "North Zone", "value": "North Zone" },
    { "label": "South Zone", "value": "South Zone" },
    { "label": "Central Zone", "value": "Central Zone" },
    { "label": "South West Zone", "value": "South West Zone" },
    { "label": "North West Zone", "value": "North West Zone" }
]

export const PropertyTypeColums = [
    { "label": "Residential", "value": "Residential" },
    { "label": "Commercial", "value": "Commercial" },
    { "label": "Industrial", "value": "Industrial" },
    { "label": "Educational", "value": "Educational" },
    { "label": "Hospitality", "value": "Hospitality" },
    { "label": "Governmental", "value": "Governmental" },
    { "label": "Religious", "value": "Religious" },
    { "label": "Warehouses", "value": "Warehouses" },
    { "label": "Transportation", "value": "Transportation" },
    { "label": "Restaurants", "value": "Restaurants" }
]