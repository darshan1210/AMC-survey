import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';

const POIListRow = ({ poi, index, blockId, radioValue }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const StateData = {
        blockId: blockId,
        zone: poi?.zone,
        ward: poi?.ward,
        socity: poi?.geofence_name,
        TotalProprty: poi?.total_number_of_house,
        TotalShops: poi?.total_number_of_shops
    }

    return (
        <>
            <tr key={poi._id} className={poi.eStatus === 'd' && 'deleted-poi'} >
                <td>{index + 1}</td>
                <td>{poi?.zone?.zone_name || '-'}</td>
                <td>{poi?.ward?.ward_name || '-'}</td>
                <td className='blockLink' onClick={() => navigate(route.propertyManagement(poi?.id), { state: { StateData } })}>{poi.geofence_name || '-'}</td>
                <td>{poi.total_number_of_house || '0'}</td>
                <td>{poi.total_number_of_shops || '0'}</td>
                <td>
                    <Button className='ButtonListRow' onClick={() => navigate(route.propertyManagement(poi?.id), { state: { StateData } })}>
                        {radioValue === '1' ? 'Start Survey ' : 'Update Survey'}
                    </Button>
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
    radioValue: PropTypes.any,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    blockId: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,

};


export default POIListRow