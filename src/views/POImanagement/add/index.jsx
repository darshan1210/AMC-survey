import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import CommonInput from 'shared/components/CommonInput';
import { useMutation, useQueryClient } from 'react-query';
import { AddPOI } from 'query/POI/poi.query';
import heic2any from 'heic2any';
import { toaster } from 'helper/helper';

function AddPoi({ isModal, setModal, StateData, blockId, poiID, VerifyPOImutate, VerifyLoad }) {
    const fileInputRef = useRef(null)
    const query = useQueryClient();
    const [isFileLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const { control, watch, register, formState: { errors }, handleSubmit, reset, setError, setValue } = useForm({ mode: 'onSubmit' });
    const { mutate, isLoading } = useMutation(AddPOI, {
        onSuccess: (response) => {
            toaster(response?.message, 'success');
            query.invalidateQueries('poiList');
            reset();
            setModal(false);
        }
    })




    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation({ latitude, longitude });
                },
                function (error) {
                    setError(`poi`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
                    toaster('Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.', 'error')
                    console.error("Error getting location:", error.message);
                }
            );
        } else {
            setError(`poi`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
            console.error("Geolocation is not supported by this browser.");
        }
    }, [watch('sIcon')]);

    const onSubmit = async (Data) => {
        if (location?.latitude && location?.longitude) {

            if (poiID) {
                const finalData = {
                    new_latitude: location?.latitude,
                    new_longitude: location?.longitude,
                    image: Data?.sIcon,
                }

                const formData = new FormData();
                Object.entries(finalData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((item) => {
                            formData.append(key, item);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });


                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                VerifyPOImutate({ formData, poiID })
            } else {
                const userData = JSON.parse(localStorage.getItem('userData'));
                console.log('StateData', StateData)

                const finalData = {
                    block_id: blockId,
                    zone_id: StateData?.zone.id,
                    ward_id: StateData?.ward.id,
                    surveyor_id: userData?.roles?.id,
                    image: Data?.sIcon,
                    comment: Data?.comment || '',
                    poi: Data?.poi,
                    latitude: location?.latitude,
                    longitude: location?.longitude
                };

                const formData = new FormData();

                Object.entries(finalData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((item) => {
                            formData.append(key, item);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });


                // for (var pair of formData.entries()) {
                //     console.log(pair[0] + ', ' + pair[1]);
                // }

                mutate(formData);
            }
        } else {
            setError(`sIcon`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
            toaster('Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.', 'error')
        }

    };


    const handleFileInputClick = () => {
        if (location?.latitude && location?.longitude) {
            setValue('sIcon', '');
            if (fileInputRef.current) {
                fileInputRef.current.click()
            }
        } else {
            setError(`sIcon`, { type: 'manual', message: 'Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.' });
            toaster('Check Network or To reset Location permissions , go to this site in Chrome Settings > Privacy and Security > Site Settings > Permissions, then adjust permissions as needed for Location.', 'error')
        }
    }
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
        <div>

            <Modal show={isModal} onHide={() => { setModal(false); reset() }} id='add-ticket' className='addPOIModal' size='md'>
                <Form className='step-one' autoComplete='off'>
                    <Modal.Header closeButton>
                        <Modal.Title className='add-ticket-header'> {poiID ? 'Verify POI Details' : 'Add POI Details'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* POI*/}{!poiID && <Col sm={12}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    label='Poi Details'
                                    required
                                    className={`form-control ${errors?.poi && 'error'}`}
                                    name='poi'
                                    placeholder='Enter poi details...'
                                    onChange={(e) => e.target.value}
                                    validation={{
                                        required: {
                                            value: true,
                                            message: 'poi details is required'
                                        },
                                        minLength: {
                                            value: 2,
                                            message: 'Poi details must be between 2 and 30 characters'
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: 'Poi details must be between 2 and 30 characters'
                                        }
                                    }}
                                />
                            </Col>}

                            <Col sm={12}>
                                <div className='fileinput'>
                                    <label className='islabel'>Add POI Images<span className='inputStar'>*</span></label>
                                    <div className='inputtypefile'>
                                        <div className='inputMSG'>
                                            {watch('sIcon') ? (
                                                <div className="document-preview-group">
                                                    <div className='img-over' onClick={handleFileInputClick}>Change POI Image</div>
                                                    {
                                                        (typeof watch('sIcon') !== 'string' && watch('sIcon')) ? (
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
                                            ) : <span>Add POI Image {isFileLoading && <Spinner size='sm' />}</span>}
                                        </div>
                                        <Controller
                                            name={`sIcon`}
                                            control={control}
                                            rules={{
                                                required: "Please add POI Image",
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
                                                        accept='.jpg,.jpeg,.png,.JPEG,.JPG,.PNG,.heic,.HEIC'
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

                            {!poiID && <Col sm={12}>
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    label='Comment'
                                    className={`form-control ${errors?.comment && 'error'}`}
                                    name='comment'
                                    placeholder='Enter Comment...'
                                    onChange={(e) => e.target.value}
                                />
                            </Col>}

                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" disabled={isLoading || isFileLoading || VerifyLoad} onClick={() => { setModal(false); reset() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" disabled={isLoading || isFileLoading || VerifyLoad} type='submit' onClick={handleSubmit(onSubmit)}>
                            Submit {(isLoading || VerifyLoad) && <Spinner size='sm' />}
                        </Button>
                    </Modal.Footer>
                </Form >
            </Modal>
        </div>
    )
}

AddPoi.propTypes = {
    isModal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    StateData: PropTypes.any,
    blockId: PropTypes.string,
    poiID: PropTypes.string,
    VerifyPOImutate: PropTypes.any,
    VerifyLoad: PropTypes.bool,
};

export default AddPoi;