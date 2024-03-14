import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TaskListRow from 'shared/components/TaskListRows'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import UserFilters from 'shared/components/UserListFilter'
import { TaskColumm } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import PageTitle from 'shared/components/PageTitle'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const InProgressManagement = () => {
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'My Block', value: '1' },
        { name: 'In Progress', value: '2' },
        { name: 'In Review', value: '3' },
        { name: 'Complete', value: '4' },
    ];

    function getRequestParams(e) {
        const data = e ? parseParams(e) : params.current
        return {
            pageNumber: +data?.pageNumber?.[0] || 1,
            nStart: (+data?.pageNumber?.[0] - 1) || 0,
            nLimit: data?.nLimit || 10,
            eStatus: data?.eStatus || 'y',
            eState: data?.eState || '',
            date: data?.date || '',
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            sort: data.sort || '',
            search: data?.search || '',
            orderBy: 'ASC',
            totalElements: data?.totalElements || 0,
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

    const data = {
        "bots": [
            {
                Blockname: 'ZWWPA01913800B01',
                Ward: 'Asarwa',
                zone: 'East Zone',
                TotalProperty: '10',
                Createdby: 'Prakash Jani',
                CreatedDate: '31/12/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B01',
                Ward: 'Asarwa',
                zone: 'East Zone',
                TotalProperty: '27',
                Createdby: 'Amit Patel',
                CreatedDate: '15/07/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B02',
                Ward: 'Khadia',
                zone: 'Central Zone',
                TotalProperty: '45',
                Createdby: 'Rahul Sharma',
                CreatedDate: '03/11/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B03',
                Ward: 'Ramol-Hathijan',
                zone: 'South Zone',
                TotalProperty: '33',
                Createdby: 'Priya Gupta',
                CreatedDate: '19/05/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B01',
                Ward: 'Virat Nagar',
                zone: 'North West Zone',
                TotalProperty: '18',
                Createdby: 'Suresh Kumar',
                CreatedDate: '28/09/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B02',
                Ward: 'Dariapur',
                zone: 'West Zone',
                TotalProperty: '55',
                Createdby: 'Neha Singh',
                CreatedDate: '10/02/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B03',
                Ward: 'Gomtipur',
                zone: 'North Zone',
                TotalProperty: '21',
                Createdby: 'Ankit Sharma',
                CreatedDate: '24/04/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B01',
                Ward: 'Odhav',
                zone: 'South West Zone',
                TotalProperty: '37',
                Createdby: 'Deepak Verma',
                CreatedDate: '07/08/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B02',
                Ward: 'Bodakdev',
                zone: 'South Zone',
                TotalProperty: '62',
                Createdby: 'Kavita Singh',
                CreatedDate: '12/01/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                Blockname: 'ZWWPA01913800B03',
                Ward: 'Amraiwadi',
                zone: 'Central Zone',
                TotalProperty: '29',
                Createdby: 'Amit Kumar',
                CreatedDate: '30/06/2023',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            }
        ],
        "count": {
            "totalData": 38
        }
    }

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
        setRequestParams({ ...requestParams, eStatus: e?.eStatus || 'y', eState: e?.eState || '', dStartDate: e?.dStartDate || '', dEndDate: e?.dEndDate || '' })
    }

    useEffect(() => {
        document.title = 'Task Management | AMC Survey'
    }, [])


    return (
        <>
            <PageTitle title={'In Progress Block'} />
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
                    totalRecord={data && (data?.count?.totalData || 0)}
                    pageChangeEvent={handlePageEvent}
                    isLoading={false}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                >
                    {data && data?.bots?.map((user, index) => {
                        return (
                            <TaskListRow
                                key={user._id}
                                index={index}
                                user={user}
                                onDelete={() => { }}
                                onUpdate={() => { }}
                            />
                        )
                    })}
                    <Drawer isOpen={modal.type === 'filter' && modal.open} onClose={() => setModal({ open: false, type: '' })} title='Filter'>
                        <UserFilters
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

export default InProgressManagement
