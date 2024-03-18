import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import PageTitle from 'shared/components/PageTitle'
import UserFilters from 'shared/components/UserListFilter'
import ReviewListRow from 'shared/components/reviewSurveylistRow'
import { route } from 'shared/constants/AllRoutes'
import { RevviewSurveyColums } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'

const SurveyManagement = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))

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
    const [columns, setColumns] = useState(getSortedColumns(RevviewSurveyColums, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange


    const data = {
        "bots": [
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Sunrise Apartments",
                "CreatedBy": "Ramesh Patel",
                "CreatedDate": "10-12-2020",
                "OwnerName": "Suresh Patel",
                "PhoneNo": "9879800524"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Green Valley Residency",
                "CreatedBy": "Rajesh Kumar",
                "CreatedDate": "15-06-2021",
                "OwnerName": "Sudhir Sharma",
                "PhoneNo": "9876543210"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Royal Palm Heights",
                "CreatedBy": "Suresh Singh",
                "CreatedDate": "20-03-2022",
                "OwnerName": "Rahul Verma",
                "PhoneNo": "9988776655"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Pearl Paradise",
                "CreatedBy": "Prakash Jani",
                "CreatedDate": "05-08-2021",
                "OwnerName": "Manish Shah",
                "PhoneNo": "9898989898"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Silver Crest",
                "CreatedBy": "Deepak Sharma",
                "CreatedDate": "12-10-2020",
                "OwnerName": "Mukesh Patel",
                "PhoneNo": "9876123456"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Emerald Towers",
                "CreatedBy": "Amit Patel",
                "CreatedDate": "08-04-2022",
                "OwnerName": "Kirti Mehta",
                "PhoneNo": "9876541230"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Golden Enclave",
                "CreatedBy": "Rajesh Gupta",
                "CreatedDate": "25-11-2021",
                "OwnerName": "Vinod Singh",
                "PhoneNo": "9988776655"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Diamond Heights",
                "CreatedBy": "Alok Sharma",
                "CreatedDate": "19-09-2022",
                "OwnerName": "Rahul Patel",
                "PhoneNo": "9898989898"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Platinum Towers",
                "CreatedBy": "Kunal Patel",
                "CreatedDate": "14-07-2020",
                "OwnerName": "Sachin Kumar",
                "PhoneNo": "9876123456"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": "Ward",
                "Zone": "Zone",
                "Society": "Sapphire Gardens",
                "CreatedBy": "Ajay Singh",
                "CreatedDate": "30-01-2022",
                "OwnerName": "Ramesh Sharma",
                "PhoneNo": "9876541230"
            }
        ]

        ,
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
        document.title = 'Property Management | AMC Survey'
    }, [])


    return (
        <>
            <PageTitle title={'Review Survey'} />

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
                            <ReviewListRow
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button style={{ borderRadius: '0 0 10px 10px', margin: '0 10px 0 0 ' }} onClick={() => navigate(route.doneSurveyManagenet)}>
                    Submit Property
                </Button>
            </div>
        </>
    )
}



export default SurveyManagement
