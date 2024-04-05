import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import Header from 'shared/components/Header'
import SideBar from 'shared/components/Sidebar'
import { Loader } from 'shared/components/Loader'
import useMediaQuery from 'shared/hooks/useMediaQuery'
// import MobileSideBar from 'shared/components/MobileSidebar'

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isNavmenu, setNavMenu] = useState(false)
  const width = useMediaQuery('(max-width: 991px)')

  return (
    <div className='main-layout'>
      {/* <MobileSide Bar isNavmenu={isNavmenu} setNavMenu={setNavMenu} setIsOpen={setIsOpen} /> */}
      <Header setNavMenu={setNavMenu} isNavmenu={isNavmenu} />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} isNavmenu={isNavmenu} setNavMenu={setNavMenu} />


      <div className={`main-container ${width ? !isOpen && 'active' : isOpen && 'active'}`}>
        <div className='container-fluid '>
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </div>
      </div>

    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default MainLayout
