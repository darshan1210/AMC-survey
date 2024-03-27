import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

const CompletedBlockListRow = ({ user, index, }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td className='blockLink'>{user.Blockname || '-'}</td>
                <td>{user.Ward || '-'}</td>
                <td>{user.zone || '-'}</td>
                <td>{user.TotalProperty || '-'}</td>
                <td>{user.Createdby || '-'}</td>
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
                    <div><span>Ward</span><span>-</span><span>{user.Ward || '-'}</span></div>
                    <div><span>TotalProperty</span><span>-</span><span>{user.TotalProperty || '-'}</span></div>
                    <div><span>Createdby</span><span>-</span><span>{user.Createdby || '-'}</span></div>
                    <div><span>CreatedDate</span><span>-</span><span>{user.CreatedDate || '-'}</span></div>
                </Modal.Body>
            </Modal>
        </>
    )
}

CompletedBlockListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default CompletedBlockListRow
