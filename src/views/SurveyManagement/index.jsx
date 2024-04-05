import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import { TaskColumm } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import PageTitle from 'shared/components/PageTitle'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useQuery } from 'react-query'
import { GetMyBlockList } from 'query/Block/block.query'
import MyBlockFilters from 'shared/components/SubFilterComponents/MyBlockListFilter'
import ReviewListRow from 'shared/components/reviewSurveylistRow'

const SurveyManagement = () => {
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))
    const [radioValue, setRadioValue] = useState('1');
    const [myBlockList, setMyBlockList] = useState([])

    const radios = [
        { name: 'Survey Block Details - (50)', value: '1' },
    ];

    function getRequestParams(e) {
        const data = e ? parseParams(e) : params.current
        return {
            pageNumber: +data?.pageNumber?.[0] || 1,
            nLimit: data?.nLimit || 10,
            status: data?.status || '',
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            search: data?.search || '',
            ward_id: data?.ward_id || '',
            zone_id: data?.ward_id || '',
        }
    }

    function getSortedColumns(adminTableColumns, urlData) {
        return adminTableColumns?.map((column) => (column.internalName === urlData?.sort ? { ...column, type: +urlData?.orderBy } : column))
    }

    const [requestParams, setRequestParams] = useState(getRequestParams())
    const [columns, setColumns] = useState(getSortedColumns(TaskColumm, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange


    const { isLoading, isFetching } = useQuery(['myBlockList', requestParams], () => GetMyBlockList(requestParams), {
        select: (data) => data.data.data,
        onSuccess: (data) => {
            setMyBlockList(data?.data);
        }
    })

    function handleSort(field) {
        let selectedFilter
        const filter = columns.map((data) => {
            if (data.internalName === field.internalName) {
                data.type = +data.type === 1 ? -1 : 1
                selectedFilter = data
            } else {
                data.type = 1
            }
            return data
        })
        setColumns(filter)
        const params = {
            ...requestParams,
            page: 0,
            sort: selectedFilter?.internalName,
            orderBy: selectedFilter.type === 1 ? 'ASC' : 'DESC',
            isEmailVerified: selectedFilter?.isEmailVerified
        }
        setRequestParams(params)
        appendParams({
            sort: selectedFilter.type !== 0 ? selectedFilter.internalName : '',
            orderBy: selectedFilter.type
        })
    }

    async function handleHeaderEvent(name, value) {
        switch (name) {
            case 'rows':
                setRequestParams({ ...requestParams, nLimit: Number(value), pageNumber: 1 })
                appendParams({ nLimit: Number(value), pageNumber: 1 })
                break
            case 'search':
                setRequestParams({ ...requestParams, search: value, pageNumber: 1 })
                appendParams({ pageNumber: 1 })
                break
            case 'filter':
                setModal({ open: value, type: 'filter' })
                break
            default:
                break
        }
    }

    function handlePageEvent(page) {
        setRequestParams({ ...requestParams, pageNumber: page, nStart: page - 1 })
        appendParams({ pageNumber: page, nStart: page - 1 })
    }

    function handleFilterChange(e) {
        setRequestParams({
            ...requestParams,
            startDate: e.dateTo || '',
            endDate: e.dateFrom || '',
            ward_id: e?.sWard || '',
            zone_id: e?.sZone || ''
        })
    }

    useEffect(() => {
        document.title = 'Block Management | AMC Survey'
    }, [])


    return (
        <>
            <PageTitle title={'Total survey Blocks'} />
            <ButtonGroup className='BlockButtonGroup'>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={radio.value === radioValue ? 'outline-primary' : 'outline-warning'}
                        name="radio"
                        defaultValue={'1'}
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>

            <div>
                <DataTable
                    columns={columns}
                    header={{
                        left: {
                            rows: true
                        },
                        right: {
                            search: true,
                            filter: true
                        }
                    }}
                    sortEvent={handleSort}
                    headerEvent={(name, value) => handleHeaderEvent(name, value)}
                    totalRecord={myBlockList?.length && (myBlockList?.length || 0)}
                    pageChangeEvent={handlePageEvent}
                    isLoading={isLoading || isFetching}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                >
                    {myBlockList?.length && myBlockList?.map((user, index) => {
                        return (
                            <ReviewListRow
                                key={user._id}
                                index={index}
                                user={user}
                                onDelete={() => { }}
                                onUpdate={() => { }}
                            />
                        )
                    })}
                    <Drawer className='FilterModal' isOpen={modal.type === 'filter' && modal.open} onClose={() => setModal({ open: false, type: '' })} title='Filter'>
                        <MyBlockFilters
                            filterChange={handleFilterChange}
                            closeDrawer={() => setModal({ open: false, type: '' })}
                            defaultValue={requestParams}
                            location={location}
                            startDate={startDate}
                            endDate={endDate}
                            setDateRange={setDateRange}
                        />
                    </Drawer>
                </DataTable>
            </div>
        </>
    )
}

export default SurveyManagement











// import React, { useEffect, useRef, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import { useLocation, useNavigate } from 'react-router-dom'
// import DataTable from 'shared/components/DataTable'
// import Drawer from 'shared/components/Drawer'
// import PageTitle from 'shared/components/PageTitle'
// import UserFilters from 'shared/components/UserListFilter'
// import ReviewListRow from 'shared/components/reviewSurveylistRow'
// import { route } from 'shared/constants/AllRoutes'
// import { RevviewSurveyColums } from 'shared/constants/TableHeaders'
// import { appendParams, parseParams } from 'shared/utils'

// const SurveyManagement = () => {
//     const location = useLocation()
//     const navigate = useNavigate()
//     const parsedData = parseParams(location.search)
//     const params = useRef(parseParams(location.search))

//     function getRequestParams(e) {
//         const data = e ? parseParams(e) : params.current
//         return {
//             pageNumber: +data?.pageNumber?.[0] || 1,
//             nStart: (+data?.pageNumber?.[0] - 1) || 0,
//             nLimit: data?.nLimit || 10,
//             eStatus: data?.eStatus || 'y',
//             eState: data?.eState || '',
//             date: data?.date || '',
//             startDate: data.startDate || '',
//             endDate: data.endDate || '',
//             sort: data.sort || '',
//             search: data?.search || '',
//             orderBy: 'ASC',
//             totalElements: data?.totalElements || 0,
//         }
//     }

//     function getSortedColumns(adminTableColumns, urlData) {
//         return adminTableColumns?.map((column) => (column.internalName === urlData?.sort ? { ...column, type: +urlData?.orderBy } : column))
//     }

//     const [requestParams, setRequestParams] = useState(getRequestParams())
//     const [columns, setColumns] = useState(getSortedColumns(RevviewSurveyColums, parsedData))
//     const [modal, setModal] = useState({ open: false, type: '' })

//     const [dateRange, setDateRange] = useState([null, null]);
//     const [startDate, endDate] = dateRange


//     const data = {
//         "bots": [
//             {
//                 Blockname: 'ZWWPA01913800B01',
//                 Ward: 'Asarwa',
//                 zone: 'East Zone',
//                 TotalProperty: '10',
//                 Createdby: 'Prakash Jani',
//                 CreatedDate: '31/12/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B01',
//                 Ward: 'Asarwa',
//                 zone: 'East Zone',
//                 TotalProperty: '27',
//                 Createdby: 'Amit Patel',
//                 CreatedDate: '15/07/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B02',
//                 Ward: 'Khadia',
//                 zone: 'Central Zone',
//                 TotalProperty: '45',
//                 Createdby: 'Rahul Sharma',
//                 CreatedDate: '03/11/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B03',
//                 Ward: 'Ramol-Hathijan',
//                 zone: 'South Zone',
//                 TotalProperty: '33',
//                 Createdby: 'Priya Gupta',
//                 CreatedDate: '19/05/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B01',
//                 Ward: 'Virat Nagar',
//                 zone: 'North West Zone',
//                 TotalProperty: '18',
//                 Createdby: 'Suresh Kumar',
//                 CreatedDate: '28/09/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B02',
//                 Ward: 'Dariapur',
//                 zone: 'West Zone',
//                 TotalProperty: '55',
//                 Createdby: 'Neha Singh',
//                 CreatedDate: '10/02/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B03',
//                 Ward: 'Gomtipur',
//                 zone: 'North Zone',
//                 TotalProperty: '21',
//                 Createdby: 'Ankit Sharma',
//                 CreatedDate: '24/04/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B01',
//                 Ward: 'Odhav',
//                 zone: 'South West Zone',
//                 TotalProperty: '37',
//                 Createdby: 'Deepak Verma',
//                 CreatedDate: '07/08/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B02',
//                 Ward: 'Bodakdev',
//                 zone: 'South Zone',
//                 TotalProperty: '62',
//                 Createdby: 'Kavita Singh',
//                 CreatedDate: '12/01/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             },
//             {
//                 Blockname: 'ZWWPA01913800B03',
//                 Ward: 'Amraiwadi',
//                 zone: 'Central Zone',
//                 TotalProperty: '29',
//                 Createdby: 'Amit Kumar',
//                 CreatedDate: '30/06/2023',
//                 Assignername: 'Assigner-name',
//                 Assigndate: 'Assign-date',
//                 Actionwith: 'Action-with',
//                 Surveybutton: 'Survey button'
//             }
//         ],
//         "count": {
//             "totalData": 38
//         }
//     }

//     function handleSort(field) {
//         let selectedFilter
//         const filter = columns.map((data) => {
//             if (data.internalName === field.internalName) {
//                 data.type = +data.type === 1 ? -1 : 1
//                 selectedFilter = data
//             } else {
//                 data.type = 1
//             }
//             return data
//         })
//         setColumns(filter)
//         const params = {
//             ...requestParams,
//             page: 0,
//             sort: selectedFilter?.internalName,
//             orderBy: selectedFilter.type === 1 ? 'ASC' : 'DESC',
//             isEmailVerified: selectedFilter?.isEmailVerified
//         }
//         setRequestParams(params)
//         appendParams({
//             sort: selectedFilter.type !== 0 ? selectedFilter.internalName : '',
//             orderBy: selectedFilter.type
//         })
//     }

//     async function handleHeaderEvent(name, value) {
//         switch (name) {
//             case 'rows':
//                 setRequestParams({ ...requestParams, nLimit: Number(value), pageNumber: 1 })
//                 appendParams({ nLimit: Number(value), pageNumber: 1 })
//                 break
//             case 'search':
//                 setRequestParams({ ...requestParams, search: value, pageNumber: 1 })
//                 appendParams({ pageNumber: 1 })
//                 break
//             case 'filter':
//                 setModal({ open: value, type: 'filter' })
//                 break
//             default:
//                 break
//         }
//     }

//     function handlePageEvent(page) {
//         setRequestParams({ ...requestParams, pageNumber: page, nStart: page - 1 })
//         appendParams({ pageNumber: page, nStart: page - 1 })
//     }

//     function handleFilterChange(e) {
//         setRequestParams({ ...requestParams, eStatus: e?.eStatus || 'y', eState: e?.eState || '', dStartDate: e?.dStartDate || '', dEndDate: e?.dEndDate || '' })
//     }

//     useEffect(() => {
//         document.title = 'Property Management | AMC Survey'
//     }, [])


//     return (
//         <>
//             <PageTitle title={'My Survey'} />

//             <div>
//                 <DataTable
//                     columns={columns}
//                     header={{
//                         left: {
//                             rows: true
//                         },
//                         right: {
//                             search: true,
//                             filter: true
//                         }
//                     }}
//                     sortEvent={handleSort}
//                     headerEvent={(name, value) => handleHeaderEvent(name, value)}
//                     totalRecord={data && (data?.count?.totalData || 0)}
//                     pageChangeEvent={handlePageEvent}
//                     isLoading={false}
//                     pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
//                 >
//                     {data && data?.bots?.map((user, index) => {
//                         return (
//                             <ReviewListRow
//                                 key={user._id}
//                                 index={index}
//                                 user={user}
//                                 onDelete={() => { }}
//                                 onUpdate={() => { }}
//                             />
//                         )
//                     })}
//                     <Drawer isOpen={modal.type === 'filter' && modal.open} onClose={() => setModal({ open: false, type: '' })} title='Filter'>
//                         <UserFilters
//                             filterChange={handleFilterChange}
//                             closeDrawer={() => setModal({ open: false, type: '' })}
//                             defaultValue={requestParams}
//                             location={location}
//                             startDate={startDate}
//                             endDate={endDate}
//                             setDateRange={setDateRange}
//                         />
//                     </Drawer>
//                 </DataTable>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button style={{ borderRadius: '0 0 10px 10px', margin: '0 10px 0 0 ' }} onClick={() => navigate(route.doneSurveyManagenet)}>
//                     Submit Property
//                 </Button>
//             </div>
//         </>
//     )
// }



// export default SurveyManagement
