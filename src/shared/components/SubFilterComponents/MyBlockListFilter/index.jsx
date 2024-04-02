/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Button, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { GetWardList, GetZoneList } from 'query/filters/filters.query'
import { useQuery } from 'react-query'
import moment from 'moment'

function MyBlockFilters({ filterChange, closeDrawer, }) {
    const { handleSubmit, control, getValues, watch, reset } = useForm({})
    const [zoneList, setZoneList] = useState([])
    const [wardList, setWardList] = useState([])


    const { isLoading, isFetching } = useQuery('zoneList', () => GetZoneList(), {
        select: (data) => data.data.data,
        onSuccess: (data) => {
            const FilterData = data?.map((e) => {
                return { "label": e?.zone_name, "value": e?.id }
            })
            setZoneList(FilterData);
        }
    })

    const { isLoading: iswardLoading, isFetching: iswardFetching } = useQuery(['wardList', watch('sZone')?.value], () => GetWardList(watch('sZone')?.value), {
        enabled: !!watch('sZone')?.value,
        select: (data) => data.data.data,
        onSuccess: (data) => {
            const FilterData = data?.map((e) => {
                return { "label": e?.ward_name, "value": e?.id }
            })
            setWardList(FilterData);
        }
    })

    // useEffect(() => {
    //     const seletctData = defaultValue?.selectedState?.map((e) => {
    //         const temp = statesColumn?.filter(item => item?.value === e)
    //         return temp[0]
    //     })

    // }, [defaultValue])


    function onSubmit(data) {
        if (data?.dStartDate && data?.dEndDate) {
            const isStartDate = moment(data?.dStartDate).format('YYYY-MM-DD')
            const isEndDate = moment(data?.dEndDate).format('YYYY-MM-DD')
            filterChange({
                dateFrom: isEndDate,
                dateTo: isStartDate,
                sZone: data?.sZone?.value,
                sWard: data?.sWard?.value
            });
        } else {
            filterChange({
                dateFrom: '',
                dateTo: '',
                sZone: data?.sZone?.value,
                sWard: data?.sWard?.value
            });
        }
        closeDrawer();
    }

    function onReset() {
        filterChange({
            dateFrom: '',
            dateTo: '',
            sZone: '',
            sWard: ''
        })
        reset({});
        closeDrawer();
    }

    return (
        <Form className='user-filter' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>

            <Form.Group className='form-group'>
                <Form.Label>
                    Zone
                </Form.Label>
                <Controller
                    name='sZone'
                    control={control}
                    render={({ field: { onChange, value = [], ref } }) => (
                        <Select
                            ref={ref}
                            value={value}
                            isLoading={isLoading || isFetching}
                            placeholder='Select zone..'
                            options={zoneList}
                            className='react-select'
                            classNamePrefix='select'
                            closeMenuOnSelect={true}
                            onChange={(e) => {
                                onChange(e)
                            }}
                        />
                    )}
                />
            </Form.Group>

            <Form.Group className='form-group'>
                <Form.Label>
                    Ward
                </Form.Label>
                <Controller
                    name='sWard'
                    control={control}
                    render={({ field: { onChange, value = [], ref } }) => (
                        <Select
                            ref={ref}
                            value={value}
                            isLoading={iswardLoading || iswardFetching}
                            isDisabled={!watch('sZone')?.value}
                            placeholder='Select ward..'
                            options={wardList}
                            className='react-select'
                            classNamePrefix='select'
                            closeMenuOnSelect={true}
                            onChange={(e) => {
                                onChange(e)
                            }}
                        />
                    )}
                />
            </Form.Group>

            <Form.Group className='form-group'>
                <Form.Label className='date-lable'>
                    Select start Date
                </Form.Label>
                <Controller
                    name="dStartDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            selected={field.value}
                            placeholderText='Select Start Date'
                            onChange={(date) => field.onChange(date)}
                            selectsStart
                            startDate={field.value}
                            endDate={getValues('dEndDate')}
                            showYearDropdown
                            yearDropdownItemNumber={10}
                            scrollableYearDropdown
                            className="datepicker-inputbox"
                        />
                    )}
                />
            </Form.Group>
            <Form.Group className='form-group'>
                <Form.Label className='date-lable'>
                    Select end Date
                </Form.Label>
                <Controller
                    name="dEndDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            selected={field.value}
                            placeholderText='Select End Date'
                            onChange={(date) => field.onChange(date)}
                            selectsEnd
                            startDate={getValues('dStartDate')}
                            endDate={field.value}
                            minDate={getValues('dStartDate')}
                            showYearDropdown
                            yearDropdownItemNumber={10}
                            scrollableYearDropdown
                            className="datepicker-inputbox"
                        />
                    )}
                />
            </Form.Group>

            {/* <Form.Group className='form-group'>
                <Form.Label className='date-lable'>
                    Select Date Range
                </Form.Label>
                <Controller
                    name="dDateRange"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            selected={field.value}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText='Select Date Range'
                            onChange={(date) => {
                                const [start, end] = date
                                setDateRange([start, end])
                            }}
                            isClearable={true}
                            showYearDropdown
                            dateFormatCalendar="MMMM"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            className="datepicker-inputbox"
                        />
                    )}
                />
            </Form.Group> */}

            <div className='filter-button-group'>
                <Button variant='secondary' type='reset' onClick={onReset} className='square reset-button'>
                    <FormattedMessage id='reset' />
                </Button>
                <Button variant='primary' type='submit' className='square secondary-btn'>
                    <FormattedMessage id='apply' />
                </Button>
            </div>
        </Form>
    )
}

MyBlockFilters.propTypes = {
    filterChange: PropTypes.func,
    defaultValue: PropTypes.object,
    closeDrawer: PropTypes.func,
    location: PropTypes.object,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    setDateRange: PropTypes.func,
};
export default MyBlockFilters
