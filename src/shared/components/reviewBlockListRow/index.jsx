import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import moment from 'moment';

const ReviewBlockListRow = ({ user, index, }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const TotalPOI = Number(user?.total_number_of_house) + Number(user?.total_number_of_shops)
    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td>{user.block_name || '-'}</td>
                <td>{user?.ward.ward_name || '-'}</td>
                <td>{user?.zone.zone_name || '-'}</td>
                <td>{TotalPOI || '0'}</td>
                <td>{user?.user?.first_name + user?.user?.last_name || '-'}</td>
                <td className="date-data-field">{moment(user?.created_at).format('DD-MM-YYYY') || '-'}</td>
                <td>
                    <div className='SingleDataTabeIcon' onClick={handleShow}>
                        <i className='icon-visibility d-block' />
                    </div>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose} className="passbook-view-modal">
                <Modal.Header className='modal-heade' closeButton>
                    <Modal.Title>Block Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div><span>Zone</span><span>-</span><span>{user?.zone.zone_name || '-'}</span></div>
                    <div><span>Ward</span><span>-</span><span>{user?.ward.ward_name || '-'}</span></div>
                    <div><span>TotalProperty</span><span>-</span><span>{TotalPOI || '0'}</span></div>
                    <div><span>Createdby</span><span>-</span><span>{user?.user?.first_name + user?.user?.last_name || '-'}</span></div>
                    <div><span>CreatedDate</span><span>-</span><span>{moment(user?.created_at).format('DD-MM-YYYY') || '-'}</span></div>
                </Modal.Body>
            </Modal>
        </>
    )
}

ReviewBlockListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default ReviewBlockListRow

