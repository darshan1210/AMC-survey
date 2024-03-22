import { faChalkboardUser, faCircleCheck, faListCheck, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonGroup, Col, Row, ToggleButton } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Cards from 'shared/components/Card'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import PageTitle from 'shared/components/PageTitle'
import PropertyListRow from 'shared/components/PropertyListRow'
import UserFilters from 'shared/components/UserListFilter'
import { ProptyColums } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'

const PropertyManagement = () => {
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Total - (10)', value: '1' },
        { name: 'inProgress - (13)', value: '2' },
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
    const [columns, setColumns] = useState(getSortedColumns(ProptyColums, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange


    const sWard = location?.state?.ward || "Ward"
    const sZone = location?.state?.zone || "zone"
    // List
    const data = {
        "bots": [
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Sunrise Apartments",
                "CreatedBy": "Ramesh Patel",
                "CreatedDate": "10-12-2020",
                "POI": "B12, Lard Society, Prahaladnagar Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Green Valley Residency",
                "CreatedBy": "Suresh Kumar",
                "CreatedDate": "05-07-2021",
                "POI": "C7, Green Valley Residency, Bapunagar Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Royal Palm Heights",
                "CreatedBy": "Vijay Sharma",
                "CreatedDate": "22-09-2020",
                "POI": "A15, Royal Palm Heights, Vasna Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Pearl Paradise",
                "CreatedBy": "Deepak Gupta",
                "CreatedDate": "18-04-2021",
                "POI": "D23, Pearl Paradise, Chandkheda Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Silver Crest",
                "CreatedBy": "Amit Kumar",
                "CreatedDate": "11-11-2020",
                "POI": "E8, Silver Crest, Sabarmati Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Emerald Towers",
                "CreatedBy": "Rajesh Singh",
                "CreatedDate": "30-06-2021",
                "POI": "F17, Emerald Towers, SG Highway, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Golden Enclave",
                "CreatedBy": "Neha Sharma",
                "CreatedDate": "14-02-2021",
                "POI": "G9, Golden Enclave, Sardar Patel Ring Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Diamond Heights",
                "CreatedBy": "Manoj Verma",
                "CreatedDate": "09-08-2020",
                "POI": "H6, Diamond Heights, Naranpura Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Platinum Towers",
                "CreatedBy": "Anita Patel",
                "CreatedDate": "25-03-2021",
                "POI": "I20, Platinum Towers, Ashram Road, Ahmedabad"
            },
            {
                "PropertytextNo": "02310860000001H",
                "Ward": sWard,
                "Zone": sZone,
                "Society": "Sapphire Gardens",
                "CreatedBy": "Sanjay Gupta",
                "CreatedDate": "03-10-2020",
                "POI": "J10, Sapphire Gardens, Thaltej Road, Ahmedabad"
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
        document.title = 'Property Management | AMC Survey'
    }, [])


    return (
        <>
            <PageTitle title={'Property Management'} />

            <div className='DashGrid'>
                <Row className='dashboardCards' >
                    <Col className='mb-3 '>
                        <Cards cardtext={'82'} cardtitle={'Total Property'} cardIcon={faChalkboardUser} className='dashboard-card-1' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={'30'} cardtitle={'In Progress Property'} cardIcon={faListCheck} className='dashboard-card-2' />
                    </Col>
                </Row>
                <Row className='dashboardCards' >
                    <Col className='mb-3 '>
                        <Cards cardtext={'41'} cardtitle={'Remaining Property'} cardIcon={faMagnifyingGlassLocation} className='dashboard-card-3' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={'55'} cardtitle={'Completed Property'} cardIcon={faCircleCheck} className='dashboard-card-4' />
                    </Col>
                </Row>
            </div>
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
                            <PropertyListRow
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

export default PropertyManagement
