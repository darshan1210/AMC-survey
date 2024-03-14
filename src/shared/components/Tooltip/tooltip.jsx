import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import PropTypes from 'prop-types';
import Tooltip from 'react-bootstrap/Tooltip'

function TriggerTooltip({ data, onClick, display, className }) {
    const renderTooltip = (props) => (<Tooltip id='button-tooltip' {...props}>{display}</Tooltip>)

    return (
        <OverlayTrigger placement='top' delay={{ show: 10, hide: 10 }} overlay={renderTooltip} className='textWrapper' >
            <span className={className} onClick={onClick}>
                {data.length > 10 ? `${data?.slice(0, 10)}...` : data}
            </span>
        </OverlayTrigger>
    )
}


TriggerTooltip.propTypes = {
    data: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

export default TriggerTooltip;