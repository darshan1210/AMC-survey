import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import CommonInput from 'shared/components/CommonInput';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateProperty, addProperty } from 'query/property/property.query';
import { toaster } from 'helper/helper';
import { OtherTypeEnum } from 'shared/constants/TableHeaders';
import heic2any from 'heic2any';


function AddProperty({ isModal, setModal, StateData, counterData, id, UpdateID, oldData }) {
    const fileInputRef = useRef(null)
    const query = useQueryClient()
    const [isFileLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const { control, watch, register, formState: { errors }, handleSubmit, reset, setValue, setError } = useForm({ mode: 'onSubmit' });

    const handleFileInputClick = () => {
        setValue('sIcon', '');
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

    const { isLoading: UpdateisLoad, mutate: updateMutate } = useMutation(UpdateProperty, {
        onSuccess: () => {
            toaster('Property Added successfully', 'success');
            query.invalidateQueries('propertyList');
            setModal(false);
            reset();
        }
    })

    useEffect(() => {
        if (oldData) {
            if (oldData?.is_not_found === 1) {
                reset({ sPropertyInfo: oldData?.property_text })
            } else {
                reset({
                    sPropertyInfo: oldData?.property_text,
                    sIcon: oldData?.property_image?.file_http_url
                })
            }
        } else {
            reset()
        }
    }, [UpdateID, isModal])


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation({ latitude, longitude });
                },
                function (error) {
                    setError(`sPropertyInfo`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
                    toaster('Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.', 'error')
                    console.error("Error getting location:", error.message);
                }
            );
        } else {
            setError(`sPropertyInfo`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
            console.error("Geolocation is not supported by this browser.");
        }
    }, [watch('sIcon')]);
    console.log('watchiii', watch('sIcon'))
    const onSubmit = async (data) => {
        if (location?.latitude && location?.longitude) {
            if (UpdateID) {
                const FinalData = {
                    property_text: data?.sPropertyInfo,

                }
                if (data?.sIcon && typeof (data?.sIcon) !== 'string') {
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

                updateMutate({ formData, UpdateID })

            } else {
                const FinalData = {
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    ward_id: StateData?.ward?.id,
                    zone_id: StateData?.zone?.id,
                    poi_id: id,
                    property_text: data?.sPropertyInfo,
                    is_not_found: data?.ePropertyNotFound ? 1 : 0,
                    is_new: data?.eNewProperty ? 1 : 0,
                    type: data?.type,
                    other_type: data?.other_type?.value || '',
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
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                mutate(formData)
            }

        } else {
            setError(`sIcon`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
            toaster('Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.', 'error')
        }


    }

    useEffect(() => {
        if ((Number(counterData?.pending_house) <= 0) && (Number(counterData?.pending_shop) <= 0)) {
            setValue('eNewProperty', true)
            setValue('ePropertyNotFound', false)
        } else {
            setValue('eNewProperty', false)
            setValue('ePropertyNotFound', false)
        }
    }, [counterData])



    const handleFileChange = async (file) => {
        setIsLoading(true)
        try {

            if (file) {
                // Check if the file is in HEIC format
                if (file.type === '') {
                    try {
                        // Convert HEIC to JPEG format
                        const jpegFile = await heic2any({
                            blob: file,
                            toType: 'image/jpeg'
                        });
                        const convertedFile = new File([jpegFile], file.name, {
                            type: 'image/jpeg', // or 'image/png'
                        });
                        // Now you can process the JPEG file
                        console.log(convertedFile)
                        return convertedFile
                    } catch (error) {
                        console.error('Error converting HEIC to JPEG:', error);
                        // Handle the error
                    }
                } else {
                    // For other formats, proceed with processing the file
                    return file
                }
            }
        } catch (e) {
            console.log('e', e)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <Modal show={isModal} onHide={() => { setModal(false); reset() }} id='add-ticket' className='bigModal' size='lg'>
                <Form className='step-one' autoComplete='off'>
                    <Modal.Header closeButton>
                        <Modal.Title className='add-ticket-header'>{UpdateID ? 'Update' : 'Add'} Survey details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>

                            {/* POI*/}<Col sm={12}>
                                <CommonInput
                                    type='text'
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
                                        minLength: {
                                            value: 2,
                                            message: 'Property details must be between 2 and 30 characters'
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: 'Property details must be between 2 and 30 characters'
                                        }
                                    }}
                                />
                            </Col>


                            {!UpdateID && <>
                                {/* chek Box */} {((Number(counterData?.pending_house) <= 0) && (Number(counterData?.pending_shop) <= 0)) && <Col sm={6}>
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

                                {/* chek Box */}  {!((Number(counterData?.pending_house) <= 0) && (Number(counterData?.pending_shop) <= 0)) && (<>
                                    <Col sm={6}>
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
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className='form-checkbox'>
                                            <Controller
                                                name='eNewProperty'
                                                control={control}
                                                render={({ field: { onChange, value = true, ref } }) => {
                                                    return <Form.Check
                                                        type='checkbox'
                                                        ref={ref}
                                                        value={value}
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
                                    </Col>
                                </>)}

                                <Row>
                                    {/* radio Box */}
                                    <Col sm={3}>
                                        <Form.Group className='form-checkbox'>
                                            <Controller
                                                name='type'
                                                control={control}
                                                defaultValue='house'
                                                rules={{
                                                    required: "Please select Property type"
                                                }}
                                                render={({ field: { onChange, value = [], ref } }) => (
                                                    <Form.Check
                                                        type='radio'
                                                        ref={ref}
                                                        value='house'
                                                        id={'id6'}
                                                        label={'Residential'}
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
                                    <Col sm={3}>
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
                                                        label={'Commercial'}
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
                                    <Col sm={3}>
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

                                    {/* radio Box */}
                                    <Col sm={3}>
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
                                                        value='etc'
                                                        id={'id9'}
                                                        label={'etc'}
                                                        className={` ${errors.type && 'error'}`}
                                                        checked={value === 'etc'}
                                                        onChange={(e) => {
                                                            onChange(e.target.value)
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* Other Box */}{watch('type') === 'other' && <Col sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>
                                            <span>
                                                Other Property types
                                                <span className='inputStar'>*</span>
                                            </span>
                                        </Form.Label>
                                        <Controller
                                            name='other_type'
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: 'Other Property type is required'
                                                }
                                            }}
                                            render={({ field: { onChange, value = [], ref } }) => (
                                                <Select
                                                    ref={ref}
                                                    value={value}
                                                    options={OtherTypeEnum}
                                                    placeholder='Select Other Property type..'
                                                    className={`react-select border-0 ${errors.other_type && 'error'}`}
                                                    classNamePrefix='select'
                                                    closeMenuOnSelect={true}
                                                    onChange={(e) => {
                                                        onChange(e)
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.other_type && (
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.other_type.message}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>}
                            </>}




                            <div>
                                {errors.type && (
                                    <Form.Control.Feedback className='d-flex justify-content-center ' style={{ margin: '-10px 0 10px 0' }} type='invalid'>
                                        {errors.type.message}
                                    </Form.Control.Feedback>
                                )}
                            </div>



                            {(!UpdateID && !watch('ePropertyNotFound')) && <Col sm={12}>
                                <div className='fileinput'>
                                    <label className='islabel'>Add Property Images<span className='inputStar'>*</span></label>
                                    <div className='inputtypefile'>
                                        <div className='inputMSG'>
                                            {watch('sIcon') ? (
                                                <div className="document-preview-group">
                                                    <div className='img-over' onClick={handleFileInputClick}>Change Property Image</div>
                                                    {
                                                        typeof watch('sIcon') !== 'string' ? (
                                                            <div className="document-preview">
                                                                <img src={URL.createObjectURL(watch('sIcon'))} alt='altImage' />
                                                            </div>
                                                        ) : (
                                                            <div className="document-preview">
                                                                <img src={watch('sIcon')} alt='altImage' />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ) : <span>Add Property Image {isFileLoading && <Spinner size='sm' />}</span>}
                                        </div>
                                        <Controller
                                            name={`sIcon`}
                                            control={control}
                                            rules={{
                                                required: "Please add Property Image",
                                                validate: {
                                                    fileType: (value) => {
                                                        if (value && Array.isArray(value)) {
                                                            const allowedFormats = ['jpeg', 'png', 'jpg', 'heic', 'HEIC', 'JPEG', 'PNG', 'JPG'];
                                                            for (const file of value) {
                                                                const fileExtension = file.name.split('.').pop().toLowerCase();
                                                                if (!allowedFormats.includes(fileExtension)) {
                                                                    return "Unsupported file format";
                                                                }
                                                            }

                                                            const maxSize = 5 * 1000 * 1000; // 1MB in bytes
                                                            for (const file of value) {
                                                                if (file.size >= maxSize) {
                                                                    return "File size must be less than 5MB";
                                                                }
                                                            }
                                                        } else if (value && typeof value === 'object') {
                                                            const allowedFormats = ['jpeg', 'png', 'jpg', 'heic', 'HEIC', 'JPEG', 'PNG', 'JPG'];
                                                            const fileExtension = value.name.split('.').pop().toLowerCase();

                                                            if (!allowedFormats.includes(fileExtension)) {
                                                                return "Unsupported file format";
                                                            }

                                                            const maxSize = 5 * 1000 * 1000; // 1MB in bytes
                                                            if (value.size >= maxSize) {
                                                                return "File size must be less than 5MB";
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
                                                        disabled={isFileLoading}
                                                        accept='.jpg,.jpeg,.png,.JPEG,.JPG,.PNG,.HEIC,.heic'
                                                        errors={errors}
                                                        className={errors?.sIcon && 'error'}
                                                        onChange={(e) => {
                                                            const files = Array.from(e.target.files);
                                                            if (files.length === 1) {
                                                                handleFileChange(files[0]).then(result => (onChange(result))).catch(e => console.log(e))
                                                            } else {
                                                                onChange('');
                                                            }

                                                            // onChange(files.length === 1 ? files[0] : '');
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


                            {(UpdateID && oldData?.is_not_found !== 1) && (
                                <Col sm={12}>
                                    <div className='fileinput'>
                                        <label className='islabel'>Add Property Images<span className='inputStar'>*</span></label>
                                        <div className='inputtypefile'>
                                            <div className='inputMSG'>
                                                {watch('sIcon') ? (
                                                    <div className="document-preview-group">
                                                        <div className='img-over' onClick={handleFileInputClick}>Change Property Image</div>
                                                        {
                                                            typeof watch('sIcon') !== 'string' ? (
                                                                <div className="document-preview">
                                                                    <img src={URL.createObjectURL(watch('sIcon'))} alt='altImage' />
                                                                </div>
                                                            ) : (
                                                                <div className="document-preview">
                                                                    <img src={watch('sIcon')} alt='altImage' />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ) : <span>Add Property Image {isFileLoading && <Spinner size='sm' />}</span>}
                                            </div>
                                            <Controller
                                                name={`sIcon`}
                                                control={control}
                                                rules={{
                                                    required: "Please add Property Image",
                                                    validate: {
                                                        fileType: (value) => {
                                                            if (value && Array.isArray(value)) {
                                                                const allowedFormats = ['jpeg', 'png', 'jpg', 'heic', 'HEIC', 'JPEG', 'PNG', 'JPG'];
                                                                for (const file of value) {
                                                                    const fileExtension = file.name.split('.').pop().toLowerCase();
                                                                    if (!allowedFormats.includes(fileExtension)) {
                                                                        return "Unsupported file format";
                                                                    }
                                                                }

                                                                const maxSize = 5 * 1000 * 1000; // 1MB in bytes
                                                                for (const file of value) {
                                                                    if (file.size >= maxSize) {
                                                                        return "File size must be less than 5MB";
                                                                    }
                                                                }
                                                            } else if (value && typeof value === 'object') {
                                                                const allowedFormats = ['jpeg', 'png', 'jpg', 'heic', 'HEIC', 'JPEG', 'PNG', 'JPG'];
                                                                const fileExtension = value.name.split('.').pop().toLowerCase();

                                                                if (!allowedFormats.includes(fileExtension)) {
                                                                    return "Unsupported file format";
                                                                }

                                                                const maxSize = 5 * 1000 * 1000; // 1MB in bytes
                                                                if (value.size >= maxSize) {
                                                                    return "File size must be less than 5MB";
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
                                                            accept='.jpg,.jpeg,.png,.JPEG,.JPG,.PNG,.HEIC,.heic'
                                                            errors={errors}
                                                            className={errors?.sIcon && 'error'}
                                                            onChange={(e) => {
                                                                const files = Array.from(e.target.files);
                                                                if (files.length === 1) {
                                                                    handleFileChange(files[0]).then(result => (onChange(result))).catch(e => console.log(e))
                                                                } else {
                                                                    onChange('');
                                                                }
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
                            )}









                            {!UpdateID &&
                                <>
                                    {(watch('ePropertyNotFound') || watch('eNewProperty')) && <Col sm={watch('eNewProperty') ? 6 : 12}>
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
                                </>
                            }

                            {UpdateID && oldData?.admin_comment && <>
                                <Col md={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label className='light-font'>
                                            Admin Comment
                                        </Form.Label>
                                        <Form.Control type='text' name='sRole' value={oldData?.admin_comment || '-'} disabled />
                                    </Form.Group>
                                </Col>
                            </>}
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" disabled={isLoading || UpdateisLoad || isFileLoading} onClick={() => { setModal(false); reset() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' disabled={isLoading || UpdateisLoad || isFileLoading} onClick={handleSubmit(onSubmit)}>
                            {UpdateID ? 'Update' : 'Submit'} {(isLoading || UpdateisLoad) && <Spinner size='sm' />}
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
    oldData: PropTypes.any,
    id: PropTypes.string,
    UpdateID: PropTypes.string
};


export default AddProperty