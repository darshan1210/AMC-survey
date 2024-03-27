import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { zoneColums } from 'shared/constants/TableHeaders';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import CommonInput from '../CommonInput';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { route } from 'shared/constants/AllRoutes';

const PropertyListRow = ({ user, index, }) => {
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [isModal, setModal] = useState(false)
    const { control, watch, register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

    const onSubmit = async () => {
        navigate(route.surveyManagenet)
    }

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    useEffect(() => {
        reset({
            sProperty: user.PropertytextNo,
            eWard: { label: user.Ward, value: user.Ward },
            eZone: { label: user.Zone, value: user.Zone },
            sSociety: user.Society
        })
    }, [])
    console.log('ePropertyNotFound', watch('ePropertyNotFound'))

    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td>{user.PropertytextNo || '-'}</td>
                <td>{user.Ward || '-'}</td>
                <td>{user.Zone || '-'}</td>
                <td>{user.Society || '-'}</td>
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

                            {/* Society */}  <Col sm={6}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    className={`form-control ${errors?.sSociety && 'error'}`}
                                    name='sSociety'
                                    label='Society'
                                    placeholder='Enter Society Name'
                                    required
                                    onChange={(e) => {
                                        e.target.value =
                                            e.target.value?.trim() &&
                                            e.target.value.replace(/^[0-9]+$/g, '')
                                    }}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'Society Name Is Required.'
                                        },
                                    }}
                                />
                            </Col>

                            {/* POI*/} <Col sm={6}>
                                <CommonInput
                                    type='textarea'
                                    register={register}
                                    errors={errors}
                                    label='Property details'
                                    required
                                    className={`form-control ${errors?.sPropertyInfo && 'error'}`}
                                    name='sPropertyInfo'
                                    placeholder='Enter Property details...'
                                    onChange={(e) => e.target.value}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'Property details is required'
                                        },
                                    }}
                                />
                            </Col>

                            {/* chek Box */}  <Col sm={6}>
                                <Form.Group className='form-checkbox'>
                                    <Controller
                                        name='eNewProperty'
                                        control={control}
                                        render={({ field: { onChange, value = [], ref } }) => (
                                            <Form.Check
                                                type='checkbox'
                                                ref={ref}
                                                value={value}
                                                id={'id1'}
                                                label={'is New Property'}
                                                className={` ${errors.eNewProperty && 'error'}`}
                                                onChange={(e) => {
                                                    onChange(e)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.eNewProperty && (
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.eNewProperty.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* chek Box */}   <Col sm={6}>
                                <Form.Group className='form-checkbox'>
                                    <Controller
                                        name='ePropertyNotFound'
                                        control={control}
                                        render={({ field: { onChange, value = [], ref } }) => (
                                            <Form.Check
                                                type='checkbox'
                                                ref={ref}
                                                value={value}
                                                id={'id3'}
                                                label={'is Property Not Found'}
                                                className={` ${errors.ePropertyNotFound && 'error'}`}
                                                onChange={(e) => {
                                                    onChange(e)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.ePropertyNotFound && (
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.ePropertyNotFound.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* Comment */} {watch('ePropertyNotFound') && <Col sm={12}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    label='Comment'
                                    required
                                    className={`form-control ${errors?.sComment && 'error'}`}
                                    name='sComment'
                                    placeholder='Enter Comment...'
                                    onChange={(e) => e.target.value}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'Comment is required'
                                        },
                                    }}
                                />
                            </Col>}

                            <Col sm={12}>
                                <div className='fileinput'>
                                    <label>Add Property Images<span className='inputStar'>*</span></label>
                                    <div className='inputtypefile'>
                                        <div className='inputMSG'>
                                            {watch('sIcon') ? (
                                                <div className="document-preview-group">
                                                    <div className='img-over' onClick={handleFileInputClick}>Change Property Image</div>
                                                    {Array.isArray(watch('sIcon')) ? (
                                                        watch('sIcon').map((file, index) => (
                                                            <div key={index} className="document-preview">
                                                                <img src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt='altImage' />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        typeof watch('sIcon') !== 'string' && (
                                                            <div className="document-preview">
                                                                <img src={URL.createObjectURL(watch('sIcon'))} alt='altImage' />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : <span>Add Property Images</span>}
                                        </div>
                                        <Controller
                                            name={`sIcon`}
                                            control={control}
                                            rules={{
                                                required: "Please add Store logo",
                                                validate: {
                                                    fileType: (value) => {
                                                        if (value && Array.isArray(value)) {
                                                            const allowedFormats = ['jpeg', 'png', 'jpg', 'JPEG', 'PNG', 'JPG'];
                                                            for (const file of value) {
                                                                const fileExtension = file.name.split('.').pop().toLowerCase();
                                                                if (!allowedFormats.includes(fileExtension)) {
                                                                    return "Unsupported file format";
                                                                }
                                                            }

                                                            const maxSize = 1 * 1000 * 1000; // 1MB in bytes
                                                            for (const file of value) {
                                                                if (file.size >= maxSize) {
                                                                    return "File size must be less than 1MB";
                                                                }
                                                            }
                                                        } else if (value && typeof value === 'object') {
                                                            const allowedFormats = ['jpeg', 'png', 'jpg', 'JPEG', 'PNG', 'JPG'];
                                                            const fileExtension = value.name.split('.').pop().toLowerCase();

                                                            if (!allowedFormats.includes(fileExtension)) {
                                                                return "Unsupported file format";
                                                            }

                                                            const maxSize = 1 * 1000 * 1000; // 1MB in bytes
                                                            if (value.size >= maxSize) {
                                                                return "File size must be less than 1MB";
                                                            }
                                                        }
                                                        return true;
                                                    },
                                                }
                                            }}
                                            render={({ field: { onChange, ref } }) => {
                                                return (
                                                    <Form.Control
                                                        ref={(e) => {
                                                            ref(e);
                                                            fileInputRef.current = e;
                                                        }}
                                                        type='file'
                                                        name={`sIcon`}
                                                        // disabled={updateFlag}
                                                        accept='.jpg,.jpeg,.png,.JPEG,.JPG,.PNG'
                                                        errors={errors}
                                                        className={errors?.sIcon && 'error'}
                                                        onChange={(e) => {
                                                            const files = Array.from(e.target.files);
                                                            onChange(files.length === 1 ? files[0] : files);
                                                        }}
                                                        multiple // Enable multi-file selection
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <span className='card-error'>{errors && errors?.sIcon && <Form.Control.Feedback type="invalid">{errors?.sIcon.message}</Form.Control.Feedback>}</span>
                                </div>

                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setModal(false); reset() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleSubmit(onSubmit)}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form >
            </Modal>
        </>
    )
}

PropertyListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default PropertyListRow
