
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import POIListRow from 'shared/components/POIlistRow'
import PageTitle from 'shared/components/PageTitle'
import TopBar from 'shared/components/Topbar'
import UserFilters from 'shared/components/UserListFilter'
import { POIColums } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import AddPoi from './add'
import { GetPOIList, SubmitAllPOI } from 'query/POI/poi.query'
import { useMutation, useQuery } from 'react-query'
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { toaster } from 'helper/helper'
import { route } from 'shared/constants/AllRoutes'

const POIManagement = () => {
    const location = useLocation()
    const { id } = useParams()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))
    const [isAddPOIModal, setAddPOIModal] = useState(false)
    const [poiListData, setPoilistData] = useState(null)
    const [poiToggle, setPoiToggle] = useState(false)

    const navigate = useNavigate()
    function getRequestParams(e) {
        const data = e ? parseParams(e) : params.current
        return {
            pageNumber: +data?.pageNumber?.[0] || 1,
            nStart: (+data?.pageNumber?.[0] - 1) || 0,
            nLimit: data?.nLimit || 10,
            eStatus: data?.eStatus || 0,
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
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: `inProgress `, value: '1' },
        { name: 'Complete ', value: '2' },
    ];

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange


    const { isLoading, isFetching } = useQuery(['poiList', requestParams], () => GetPOIList(requestParams, id), {
        enabled: !!id,
        select: (data) => data.data.data,
        onSuccess: (data) => {
            setPoilistData(data);
        }
    })

    const { mutate } = useMutation(SubmitAllPOI, {
        onSuccess: () => {
            toaster('POI submit successfully', 'success');
            navigate(route.taskManagement);
        }
    })

    const SubmitProperty = () => {
        mutate({ block_id: id })
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
        setRequestParams({ ...requestParams, dStartDate: e?.dStartDate || '', dEndDate: e?.dEndDate || '' })
    }
    function handleStatusChange(value) {
        if (value === '1') {
            setRequestParams({ ...requestParams, eStatus: 0, pageNumber: 1 })
        } else if (value === '2') {
            setRequestParams({ ...requestParams, eStatus: 3, pageNumber: 1 })
        }
    }

    useEffect(() => {
        console.log('first', location?.state?.totalPOI, poiListData?.total, requestParams?.eStatus)
        if (location?.state?.totalPOI <= poiListData?.total && requestParams?.eStatus === 3) {
            setPoiToggle(true)
        } else {
            setPoiToggle(false)
        }
    }, [requestParams, poiListData])

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
            {poiToggle && <div className='d-flex justify-content-end pe-3'>
                <Button className='rounded-3' onClick={SubmitProperty}>
                    Submit All POI
                </Button>
            </div>}
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
                        onChange={(e) => { setRadioValue(e.currentTarget.value); handleStatusChange(e.currentTarget.value) }}
                    >
                        {radio.name}  {radio.value === radioValue && (`- ${poiListData?.total}` || '- 0')}
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
                    totalRecord={poiListData && (poiListData?.total || 0)}
                    pageChangeEvent={handlePageEvent}
                    isLoading={isLoading || isFetching}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                >
                    {poiListData && poiListData?.data?.map((poi, index) => {
                        return (
                            <POIListRow
                                key={poi.id}
                                index={index}
                                poi={poi}
                                blockId={id}
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
            <AddPoi isModal={isAddPOIModal} setModal={setAddPOIModal} StateData={location?.state} blockId={id} />
        </>
    )
}

export default POIManagement
