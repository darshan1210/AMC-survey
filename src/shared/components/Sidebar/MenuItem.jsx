import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useMediaQuery from 'shared/hooks/useMediaQuery';

function MenuItem({ item, isMenuOpen, activeSubMenu, toggleSubMenu, setNavMenu }) {
  const width = useMediaQuery('(max-width: 800px)')
  const [isOpen, setIsOpen] = useState(false);
  const childPaths = item.children && item.children.map((i) => i.path.split('/')[1]);
  const location = useLocation();
  const currentPathSlashIndex = location.pathname.split('/').length;

  useEffect(() => {
    !isMenuOpen && setIsOpen(false);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsOpen(activeSubMenu === item.path);
  }, [activeSubMenu, item.path]);

  const toggle = () => {
    setIsOpen(!isOpen);
    toggleSubMenu(isOpen ? null : item.path);
  };

  return (
    <li className={isOpen ? 'open' : ''}>
      {item.children ? (
        <>
          <span onClick={toggle} className={isOpen === true ? "toggle-btn-open" : ""}>
            <span
              // eslint-disable-next-line
              activeclassName={`active ${!item.children && 'pe-none'} `}
              className={
                childPaths?.includes(location.pathname.split('/')[1])
                  ? 'active pe-none list-name'
                  : 'list-name'
              }
            >
              <span className='icon'><FontAwesomeIcon icon={item.icon} /></span>
              <div className='side-bar-text'> {item.title} </div>
              {item.children && (
                <i className='icon-chevron-down drop-icon'></i>
              )}
            </span>
          </span>
          <ul className={`left-arrow sidebar-dropdown dropdown-menu show big`}>
            {item.children.map((subItem) => (
              <li key={subItem.path} onClick={() => (width && setNavMenu(false))}>
                <NavLink
                  to={subItem.path}
                  activeclassName={`active ${(currentPathSlashIndex === 3 || currentPathSlashIndex === 2) && 'pe-none'}`}
                >
                  <span className='icon'><FontAwesomeIcon icon={subItem.icon} /></span>
                  {subItem.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <span className={isOpen === true ? "toggle-btn-open" : ""} onClick={() => (width && setNavMenu(false))}>
            <NavLink
              to={item.path}
              activeclassName={`active ${!item.children && 'pe-none'} `}
              onClick={() => toggle()} // Only call toggle here for parent items
            >
              <span className='icon'><FontAwesomeIcon icon={item.icon} /></span>
              <div className='side-bar-text'> {item.title} </div>
              {item.children && (
                <i className='icon-arrow-drop-down drop-icon'></i>
              )}
            </NavLink>
          </span>
        </>
      )
      }
    </li >
  );
}

MenuItem.propTypes = {
  item: PropTypes.object,
  isMenuOpen: PropTypes.bool,
  activeSubMenu: PropTypes.any,
  toggleSubMenu: PropTypes.any,
  setNavMenu: PropTypes.any,
};

export default MenuItem;