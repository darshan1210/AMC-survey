import React from 'react'
import PropTypes from 'prop-types';

const PropertyListRow = ({ Property, index, }) => {

    return (
        <>
            <tr key={Property.id}  >
                <td>{index + 1}</td>
                <td>{Property?.ward?.ward_name || '-'}</td>
                <td>{Property?.zone?.zone_name || '-'}</td>
                <td>{Property?.poi?.geofence_name || '-'}</td>
                <td>{Property.property_text || '-'}</td>
                <td >
                    <div className='SingleDataTabeIcon'>
                        <i className='icon-create d-block' />
                    </div>
                </td>
            </tr>
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
