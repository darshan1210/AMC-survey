/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Button, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { wardColums, zoneColums } from 'shared/constants/TableHeaders'
import DatePicker from 'react-datepicker'

function UserFilters({ filterChange, closeDrawer, location, startDate, endDate, setDateRange }) {
    const { handleSubmit, control, reset, getValues } = useForm({})

    // useEffect(() => {
    //     const seletctData = defaultValue?.selectedState?.map((e) => {
    //         const temp = statesColumn?.filter(item => item?.value === e)
    //         return temp[0]
    //     })

    // }, [defaultValue])


    function onSubmit(data) {
        if (location?.pathname?.startsWith('/user')) {
            filterChange({
                isEmailVerified: data?.isEmailVerified?.value,
                isMobileVerified: data?.isMobileVerified?.value,
                eGender: data?.eGender?.value,
                eStatus: data?.eStatus?.value,
                selectedState: data?.selectedState,
                dateFrom: startDate?.toISOString(),
                dateTo: endDate?.toISOString()
            })
            closeDrawer()
        } else {
            filterChange({
                eStatus: data?.eStatus?.value,
                eState: data?.eState?.value,
                dStartDate: startDate?.toISOString(),
                dEndDate: endDate?.toISOString()
            })
            closeDrawer()
        }
    }

    function onReset() {
        if (location?.pathname?.startsWith('/user')) {
            filterChange({
                isEmailVerified: '',
                isMobileVerified: '',
                eGender: '',
                eStatus: 'y',
                selectedState: []
            })
            reset({})
            setDateRange([null, null])
            closeDrawer()
        } else {
            filterChange({
                eStatus: '',
                eState: '',
                dStartDate: '',
                dEndDate: '',
                selectedState: []
            })
            reset({})
            setDateRange([null, null])
            closeDrawer()
        }
    }

    return (
        <Form className='user-filter' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Form.Group className='form-group'>
                <Form.Label>
                    Ward
                </Form.Label>
                <Controller
                    name='eStatus'
                    control={control}
                    render={({ field: { onChange, value = [], ref } }) => (
                        <Select
                            ref={ref}
                            value={value}
                            placeholder='Select ward..'
                            options={wardColums}
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
                    Zone
                </Form.Label>
                <Controller
                    name='sZone'
                    control={control}
                    render={({ field: { onChange, value = [], ref } }) => (
                        <Select
                            ref={ref}
                            value={value}
                            placeholder='Select zone..'
                            options={zoneColums}
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
                            className="datepicker-inputbox form-control"
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
                            className="datepicker-inputbox form-control"
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

UserFilters.propTypes = {
    filterChange: PropTypes.func,
    defaultValue: PropTypes.object,
    closeDrawer: PropTypes.func,
    location: PropTypes.object,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    setDateRange: PropTypes.func,
};
export default UserFilters
