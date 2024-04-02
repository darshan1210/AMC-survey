import React from 'react'
import PropTypes from 'prop-types'
import { Offcanvas } from 'react-bootstrap'

function Drawer ({ isOpen, children, onClose, title, className }) {
  return (
    <Offcanvas className={className} show={isOpen} onHide={onClose} keyboard={false} backdrop={true} placement='end'>
      <Offcanvas.Header className='d-flex align-items-center justify-content-start'>
        <span  onClick={onClose} className='square icon-btn clos-btn me-3'>
          <i className='icon-close d-block'></i>
        </span>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  )
}
Drawer.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.any,
  className: PropTypes.string
}
export default Drawer
