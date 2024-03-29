import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { zoneColums } from 'shared/constants/TableHeaders';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import CommonInput from 'shared/components/CommonInput';
import { useMutation, useQueryClient } from 'react-query';
import { addProperty } from 'query/property/property.query';
import { toaster } from 'helper/helper';

function AddProperty({ isModal, setModal, StateData, counterData, id }) {
    const fileInputRef = useRef(null)
    const query = useQueryClient()
    const { control, watch, register, formState: { errors }, handleSubmit, reset, setValue } = useForm({ mode: 'onSubmit' });

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    useState(() => {
        console.log('');
        reset({
            eWard: { "label": StateData?.ward?.ward_name, "value": StateData?.ward?.id },
            eZone: { "label": StateData?.zone?.zone_name, "value": StateData?.zone?.id },
            sSociety: StateData?.socity
        })
    }, [StateData])

    const { isLoading, mutate } = useMutation(addProperty, {
        onSuccess: () => {
            toaster('Property Added successfully', 'success');
            query.invalidateQueries('propertyList');
            setModal(false);
            reset();
        }
    })

    const onSubmit = async (data) => {


        const FinalData = {
            ward_id: StateData?.ward?.id,
            zone_id: StateData?.zone?.id,
            poi_id: id,
            property_text: data?.sPropertyInfo,
            is_not_found: data?.ePropertyNotFound ? 1 : 0,
            is_new: data?.eNewProperty ? 1 : 0,
            type: data?.type,
            comment: data?.sComment || ''
        }
        if (data?.sIcon) {
            FinalData.property_image = data?.sIcon
        }


        const formData = new FormData();


        Object.entries(FinalData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    formData.append(key, item);
                });
            } else {
                formData.append(key, value);
            }
        });

        // Display the key/value pairs
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        mutate(formData)
    }
    useEffect(() => {
        if (Number(counterData?.pending_property) <= 0) {
            setValue('eNewProperty', true)
            setValue('ePropertyNotFound', false)
        }
    }, [counterData])

    return (
        <>
            <Modal show={isModal} onHide={() => { setModal(false); reset() }} id='add-ticket' className='bigModal' size='lg'>
                <Form className='step-one' autoComplete='off'>
                    <Modal.Header closeButton>
                        <Modal.Title className='add-ticket-header'>Add Survey details</Modal.Title>
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

                            {/* chek Box */} {(Number(counterData?.pending_property) <= 0) && <Col sm={6}>
                                <Form.Group className='form-checkbox'>
                                    <Controller
                                        name='eNewProperty'
                                        control={control}
                                        render={({ field: { onChange, value = true, ref } }) => {
                                            return <Form.Check
                                                type='checkbox'
                                                ref={ref}
                                                value={value}
                                                disabled={true}
                                                id={'id1'}
                                                checked={value}
                                                label={'is New Property'}
                                                className={` ${errors.eNewProperty && 'error'}`}
                                                onChange={(e) => {
                                                    onChange(e)
                                                    setValue('ePropertyNotFound', false)
                                                }}
                                            />
                                        }}
                                    />
                                    {errors.eNewProperty && (
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.eNewProperty.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>}

                            {/* chek Box */}  {(Number(counterData?.pending_property) >= 0) && <Col sm={6}>
                                <Form.Group className='form-checkbox'>
                                    <Controller
                                        name='ePropertyNotFound'
                                        control={control}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Form.Check
                                                type='checkbox'
                                                ref={ref}
                                                value={value}
                                                checked={value}
                                                id={'id3'}
                                                label={'is Property Not Found'}
                                                className={` ${errors.ePropertyNotFound && 'error'}`}
                                                onChange={(e) => {
                                                    onChange(e)
                                                    setValue('eNewProperty', false)
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
                            </Col>}
                            <Row>
                                {/* radio Box */}
                                <Col sm={4}>
                                    <Form.Group className='form-checkbox'>
                                        <Controller
                                            name='type'
                                            control={control}
                                            rules={{
                                                required: "Please select Property type"
                                            }}
                                            render={({ field: { onChange, value = [], ref } }) => (
                                                <Form.Check
                                                    type='radio'
                                                    ref={ref}
                                                    value='house'
                                                    id={'id6'}
                                                    label={'house'}
                                                    className={` ${errors.type && 'error'}`}
                                                    checked={value === 'house'} // Check if this value is selected
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* radio Box */}
                                <Col sm={4}>
                                    <Form.Group className='form-checkbox'>
                                        <Controller
                                            name='type'
                                            control={control}
                                            rules={{
                                                required: "Please select Property type"
                                            }}
                                            render={({ field: { onChange, value = [], ref } }) => (
                                                <Form.Check
                                                    type='radio'
                                                    ref={ref}
                                                    value='shop'
                                                    id={'id7'}
                                                    label={'Shop'}
                                                    className={` ${errors.type && 'error'}`}
                                                    checked={value === 'shop'} // Check if this value is selected
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Form.Group>

                                </Col>

                                {/* radio Box */}
                                <Col sm={4}>
                                    <Form.Group className='form-checkbox'>
                                        <Controller
                                            name='type'
                                            control={control}
                                            rules={{
                                                required: "Please select Property type"
                                            }}
                                            render={({ field: { onChange, value = [], ref } }) => (
                                                <Form.Check
                                                    type='radio'
                                                    ref={ref}
                                                    value='other'
                                                    id={'id8'}
                                                    label={'Other'}
                                                    className={` ${errors.type && 'error'}`}
                                                    checked={value === 'other'}
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div>
                                {errors.type && (
                                    <Form.Control.Feedback className='d-flex justify-content-center ' style={{ margin: '-10px 0 10px 0' }} type='invalid'>
                                        {errors.type.message}
                                    </Form.Control.Feedback>
                                )}
                            </div>

                            {/* Comment */} {(watch('ePropertyNotFound') || watch('eNewProperty')) && <Col sm={watch('eNewProperty') ? 6 : 12}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    label='Comment'
                                    className={`form-control ${errors?.sComment && 'error'}`}
                                    name='sComment'
                                    placeholder='Enter Comment...'
                                    onChange={(e) => e.target.value}
                                />
                            </Col>}

                            {!watch('ePropertyNotFound') && <Col sm={12}>
                                <div className='fileinput'>
                                    <label className='islabel'>Add Property Images<span className='inputStar'>*</span></label>
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
                                            ) : <span>Add Property Image</span>}
                                        </div>
                                        <Controller
                                            name={`sIcon`}
                                            control={control}
                                            rules={{
                                                required: "Please add Property Image",
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

                            </Col>}


                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" disabled={isLoading} onClick={() => { setModal(false); reset() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                            Submit {isLoading && <Spinner size='sm' />}
                        </Button>
                    </Modal.Footer>
                </Form >
            </Modal>
        </>
    )
}



AddProperty.propTypes = {
    isModal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    StateData: PropTypes.any,
    counterData: PropTypes.any,
    id: PropTypes.string
};


export default AddProperty