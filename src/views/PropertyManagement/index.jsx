import { faChalkboardUser, faCircleCheck, faListCheck, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Col, Row, Spinner, ToggleButton } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Cards from 'shared/components/Card'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import PageTitle from 'shared/components/PageTitle'
import PropertyListRow from 'shared/components/PropertyListRow'
import UserFilters from 'shared/components/UserListFilter'
import { ProptyColums } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import AddProperty from './Add'
import TopBar from 'shared/components/Topbar'
import { GetPropertyList } from 'query/property/property.query'
import { useMutation, useQuery } from 'react-query'
import { ChangePOIStatus } from 'query/POI/poi.query'
import { route } from 'shared/constants/AllRoutes'
import { toaster } from 'helper/helper'
import CustomModal from 'shared/components/Modal'

const PropertyManagement = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))
    const [addProperty, setAddProperty] = useState(false)
    const [propertyList, setPropertyList] = useState(null)
    const [radioValue, setRadioValue] = useState('1');
    const [submitToggle, setSubmitToggle] = useState(true)
    const [counterData, setCounterData] = useState({});

    const radios = [
        { name: `inProgress Property (${propertyList?.total})`, value: '1' },
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleConfirm = () => {
        setAddProperty(true);
        setShow(false)
    }


    const { isLoading, isFetching } = useQuery(['propertyList', requestParams], () => GetPropertyList(requestParams, id), {
        enabled: !!id,
        select: (data) => data.data,
        onSuccess: (data) => {
            setCounterData(data?.couters);
            setPropertyList(data?.data);
        }
    })

    const { isLoading: SubmitProptyLoad, mutate } = useMutation(ChangePOIStatus, {
        onSuccess: () => {
            toaster('Property submit successfully', 'success');
            navigate(route.poiManagement(location?.state?.StateData?.blockId))

        }
    })

    const SubmitProperty = () => {
        const obj = {};
        propertyList?.data?.forEach((e, i) => {
            if (e?.is_review === 2 || e?.is_review === 0) {
                obj[i.toString()] = e?.id.toString();
            }
        });
        mutate({ poi_id: id, property_id: obj })
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

    useEffect(() => {
        if (Number(counterData?.pending_property) <= 0 && Number(counterData?.completed_property) > 0) {
            setSubmitToggle(true)
        } else {
            setSubmitToggle(false)
        }
    }, [propertyList, location])


    function hendelAddProperty() {
        if ((Number(counterData?.pending_property) <= 0) && (Number(counterData?.new_property) === 0)) {
            setShow(true);
        } else {
            setAddProperty(true)
            setShow(false)
        }
    }

    return (
        <>
            <PageTitle title={'Property Management'} />
            <TopBar
                buttons={[
                    {
                        text: 'Add Property',
                        icon: 'icon-add',
                        type: 'primary',
                        clickEventName: 'createBot',
                        btnEvent: () => { hendelAddProperty() }
                    },
                ]}
            />

            <div className='DashGrid'>
                <Row className='dashboardCards' >
                    <Col className='mb-3 '>
                        <Cards cardtext={counterData?.total_number_of_house || '0'} cardtitle={'Total Property'} cardIcon={faChalkboardUser} className='dashboard-card-1' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={counterData?.total_number_of_shops || '0'} cardtitle={'Total Shop'} cardIcon={faCircleCheck} className='dashboard-card-4' />
                    </Col>
                </Row>
                <Row className='dashboardCards' >
                    <Col className='mb-3 '>
                        <Cards cardtext={counterData?.pending_property || '0'} cardtitle={'Remaining Property'} cardIcon={faMagnifyingGlassLocation} className='dashboard-card-3' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={counterData?.completed_property || '0'} cardtitle={'Completed Property'} cardIcon={faListCheck} className='dashboard-card-2' />
                    </Col>
                </Row>
                <Row className='dashboardCards' >

                    <Col className='mb-3 '>
                        <Cards cardtext={counterData?.new_property || '0'} cardtitle={'New Property'} cardIcon={faCircleCheck} className='dashboard-card-4' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={counterData?.total_number_of_other_property || '0'} cardtitle={'Other Property'} cardIcon={faChalkboardUser} className='dashboard-card-1' />
                    </Col>

                </Row>
            </div>


            {(submitToggle) && (
                <div className='d-flex justify-content-end pe-3'>
                    <Button className='rounded-3' disabled={SubmitProptyLoad} onClick={SubmitProperty}>
                        Submit All Property {SubmitProptyLoad && <Spinner size='sm' />}
                    </Button>
                </div>
            )}

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
                            search: false,
                            filter: false
                        }
                    }}
                    sortEvent={handleSort}
                    headerEvent={(name, value) => handleHeaderEvent(name, value)}
                    totalRecord={propertyList && (propertyList?.total || 0)}
                    pageChangeEvent={handlePageEvent}
                    isLoading={isFetching || isLoading}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                >
                    {propertyList && propertyList?.data?.map((Property, index) => {
                        return (
                            <PropertyListRow
                                key={Property.id}
                                index={index}
                                Property={Property}
                                StateData={location?.state?.StateData}
                                counterData={counterData}
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

            <CustomModal
                open={show}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                disableHeader
                bodyTitle='Are you sure you want to add new Property?'
                isLoading={false}
            />
            <AddProperty isModal={addProperty} setModal={setAddProperty} StateData={location?.state?.StateData} counterData={counterData} id={id} />
        </>
    )
}

export default PropertyManagement
