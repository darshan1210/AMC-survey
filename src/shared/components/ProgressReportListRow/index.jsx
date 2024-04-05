import React, { useState } from 'react'
import PropTypes from 'prop-types';
// import { route } from 'shared/constants/AllRoutes';
// import { useNavigate } from 'react-router-dom';

import { Modal } from 'react-bootstrap';

const ProgressReportListRow = ({ user, index, requestParams }) => {
    // const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    function hendeltime() {
        if (requestParams?.type === 'all') {
            return user?.date
        } else if (requestParams?.type === 'week') {
            return `Week ${user?.week || '1'}`
        } else if (requestParams?.type === 'month') {
            return `${user?.month || '-'}`
        }
    }
    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td>{hendeltime() || '-'}</td>
                <td>{user.allocated_block || '0'}</td>
                <td>{user.inprogress_block || '0'}</td>
                <td>{user.review_block || '0'}</td>
                <td>{user.complated_block || '0'}</td>
                <td>{user.total_progress + '%' || '0 %'}</td>
                {/* <td>
                    <div className='dropdown-datatable-items-icon' onClick={handleShow}>
                        <i className='icon-visibility d-block' />
                    </div>
                </td> */}
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

ProgressReportListRow.propTypes = {
    user: PropTypes.any,
    requestParams: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default ProgressReportListRow
