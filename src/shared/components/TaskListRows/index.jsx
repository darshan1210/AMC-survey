import React from 'react'
// import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const TaskListRow = ({ user, index, }) => {
    const navigate = useNavigate()

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
                    <div className='dropdown-datatable-items-icon' onClick={() => navigate(route.propertyManagement)}>
                        <i className='icon-create d-block' />
                    </div>
                </td>
            </tr>
        </>
    )
}

TaskListRow.propTypes = {
    user: PropTypes.any,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default TaskListRow
