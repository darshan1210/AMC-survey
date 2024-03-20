import React from 'react'
import { sidebarConfig } from '../Sidebar/SidebarConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

function NavMenu() {

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
        <div className={`navMenu active`} >
            <div className='subMenu'>
                {sidebarConfig?.map((item, i) => {
                    return (
                        <NavLink key={i} className={`Navitems`} activeClassName="active" to={item?.path} >
                            <i> <FontAwesomeIcon icon={item.icon} /> </i>
                            {/* <span>{item?.title}</span> */}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}


export default NavMenu