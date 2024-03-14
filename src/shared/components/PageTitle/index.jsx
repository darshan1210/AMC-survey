import React from 'react'
import PropTypes from 'prop-types'

function PageTitle({ title }) {
    return (
        <div className='PageTitle'>{title}</div>
    )
}

PageTitle.propTypes = {
    title: PropTypes.string
}

export default PageTitle