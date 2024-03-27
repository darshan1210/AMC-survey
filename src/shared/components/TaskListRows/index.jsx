import React from 'react'
// import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { route } from 'shared/constants/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import moment from 'moment';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const TaskListRow = ({ user, index, }) => {
    const navigate = useNavigate();
    return (
        <>
            <tr key={user.id} className={user.eStatus === 'd' && 'deleted-user'} >
                <td>{index + 1}</td>
                <td className='blockLink' onClick={() => navigate(route.poiManagement(user.id))}>{user.block_name || '-'}</td>
                <td>{user?.ward.ward_name || '-'}</td>
                <td>{user?.zone.zone_name || '-'}</td>
                <td>{user?.total_number_of_house + user?.total_number_of_shops || '-'}</td>
                <td>{user.created_by || '-'}</td>
                <td className="date-data-field">{moment(user?.created_at).format('DD-MM-YYYY') || '-'}</td>
                <td>
                    <Button className='ButtonListRow' onClick={() => navigate(route.poiManagement(user.id))}>
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
