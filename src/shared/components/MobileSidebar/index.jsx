import React from 'react'
import PropTypes from 'prop-types';
import { Offcanvas } from 'react-bootstrap'
import SideBar from '../Sidebar'

function MobileSideBar({ isNavmenu, setNavMenu, setIsOpen }) {
    return (
        <>
            <Offcanvas className='MobileSideBar' show={isNavmenu} onHide={() => { setNavMenu(false) }} keyboard={false} backdrop={true} placement='start'>
                <Offcanvas.Header className='d-flex align-items-center justify-content-space'>
                    <Offcanvas.Title className='SidebarTitle'>{'AMC-Survey'}</Offcanvas.Title>
                    <span variant='link' onClick={() => { setNavMenu(false) }} className='clos-btn'>
                        <i className='icon-close d-block'></i>
                    </span>
                </Offcanvas.Header>
                <Offcanvas.Body className='SidebarBody'>
                    <SideBar isOpen={true} setIsOpen={setIsOpen} setNavMenu={setNavMenu} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

MobileSideBar.propTypes = {
    isNavmenu: PropTypes.bool.isRequired,
    setNavMenu: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired
};

export default MobileSideBar;