import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import CommonInput from 'shared/components/CommonInput';
import { useMutation, useQueryClient } from 'react-query';
import { AddPOI } from 'query/POI/poi.query';
import { toaster } from 'helper/helper';

function AddPoi({ isModal, setModal }) {
    const fileInputRef = useRef(null)
    const query = useQueryClient()
    const [imagePreviews, setImagePreviews] = useState([]);

    const { control, watch, register, formState: { errors }, handleSubmit, reset, setValue, setError } = useForm({ mode: 'onSubmit', defaultValues: { poi: [{ sDescription: '', sPoiImage: '' }] } });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "poi",
    });

    const { mutate } = useMutation(AddPOI, {
        onSuccess: (response) => {
            toaster(response?.message, 'success')
            query.invalidateQueries('poiList')
            setModal(false)
        }
    })


    const onSubmit = async (Data) => {

        console.log('Data', Data)

        try {
            const userData = JSON.parse(localStorage.getItem('userData'));

            const finalData = {
                society_name: Data?.sSociety,
                zone_id: userData?.zone_id,
                ward_id: userData?.ward_id,
                surveyor_id: userData?.roles?.id
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

            Data?.poi?.forEach((poi, index) => {
                formData.append(`poi[${index}]`, poi.sDescription);
                formData.append(`image[${index}]`, poi.sPoiImage);
                formData.append(`latitude[${index}]`, poi.latitude);
                formData.append(`longitude[${index}]`, poi.longitude);
            })

            // Display the key/value pairs
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            mutate(formData);
        } catch (error) {
            console.error('Error getting user data:', error);
        }
    };


    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileInputChange = (index, event) => {
        const file = event.target.files[0];
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = URL.createObjectURL(file);
        setImagePreviews(newImagePreviews);
    };

    const getLocation = async (index) => {
        try {

            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

            // Clear watch if permission is granted
            if (permissionStatus.state === 'granted') {
                navigator.geolocation.clearWatch(permissionStatus.id);
            }

            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve(pos.coords),
                    (err) => reject(err)
                );
            });
            console.log('pos', pos)
            // update('poi', updatedFields);
            setValue(`poi[${index}].latitude`, pos.latitude);
            setValue(`poi[${index}].longitude`, pos.longitude);
            // setValue(`poi[${index}].location`, true);

            toaster('Location updated successfully', 'success');
        } catch (err) {
            console.log('err', err)
            setValue(`poi[${index}].location`, false);

            // navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            //     if (permissionStatus.state === 'granted') {
            //         navigator.geolocation.clearWatch(permissionStatus.id);
            //     }
            // });
            setError(`poi[${index}].location`, { type: 'manual', message: 'Please go to your browser settings and allow location access for this website.' });
            toaster('Please go to your browser settings and allow location access for this website.', 'error')
        }
    };

    return (
        <div>

            <Modal show={isModal} onHide={() => { setModal(false); reset() }} id='add-ticket' className='addPOIModal' size='md'>
                <Form className='step-one' autoComplete='off'>
                    <Modal.Header closeButton>
                        <Modal.Title className='add-ticket-header'>Add POI Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>

                            {/* Society */}  <Col sm={12}>
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

                            {
                                fields.map((field, index) => {
                                    return (
                                        <Row key={field?.id} className='poiModule'>
                                            <div className='addPOIbutton'>
                                                <Button onClick={() => { append({ sDescription: '', sPoiImage: '' }) }}>Add POI</Button>
                                                {fields.length > 1 && <Button onClick={() => { remove(index) }}>Remove POI</Button>}

                                            </div>
                                            {/* POI*/} <Col sm={12}>
                                                <CommonInput
                                                    type='textarea'
                                                    register={register}
                                                    errors={errors}
                                                    customerror={errors?.poi?.[`${index}`]?.sDescription}
                                                    customerrorMsg={errors?.poi?.[`${index}`]?.sDescription?.message}
                                                    label={`POI - ${index + 1}`}
                                                    required
                                                    className={`form-control ${errors?.poi?.[`${index}`]?.sDescription && 'error'}`}
                                                    name={`poi[${index}].sDescription`}
                                                    placeholder='Enter POI Adress...'
                                                    onChange={(e) => e.target.value}
                                                    validation={{
                                                        required: {
                                                            value: true,
                                                            message: 'POI Adress is required'
                                                        },
                                                    }}
                                                />
                                            </Col>
                                            <Col sm={12}>
                                                <div className='fileinput'>
                                                    <div className='islabel'>
                                                        <label>Add POI - {index + 1} Image<span className='inputStar'>*</span></label>
                                                    </div>
                                                    <div className='inputtypefile'>
                                                        <div className='inputMSG'>
                                                            {watch(`poi`)[index]?.sPoiImage ? (
                                                                <div className="document-preview-group">
                                                                    <div className='img-over' onClick={() => handleFileInputClick(index)}>Change POI Image</div>
                                                                    {imagePreviews[index] && (
                                                                        <div className="document-preview">
                                                                            <img src={imagePreviews[index]} alt='altImage' />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span>Upload POI Image</span>
                                                            )}
                                                        </div>

                                                        <Controller
                                                            name={`poi[${index}].sPoiImage`}
                                                            control={control}
                                                            rules={{
                                                                required: "Please add POI Image",
                                                                validate: {
                                                                    fileType: (value) => {
                                                                        if (value && typeof (watch(`poi`)[index]?.sPoiImage) !== 'string') {
                                                                            const allowedFormats = ['jpeg', 'png', 'jpg', 'JPEG', 'PNG', 'JPG'];
                                                                            const fileExtension = value.name.split('.').pop().toLowerCase();

                                                                            if (!allowedFormats.includes(fileExtension)) {
                                                                                return "Unsupported file format";
                                                                            }

                                                                            const maxSize = 2 * 1000 * 1000; // 1MB in bytes
                                                                            if (value.size >= maxSize) {
                                                                                return "File size must be less than 2MB";
                                                                            }
                                                                        }
                                                                        return true;
                                                                    },
                                                                }
                                                            }}
                                                            render={({ field: { onChange, ref } }) => {
                                                                return <>
                                                                    <Form.Control
                                                                        ref={(e) => {
                                                                            ref(e);
                                                                            fileInputRef.current = e;
                                                                        }}
                                                                        type='file'
                                                                        name={`poi[${index}].sPoiImage`}
                                                                        accept='.jpg,.jpeg,.png,.JPEG,.JPG,.PNG'
                                                                        errors={errors}
                                                                        className={errors?.poi?.[`${index}`]?.sPoiImage && 'error'}
                                                                        onChange={(e) => {
                                                                            onChange(e.target.files[0])
                                                                            handleFileInputChange(index, e);
                                                                        }}
                                                                    />
                                                                </>
                                                            }}
                                                        />
                                                    </div>

                                                    <span className='card-error'>{errors && errors?.poi?.[`${index}`]?.sPoiImage && <Form.Control.Feedback type="invalid">{errors?.poi?.[`${index}`]?.sPoiImage.message}</Form.Control.Feedback>}</span>
                                                </div>
                                            </Col>


                                            {/* chek Box */}  <Col sm={12}>
                                                <Form.Group className='poi-form-checkbox'>
                                                    <Controller
                                                        name={`poi[${index}].location`}
                                                        control={control}
                                                        rules={{
                                                            required: "Please detect nearby location",
                                                        }}
                                                        render={({ field: { onChange, value = [], ref } }) => (
                                                            <Form.Check
                                                                type='checkbox'
                                                                ref={ref}
                                                                value={value}
                                                                id={`${field?.id}`}
                                                                label={'Auto detect POI Location'}
                                                                className={` ${errors?.poi?.[`${index}`]?.location && 'error'}`}
                                                                onChange={(e) => {
                                                                    onChange(e)
                                                                    console.log('e', e.target.value)
                                                                    if (e.target.value !== 'true') {
                                                                        getLocation(index)
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.poi?.[`${index}`]?.location && (
                                                        <Form.Control.Feedback type='invalid'>
                                                            {errors?.poi?.[`${index}`]?.location.message}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }


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
        </div>
    )
}

AddPoi.propTypes = {
    isModal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired
};

export default AddPoi;