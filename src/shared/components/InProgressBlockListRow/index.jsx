import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'react-bootstrap';

const InProgressBlockListRow = ({ user, index, }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td className='blockLink' onClick={() => navigate(route.poiManagement)}>{user.Blockname || '-'}</td>
                <td>{1267 + index || '-'}</td>
                <td>{1158 + index || '-'}</td>
                <td>{1058 + index || '-'}</td>
                <td>{10 * (index + 1) || '-'} {'%'}</td>
                <td>{user.CreatedDate || '-'}</td>
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
                    <div><span>Ward</span><span>-</span><span>{user.Ward || '-'}</span></div>
                    <div><span>zone</span><span>-</span><span>{user.zone || '-'}</span></div>
                    <div><span>TotalProperty</span><span>-</span><span>{user.TotalProperty || '-'}</span></div>
                    <div><span>Createdby</span><span>-</span><span>{user.Createdby || '-'}</span></div>
                    <div><span>CreatedDate</span><span>-</span><span>{user.CreatedDate || '-'}</span></div>
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
