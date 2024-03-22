import React from 'react'
// import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const TaskListRow = ({ user, index, }) => {
    const navigate = useNavigate()

    return (
        <>
            <tr key={user._id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td className='blockLink' onClick={() => navigate(route.poiManagement)}>{user.Blockname || '-'}</td>
                <td>{user.Ward || '-'}</td>
                <td>{user.zone || '-'}</td>
                <td>{user.TotalProperty || '-'}</td>
                <td>{user.Createdby || '-'}</td>
                <td>{user.CreatedDate || '-'}</td>
                <td>
                    <Button className='ButtonListRow' onClick={() => navigate(route.poiManagement)}>
                        Start Survey
                    </Button>
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
