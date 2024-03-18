import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import UserFilters from 'shared/components/UserListFilter'
import { ConsolidatedReportColums } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import PageTitle from 'shared/components/PageTitle'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ConsolidatedReportListRow from 'shared/components/ConsolidatedReportListRow'

const ConsolidatedReport = () => {
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'All', value: '1' },
        { name: 'Week', value: '2' },
        { name: 'Month', value: '3' },
        { name: 'Year', value: '4' },
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
    const [columns, setColumns] = useState(getSortedColumns(ConsolidatedReportColums, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange

    const data = {
        "bots": [
            {
                "Ward": "Vastral",
                "Zone": "East Zone ",
                "Society": "Sunrise Apartments",
                "CreatedBy": "Ramesh Patel",
                "CreatedDate": "10-12-2020",
                "Status": 'Completed'
            },
            {
                "Ward": "Dariapur",
                "Zone": "East Zone ",
                "Society": "Green Valley Residency",
                "CreatedBy": "Suresh Kumar",
                "CreatedDate": "05-07-2021",
                "Status": 'Completed'
            },
            {
                "Ward": "Shahibag",
                "Zone": "West Zone",
                "Society": "Royal Palm Heights",
                "CreatedBy": "Vijay Sharma",
                "CreatedDate": "22-09-2020",
                "Status": 'In progress'
            },
            {
                "Ward": "Khadia",
                "Zone": "North Zone",
                "Society": "Pearl Paradise",
                "CreatedBy": "Deepak Gupta",
                "CreatedDate": "18-04-2021",
                "Status": 'Completed'
            },
            {
                "Ward": "Odhav",
                "Zone": "West Zone",
                "Society": "Silver Crest",
                "CreatedBy": "Amit Kumar",
                "CreatedDate": "11-11-2020",
                "Status": 'In progress'
            },
            {
                "Ward": "Amraiwadi",
                "Zone": "North Zone",
                "Society": "Emerald Towers",
                "CreatedBy": "Rajesh Singh",
                "CreatedDate": "30-06-2021",
                "Status": 'In progress'
            },
            {
                "Ward": "Gomtipur",
                "Zone": "North Zone",
                "Society": "Golden Enclave",
                "CreatedBy": "Neha Sharma",
                "CreatedDate": "14-02-2021",
                "Status": 'In progress'
            },
            {
                "Ward": "Nikol",
                "Zone": "Central Zone",
                "Society": "Diamond Heights",
                "CreatedBy": "Manoj Verma",
                "CreatedDate": "09-08-2020",
                "Status": 'Completed'
            },
            {
                "Ward": "Vastral",
                "Zone": "South Zone",
                "Society": "Platinum Towers",
                "CreatedBy": "Anita Patel",
                "CreatedDate": "25-03-2021",
                "Status": 'Completed'
            },
            {
                "Ward": "Bodakdev",
                "Zone": "Central Zone",
                "Society": "Sapphire Gardens",
                "CreatedBy": "Sanjay Gupta",
                "CreatedDate": "03-10-2020",
                "Status": 'Completed'
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
            <PageTitle title={'Consolidated Report'} />
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
                            <ConsolidatedReportListRow
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

export default ConsolidatedReport
