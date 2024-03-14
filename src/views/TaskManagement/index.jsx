import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TaskListRow from 'shared/components/TaskListRows'
import DataTable from 'shared/components/DataTable'
import Drawer from 'shared/components/Drawer'
import UserFilters from 'shared/components/UserListFilter'
import { TaskColumm } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import PageTitle from 'shared/components/PageTitle'
import { Col, Row } from 'react-bootstrap'
import Cards from 'shared/components/Card'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const TaskManagement = () => {
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

    // List
    const data = {
        "bots": [
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
            {
                "_id": "6572c6ebf142fb225eae4ca8",
                "sEmail": "",
                "sMobile": "",
                "sUserName": "Soma Anthony",
                "sAvatar": "https://pokergold-asset.s3.ap-south-1.amazonaws.com/avtar/avatar-2.png",
                "eUserType": "ubot",
                "eStatus": "y",
                "eGender": "female",
                "dCreatedDate": "2023-12-08T07:34:03.238Z",
                "transactions": {
                    "debit": 0,
                    "credit": 11
                },
                "nChips": 11,
                "nWinningRatio": 1,
                "sBotStatus": "Free",
                "nCredit": 11,
                "nDebit": 0,
                "nBotProfit": 0,

                Ward: 'Ward',
                zone: 'zone ',
                Blockname: 'Block name',
                Assignername: 'Assigner-name',
                Assigndate: 'Assign-date',
                Actionwith: 'Action-with',
                Surveybutton: 'Survey button'
            },
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
            <PageTitle title={'My Block'} />
            <div className='DashGrid'>
                <Row className='dashboardCards' >
                    <Col className='mb-3 '>
                        <Cards cardtext={'0'} cardtitle={'My Block'} cardIcon={faHouse} className='dashboard-card-1' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={'0'} cardtitle={'Block'} cardIcon={faHouse} className='dashboard-card-2' />
                    </Col>
                </Row>
                <Row className='dashboardCards' >
                    <Col className='mb-3 '>
                        <Cards cardtext={'0'} cardtitle={'Remaining'} cardIcon={faHouse} className='dashboard-card-3' />
                    </Col>
                    <Col className='mb-3 '>
                        <Cards cardtext={'0'} cardtitle={'Review'} cardIcon={faHouse} className='dashboard-card-4' />
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

export default TaskManagement
