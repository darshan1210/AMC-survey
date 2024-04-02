import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const PropertyListRow = ({ Property, index, }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const previewImage = Property?.property_image?.file_http_url
    return (
        <>
            <tr key={Property.id}  >
                <td>{index + 1}</td>
                <td>{Property?.zone?.zone_name || '-'}</td>
                <td>{Property?.ward?.ward_name || '-'}</td>
                <td>{Property?.poi?.geofence_name || '-'}</td>
                <td>{Property.type || '-'}</td>
                <td>{Property.property_text || '-'}</td>
                <td >
                    <div className='SingleDataTabeIcon' onClick={handleShow}>
                        <i className='icon-visibility d-block' />
                    </div>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose} className="passbook-view-modal">
                <Modal.Header className='modal-heade' closeButton>
                    <Modal.Title>Property Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div><span>Zone</span><span>{Property?.zone?.zone_name || '-'}</span></div>
                    <div><span>Ward</span><span>{Property?.ward?.ward_name || '-'}</span></div>
                    <div><span>POI</span><span>{Property?.poi?.geofence_name || '-'}</span></div>
                    <div><span>Property Type</span><span>{Property.type || '0'}</span></div>
                    <div><span>Property text</span><span>{Property.property_text || '0'}</span></div>
                    <div className='d-flex justify-content-center'><img src={previewImage} height={200} width={250} alt="PropertyImage" /></div>
                </Modal.Body>
            </Modal>
        </>
    )
}

PropertyListRow.propTypes = {
    Property: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default PropertyListRow
