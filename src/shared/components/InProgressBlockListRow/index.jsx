

import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { route } from 'shared/constants/AllRoutes';

const InProgressBlockListRow = ({ user, index, }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td className='blockLink' onClick={() => navigate(route.poiManagement(user.id), { state: { block: user.block_name, zone: user?.zone, ward: user?.ward, totalPOI: user?.points_of_interest_count } })}>{user.block_name || '-'}</td>
                <td>{user?.zone.zone_name || '-'}</td>
                <td>{user?.ward.ward_name || '-'}</td>
                <td>{user?.points_of_interest_count || '0'}</td>
                <td>{user?.user?.first_name + user?.user?.last_name || '-'}</td>
                <td className="date-data-field">{moment(user?.created_at).format('DD-MM-YYYY') || '-'}</td>
                <td>
                    <Button className='ButtonListRow' onClick={() => navigate(route.poiManagement(user.id), { state: { block: user.block_name, zone: user?.zone, ward: user?.ward, totalPOI: user?.points_of_interest_count } })}>
                        Continue Survey
                    </Button>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose} className="passbook-view-modal">
                <Modal.Header className='modal-heade' closeButton>
                    <Modal.Title>Block Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div><span>Zone</span><span>-</span><span>{user?.zone.zone_name || '-'}</span></div>
                    <div><span>Ward</span><span>-</span><span>{user?.ward.ward_name || '-'}</span></div>
                    <div><span>Total POI</span><span>-</span><span>{user?.points_of_interest_count || '0'}</span></div>
                    <div><span>Createdby</span><span>-</span><span>{user?.user?.first_name + user?.user?.last_name || '-'}</span></div>
                    <div><span>CreatedDate</span><span>-</span><span>{moment(user?.created_at).format('DD-MM-YYYY') || '-'}</span></div>
                </Modal.Body>
            </Modal>
        </>
    )
}

InProgressBlockListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default InProgressBlockListRow






