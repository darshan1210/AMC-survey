import React from 'react'
import CustomModal from '../Modal'
import PropTypes from 'prop-types';
import CommonInput from '../CommonInput'

const CommonPasswordModal = ({ modal, setModal, bodyTitle, handleConfirm, confirmValue, message, register, errors, name, isTextArea }) => {
    return (
        <>
            <CustomModal
                open={modal}
                handleClose={() => { setModal(false) }}
                handleConfirm={handleConfirm}
                disableHeader
                bodyTitle={bodyTitle}
                confirmValue={confirmValue}
            >
                <article>
                    <h5>
                        <div>
                            {message}

                            {isTextArea === false ?
                                <CommonInput
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    className={`form-control ${errors?.name && 'error'} mt-3`}
                                    name={name}
                                    placeholder='Enter the admin password'
                                    onChange={(e) => {
                                        e.target.value =
                                            e.target.value?.trim() &&
                                            e.target.value.replace(/^[0-9]+$/g, '')
                                    }}
                                /> :
                                <CommonInput
                                    type='textarea'
                                    register={register}
                                    errors={errors}
                                    className={`form-control ${errors?.name && 'error'} mt-3`}
                                    name={name}
                                    placeholder='Type your message here...'
                                    onChange={(e) => { e?.target?.value }}
                                />
                            }

                        </div>
                    </h5>
                </article>
            </CustomModal>
        </>
    )
}

CommonPasswordModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    bodyTitle: PropTypes.string.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    confirmValue: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    isTextArea: PropTypes.bool.isRequired,
};

export default CommonPasswordModal;
