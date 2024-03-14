import React, { useState } from 'react'
// import { Button } from 'react-bootstrap'
import { sidebarConfig } from './SidebarConfig'
import MenuItem from './MenuItem'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import PropTypes from 'prop-types';

function SideBar({ isOpen }) {
  const width = useMediaQuery('(max-width: 800px)')
  const [activeSubMenu, setActiveSubMenu] = useState(null)

  const toggleSubMenu = (submenu) => {
    if (activeSubMenu === submenu) {
      setActiveSubMenu(null)
    } else {
      setActiveSubMenu(submenu)
    }
  }
  return (
    <div className={`side-bar ${width ? 'Hide' : isOpen && 'expanded'}`}>
      {/* <div className={`side-bar ${width ? !isOpen && 'expanded' : isOpen && 'expanded'}`}> */}
      <div className='menu'>
        <ul className='p-0 m-0'>
          {sidebarConfig.map((item, index) => {
            return <MenuItem key={index} item={item} isMenuOpen={width ? !isOpen : isOpen} activeSubMenu={activeSubMenu} toggleSubMenu={toggleSubMenu} />
          })}
        </ul>
      </div>
    </div>
  )
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default SideBar;
