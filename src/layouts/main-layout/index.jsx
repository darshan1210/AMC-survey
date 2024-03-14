import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'

import Header from 'shared/components/Header'
import SideBar from 'shared/components/Sidebar'
// import Breadcrumbs from 'shared/components/Breadcrumb'
import { Loader } from 'shared/components/Loader'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import NavMenu from 'shared/components/NavMenu'
import { Button, Offcanvas } from 'react-bootstrap'

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isNavmenu, setNavMenu] = useState(false)
  const width = useMediaQuery('(max-width: 800px)')
  return (
    <div className='main-layout'>
      <Offcanvas className='MobileSideBar' show={isNavmenu} onHide={() => { setNavMenu(false) }} keyboard={false} backdrop={true} placement='start'>
        <Offcanvas.Header className='d-flex align-items-center justify-content-space'>
          <Offcanvas.Title className='SidebarTitle'>{'AMC-Survey'}</Offcanvas.Title>
          <Button variant='link' onClick={() => { setNavMenu(false) }} className='square icon-btn'>
            <i className='icon-close d-block'></i>
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className='SidebarBody'>
          <SideBar isOpen={true} setIsOpen={setIsOpen} setNavMenu={setNavMenu} />
        </Offcanvas.Body>
      </Offcanvas>

      <Header setNavMenu={setNavMenu} isNavmenu={isNavmenu} />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />


      <div className={`main-container ${width ? !isOpen && 'active' : isOpen && 'active'}`}>
        <div className='container-fluid '>
          {/* <Breadcrumbs /> */}
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
      </div>

      <NavMenu isNavmenu={true} setNavMenu={setNavMenu} />
    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default MainLayout
