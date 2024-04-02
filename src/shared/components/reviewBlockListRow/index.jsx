import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import moment from 'moment';

const ReviewBlockListRow = ({ user, index, }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td>{user.block_name || '-'}</td>
                <td>{user?.zone.zone_name || '-'}</td>
                <td>{user?.ward.ward_name || '-'}</td>
                <td>{user?.points_of_interest_count || '0'}</td>
                <td>{user?.allocated_date || '--'}</td>
                <td className="date-data-field">{moment(user?.updated_at).format('DD-MM-YYYY') || '-'}</td>
                <td>
                    <div className='SingleDataTabeIcon' onClick={handleShow}>
                        <i className='icon-visibility d-block' />
                    </div>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose} className="passbook-view-modal">
                <Modal.Header className='modal-heade' closeButton>
                    <Modal.Title>Review Block Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div><span>Block</span><span>{user?.block_name || '-'}</span></div>
                    <div><span>Zone</span><span>{user?.zone.zone_name || '-'}</span></div>
                    <div><span>Ward</span><span>{user?.ward.ward_name || '-'}</span></div>
                    <div><span>Total POI</span><span>{user?.points_of_interest_count || '0'}</span></div>
                    <div><span>Total Property</span><span>{user?.total_number_of_house || '0'}</span></div>
                    <div><span>Total shop</span><span>{user?.total_number_of_shops || '0'}</span></div>
                    <div><span>Allocated Date</span><span>{user?.allocated_date || '0'}</span></div>
                    <div><span>Survey Date</span><span>{user?.review_date || '0'}</span></div>
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

