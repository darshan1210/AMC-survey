import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const POIListRow = ({ poi, index, }) => {
    // const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr key={poi._id} className={poi.eStatus === 'd' && 'deleted-poi'} >
                <td>{index + 1}</td>
                <td>{poi.society_name || '-'}</td>
                <td>{poi.poi || '-'}</td>
                <td>
                    <div className='dropdown-datatable-items-icon' onClick={handleShow}>
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
                    {/* <div><span>TotalProperty</span><span>-</span><span>{poi.TotalProperty || '-'}</span></div>
                    <div><span>Createdby</span><span>-</span><span>{poi.Createdby || '-'}</span></div>
                    <div><span>CreatedDate</span><span>-</span><span>{poi.CreatedDate || '-'}</span></div> */}
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