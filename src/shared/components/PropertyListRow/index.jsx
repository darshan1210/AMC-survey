import React from 'react'
import PropTypes from 'prop-types';

const PropertyListRow = ({ user, index, }) => {

    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td>{user.Ward || '-'}</td>
                <td>{user.zone || '-'}</td>
                <td>{user.Blockname || '-'}</td>
                <td>{user.Assignername || '-'}</td>
                <td>{user.Assigndate || '-'}</td>
                <td>
                    <div className='dropdown-datatable-items-icon'>
                        <i className='icon-create d-block' />
                    </div>
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
