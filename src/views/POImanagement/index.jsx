
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import POIListRow from 'shared/components/POIlistRow'
import PageTitle from 'shared/components/PageTitle'
import TopBar from 'shared/components/Topbar'
import UserFilters from 'shared/components/UserListFilter'
import { POIColums } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import AddPoi from './add'
import { GetPOIList } from 'query/POI/poi.query'
import { useQuery } from 'react-query'

const POIManagement = () => {
    const location = useLocation()

    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))
    const [isAddPOIModal, setAddPOIModal] = useState(false)
    const [poiListData, setPoilistData] = useState([])


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
    const [columns, setColumns] = useState(getSortedColumns(POIColums, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange


    const { isLoading } = useQuery(['poiList', requestParams], () => GetPOIList(requestParams), {
        select: (data) => data.data,
        onSuccess: (data) => {
            setPoilistData(data.data)
        }
    })
    console.log('poiListData', poiListData)
    // const sWard = location?.state?.ward || "Ward"
    // const sZone = location?.state?.zone || "zone"
    // List
    // const data = {
    //     "bots": [
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Sunrise Apartments",
    //             "CreatedBy": "Ramesh Patel",
    //             "CreatedDate": "10-12-2020",
    //             "POI": "B12, Lard Society, Prahaladnagar Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Green Valley Residency",
    //             "CreatedBy": "Suresh Kumar",
    //             "CreatedDate": "05-07-2021",
    //             "POI": "C7, Green Valley Residency, Bapunagar Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Royal Palm Heights",
    //             "CreatedBy": "Vijay Sharma",
    //             "CreatedDate": "22-09-2020",
    //             "POI": "A15, Royal Palm Heights, Vasna Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Pearl Paradise",
    //             "CreatedBy": "Deepak Gupta",
    //             "CreatedDate": "18-04-2021",
    //             "POI": "D23, Pearl Paradise, Chandkheda Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Silver Crest",
    //             "CreatedBy": "Amit Kumar",
    //             "CreatedDate": "11-11-2020",
    //             "POI": "E8, Silver Crest, Sabarmati Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Emerald Towers",
    //             "CreatedBy": "Rajesh Singh",
    //             "CreatedDate": "30-06-2021",
    //             "POI": "F17, Emerald Towers, SG Highway, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Golden Enclave",
    //             "CreatedBy": "Neha Sharma",
    //             "CreatedDate": "14-02-2021",
    //             "POI": "G9, Golden Enclave, Sardar Patel Ring Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Diamond Heights",
    //             "CreatedBy": "Manoj Verma",
    //             "CreatedDate": "09-08-2020",
    //             "POI": "H6, Diamond Heights, Naranpura Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Platinum Towers",
    //             "CreatedBy": "Anita Patel",
    //             "CreatedDate": "25-03-2021",
    //             "POI": "I20, Platinum Towers, Ashram Road, Ahmedabad"
    //         },
    //         {
    //             "PropertytextNo": "02310860000001H",
    //             "Ward": sWard,
    //             "Zone": sZone,
    //             "Society": "Sapphire Gardens",
    //             "CreatedBy": "Sanjay Gupta",
    //             "CreatedDate": "03-10-2020",
    //             "POI": "J10, Sapphire Gardens, Thaltej Road, Ahmedabad"
    //         }
    //     ],
    //     "count": {
    //         "totalData": 38
    //     }
    // }

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
            <PageTitle title={'POI Management'} />
            <TopBar
                buttons={[
                    {
                        text: 'Add POI',
                        icon: 'icon-add',
                        type: 'primary',
                        clickEventName: 'createBot',
                        btnEvent: () => { setAddPOIModal(true) }
                    },
                ]}
            />
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
                    totalRecord={poiListData && (poiListData.length || 0)}
                    pageChangeEvent={handlePageEvent}
                    isLoading={isLoading}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                >
                    {poiListData.length && poiListData?.map((poi, index) => {
                        return (
                            <POIListRow
                                key={poi.id}
                                index={index}
                                poi={poi}
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
            <AddPoi isModal={isAddPOIModal} setModal={setAddPOIModal} />
        </>
    )
}

export default POIManagement
