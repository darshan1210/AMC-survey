import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { CheckPOIstatus, VerifyPOI } from 'query/POI/poi.query';
import AddPoi from 'views/POImanagement/add';
import { toaster } from 'helper/helper';

const POIListRow = ({ poi, index, blockId, radioValue }) => {
    const navigate = useNavigate();
    const [POIStatus, setPOIstatus] = useState(false)
    const [show, setShow] = useState(false);
    console.log('POIStatus', POIStatus)

    const StateData = {
        blockId: blockId,
        zone: poi?.zone,
        ward: poi?.ward,
        socity: poi?.geofence_name,
        TotalProprty: poi?.total_number_of_house,
        TotalShops: poi?.total_number_of_shops
    }
    const { mutate, } = useMutation(CheckPOIstatus, {
        onSuccess: (data) => {
            setPOIstatus(data?.data?.status);
            if (data?.data?.status) {
                navigate(route.propertyManagement(poi?.id), { state: { StateData } })
            } else {
                setShow(true)
            }
        }
    })

    // Function to check POI status
    const checkPOIStatus = (ID) => {
        mutate(ID)
    };

    const { mutate: VerifyPOImutate, isLoading: VerifyLoad } = useMutation(VerifyPOI, {
        onSuccess: () => {
            toaster('POI Verified successfully', 'success');
            navigate(route.propertyManagement(poi?.id), { state: { StateData } })
        }
    })


    return (
        <>
            <tr key={poi._id} className={poi.eStatus === 'd' && 'deleted-poi'} >
                <td>{index + 1}</td>
                <td>{poi?.zone?.zone_name || '-'}</td>
                <td>{poi?.ward?.ward_name || '-'}</td>
                <td className='blockLink' disabled={VerifyLoad} onClick={() => navigate(route.propertyManagement(poi?.id), { state: { StateData } })}>{poi.geofence_name || '-'}</td>
                <td>{poi.total_number_of_house || '0'}</td>
                <td>{poi.total_number_of_shops || '0'}</td>
                <td>
                    {/* <Button className='ButtonListRow' onClick={() => navigate(route.propertyManagement(poi?.id), { state: { StateData } })}> */}
                    <Button className='ButtonListRow' disabled={VerifyLoad} onClick={() => checkPOIStatus(poi?.id)}>
                        {radioValue === '1' ? 'Start Survey ' : 'Update Survey'}
                    </Button>
                </td>
            </tr>

            <AddPoi isModal={show} setModal={setShow} poiID={poi?.id} VerifyPOImutate={VerifyPOImutate} />
        </>
    )
}

POIListRow.propTypes = {
    poi: PropTypes.any,
    radioValue: PropTypes.any,
    checkStatus: PropTypes.any,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    blockId: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,

};


export default POIListRow