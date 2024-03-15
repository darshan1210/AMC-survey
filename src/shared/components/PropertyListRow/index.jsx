import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { route } from 'shared/constants/AllRoutes';

const PropertyListRow = ({ user, index, }) => {
    const navigate = useNavigate()


    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td>{user.PropertytextNo || '-'}</td>
                <td>{user.Ward || '-'}</td>
                <td>{user.Zone || '-'}</td>
                <td>{user.Society || '-'}</td>
                <td>{user.POI || '-'}</td>
                <td>{user.OwnerName || '-'}</td>
                <td>{user.Phoneno || '-'}</td>
                <td>
                    <Button className='ButtonListRow' onClick={() => navigate(route.inProgressBlock)}>
                        Start Survey
                    </Button>
                </td>
            </tr>
        </>
    )
}

PropertyListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default PropertyListRow
