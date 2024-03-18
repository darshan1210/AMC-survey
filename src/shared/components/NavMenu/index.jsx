import React from 'react'
import PropTypes from 'prop-types'
import { sidebarConfig } from '../Sidebar/SidebarConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

function NavMenu({ isNavmenu, setNavMenu }) {
    function closeNav(e) {
        e.stopPropagation();
        setNavMenu(false);
    }

    function handleSubMenuClick(e) {
        e.stopPropagation();
    }

    // const scrollPositionRef = useRef(null);

    // useEffect(() => {
    //     scrollPositionRef.current = window.pageYOffset;
    //     document.body.style.overflow = 'hidden';

    //     return () => {
    //         document.body.style.overflow = '';
    //         window.scrollTo(0, scrollPositionRef.current);
    //     };
    // }, []);

    return (
        <div className={`navMenu ${isNavmenu ? 'active' : ''}`} onClick={(e) => { handleSubMenuClick(e); closeNav(e); }}>
            <div className='subMenu'>
                {sidebarConfig?.map((item, i) => {
                    return (
                        <NavLink key={i} className={`Navitems`} activeClassName="active" onClick={(e) => closeNav(e)} to={item?.path} >
                            <i> <FontAwesomeIcon icon={item.icon} /> </i>
                            {/* <span>{item?.title}</span> */}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

NavMenu.propTypes = {
    setNavMenu: PropTypes.func,
    isNavmenu: PropTypes.bool
}

export default NavMenu