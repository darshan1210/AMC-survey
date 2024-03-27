import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const POIListRow = ({ poi, index, }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr key={poi._id} className={poi.eStatus === 'd' && 'deleted-poi'} >
                <td>{index + 1}</td>
                <td>{'Zone'}</td>
                <td>{'ward'}</td>
                <td>{poi.geofence_name || '-'}</td>
                <td>{poi.total_number_of_house || '0'}</td>
                <td>{poi.total_number_of_shops || '0'}</td>
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
                    <div><span>Zone&nbsp; -</span><span>{'zone' || '-'}</span></div>
                    <div><span>Ward&nbsp; -</span><span>{'Ward' || '-'}</span></div>
                    <div><span>Society&nbsp; -</span><span>{poi.geofence_name || '-'}</span></div>
                    <div><span>Total House&nbsp; -</span><span>{poi.total_number_of_house || '0'}</span></div>
                    <div><span>Total Shops&nbsp; -</span><span>{poi.total_number_of_shops || '0'}</span></div>
                    {/* <div><span style={{ textWrap: 'nowrap' }}>POI&nbsp; -</span><span style={{ textAlign: 'right' }}>{poi.poi || '-'}</span></div> */}
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