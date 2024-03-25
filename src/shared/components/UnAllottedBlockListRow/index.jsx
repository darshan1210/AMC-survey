import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { PropertyTypeColums, zoneColums } from 'shared/constants/TableHeaders';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import CommonInput from '../CommonInput';
import Select from 'react-select';
import DatePicker from 'react-datepicker'

const UnAllottedBlockListRow = ({ user, index, }) => {
    const navigate = useNavigate()
    const [isModal, setModal] = useState(false)
    const { control, register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

    const onSubmit = async (storeData) => {
        console.log('storeData', storeData)
        navigate(route.surveyManagenet)
    }

    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td className='blockLink' onClick={() => navigate(route.poiManagement)}>{user.Blockname || '-'}</td>
                <td>{user.Ward || '-'}</td>
                <td>{user.zone || '-'}</td>
                <td>{user.TotalProperty || '-'}</td>
                <td>{user.Createdby || '-'}</td>
                <td>{user.CreatedDate || '-'}</td>
                <td onClick={() => setModal(true)}>
                    <div className='SingleDataTabeIcon'>
                        <i className='icon-create d-block' />
                    </div>
                </td>
            </tr>

            <Modal show={isModal} onHide={() => { setModal(false); reset() }} id='add-ticket' className='bigModal' size='lg'>
                <Form className='step-one' autoComplete='off'>
                    <Modal.Header closeButton>
                        <Modal.Title className='add-ticket-header'>Update Survey details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* Block Name */}  <Col sm={6}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    className={`form-control ${errors?.sBlockName && 'error'}`}
                                    name='sBlockName'
                                    label='Block Name'
                                    placeholder='Enter Block Name'
                                    required
                                    onChange={(e) => {
                                        e.target.value =
                                            e.target.value?.trim()
                                    }}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'Block Name Is Required'
                                        },
                                    }}
                                />
                            </Col>

                            {/* Ward */} <Col sm={6}>
                                <Form.Group className='form-group'>
                                    <Form.Label>
                                        <span>
                                            Ward
                                            <span className='inputStar'>*</span>
                                        </span>
                                    </Form.Label>
                                    <Controller
                                        name='eWard'
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ward is required'
                                            }
                                        }}
                                        render={({ field: { onChange, value = [], ref } }) => (
                                            <Select
                                                ref={ref}
                                                value={value}
                                                options={zoneColums}
                                                className={`react-select border-0 ${errors.eWard && 'error'}`}
                                                classNamePrefix='select'
                                                closeMenuOnSelect={true}
                                                onChange={(e) => {
                                                    onChange(e)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.eWard && (
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.eWard.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* Zone */}  <Col sm={6}>
                                <Form.Group className='form-group'>
                                    <Form.Label>
                                        <span>
                                            Zone
                                            <span className='inputStar'>*</span>
                                        </span>
                                    </Form.Label>
                                    <Controller
                                        name='eZone'
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Zone is required'
                                            }
                                        }}
                                        render={({ field: { onChange, value = [], ref } }) => (
                                            <Select
                                                ref={ref}
                                                value={value}
                                                options={zoneColums}
                                                className={`react-select border-0 ${errors.eZone && 'error'}`}
                                                classNamePrefix='select'
                                                closeMenuOnSelect={true}
                                                onChange={(e) => {
                                                    onChange(e)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.eZone && (
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.eZone.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* Total POI */}  <Col sm={6}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    className={`form-control ${errors?.nTotalPoI && 'error'}`}
                                    name='nTotalPoI'
                                    label='Total POI'
                                    placeholder='Add Total POI'
                                    required
                                    onChange={(e) => {
                                        e.target.value =
                                            e.target.value?.trim()
                                    }}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'Tp Is Required.'
                                        },
                                    }}
                                />
                            </Col>

                            {/* Total POI */}  <Col sm={6}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    className={`form-control ${errors?.sCreatedBy && 'error'}`}
                                    name='sCreatedBy'
                                    label='Created By'
                                    placeholder='Enter Name'
                                    required
                                    onChange={(e) => {
                                        e.target.value =
                                            e.target.value?.trim()
                                    }}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'Name Is Required.'
                                        },
                                    }}
                                />
                            </Col>
                            {/* Created Date */}<Col sm={6}>
                                <Form.Group className='form-group'>
                                    <Form.Label className='date-lable'>
                                        Created Date
                                    </Form.Label>
                                    <Controller
                                        name="CreatedDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                selected={field.value}
                                                placeholderText='Select Cretaed Date'
                                                onChange={(date) => field.onChange(date)}
                                                selectsStart
                                                startDate={field.value}
                                                showYearDropdown
                                                yearDropdownItemNumber={10}
                                                scrollableYearDropdown
                                                className="datepicker-inputbox"
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                            {/*  Property Type */} <Col sm={6}>
                                <Form.Group className='form-group'>
                                    <Form.Label>
                                        <span>
                                            Property Type
                                            <span className='inputStar'>*</span>
                                        </span>
                                    </Form.Label>
                                    <Controller
                                        name='PropertyType'
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Property Type is required'
                                            }
                                        }}
                                        render={({ field: { onChange, value = [], ref } }) => (
                                            <Select
                                                ref={ref}
                                                value={value}
                                                options={PropertyTypeColums}
                                                className={`react-select border-0 ${errors.PropertyType && 'error'}`}
                                                classNamePrefix='select'
                                                closeMenuOnSelect={true}
                                                onChange={(e) => {
                                                    onChange(e)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.PropertyType && (
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.PropertyType.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            {/* Created Date */}<Col sm={6}>
                                <Form.Group className='form-group'>
                                    <Form.Label className='date-lable'>
                                        Allotted Date
                                    </Form.Label>
                                    <Controller
                                        name="AllottedDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                selected={field.value}
                                                placeholderText='Select Allotted Date'
                                                onChange={(date) => field.onChange(date)}
                                                selectsStart
                                                startDate={field.value}
                                                showYearDropdown
                                                yearDropdownItemNumber={10}
                                                scrollableYearDropdown
                                                className="datepicker-inputbox"
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setModal(false); reset() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleSubmit(onSubmit)}>
                            Allotted
                        </Button>
                    </Modal.Footer>
                </Form >
            </Modal>
        </>
    )
}

UnAllottedBlockListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default UnAllottedBlockListRow
