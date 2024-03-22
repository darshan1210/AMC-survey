import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { route } from 'shared/constants/AllRoutes';

const POIListRow = ({ poi, index, }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr key={poi._id} className={poi.eStatus === 'd' && 'deleted-poi'} >
                <td>{index + 1}</td>
                <td>{index + 1149}</td>
                <td className='blockLink' onClick={() => navigate(route.propertyManagement)}>{poi.society_name || '-'}</td>
                <td>{poi.poi || '-'}</td>
                <td>
                    <div className='SingleDataTabeIcon' onClick={handleShow}>
                        <i className='icon-visibility d-block' />
                    </div>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose} className="passbook-view-modal">
                <Modal.Header className='modal-heade' closeButton>
                    <Modal.Title>POI Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div><span>Society&nbsp; -</span><span>{poi.society_name || '-'}</span></div>
                    <div><span style={{ textWrap: 'nowrap' }}>POI&nbsp; -</span><span style={{ textAlign: 'right' }}>{poi.poi || '-'}</span></div>
                </Modal.Body>
            </Modal>
        </>
    )
}

POIListRow.propTypes = {
    poi: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default POIListRow