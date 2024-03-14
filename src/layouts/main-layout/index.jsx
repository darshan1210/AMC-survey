import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'

import Header from 'shared/components/Header'
import SideBar from 'shared/components/Sidebar'
// import Breadcrumbs from 'shared/components/Breadcrumb'
import { Loader } from 'shared/components/Loader'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import NavMenu from 'shared/components/NavMenu'

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isNavmenu, setNavMenu] = useState(false)
  const width = useMediaQuery('(max-width: 800px)')
  return (
    <div className='main-layout'>
      <Header setNavMenu={setNavMenu} isNavmenu={isNavmenu} />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* {isNavmenu && (<NavMenu isNavmenu={isNavmenu} setNavMenu={setNavMenu} />)} */}
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
