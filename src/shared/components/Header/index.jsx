import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { logout } from 'query/auth/auth.query'
import { route } from 'shared/constants/AllRoutes'
import { toaster } from 'helper/helper'
import CustomModal from 'shared/components/Modal'
// import logo from 'assets/images/Main/amc-ahmedabad-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import Menu from 'assets/images/icons/menu'
import { Cancel, DownSign } from 'assets/images/SVGs/Svg'
import LogoSvg from 'assets/images/SVGs/Logo'


function Header({ isNavmenu, setNavMenu }) {
  const navigate = useNavigate()
  const query = useQueryClient()
  const [clickedLogOut, setClickedLogOut] = useState(false)
  const [show, setShow] = useState(false)
  const [profileName, setProfileName] = useState('')
  const handleClose = () => setShow(false)
  const width = useMediaQuery('(max-width: 800px)')

  // const temp = localStorage.getItem('mode') === 'true'

  // const [mode, setMode] = useState(temp)

  const { isLoading, isFetching } = useQuery('logoutUser', () => logout(), {
    enabled: clickedLogOut,
    onSuccess: (res) => {
      localStorage.removeItem('token')
      navigate('/login')
      toaster(res?.data?.message)
    },
    onError: () => {
      localStorage.removeItem('token')
      navigate('/login')
    }
  })

  useEffect(() => {
    setProfileName('Darshan')
  }, [])

  // useQuery('profile', () => profile(), {
  //   select: (data) => data?.data?.data,
  //   onSuccess: (res) => {
  //     setProfileName(res.sUserName)
  //   },
  //   onError: () => {
  //     setProfileName('')
  //   }
  // })

  const handleLogout = () => setShow(!show)

  const handleConfirmLogout = () => {
    setClickedLogOut(true)
    query.invalidateQueries('logoutUser')
  }

  function handleEditProfile() {
    navigate(route.editProfile)
  }


  // useEffect(() => {
  //   localStorage.setItem('mode', mode)

  //   document.body.classList.remove(!mode ? 'light' : 'dark')
  //   document.body.classList.add(mode ? 'light' : 'dark');
  // }, [mode])

  return (
    <header className='header'>
      <div className='header-left'>
        <Link className='logo' to={route.dashboard}>
          {/* <img src={logo} height={width ? 50 : 70} width={width ? 50 : 70} alt="AMC-logo" /> */}
          <LogoSvg height={width ? 50 : 70} width={width ? 50 : 70} />
          {!width && (<span className=''>
            Ahmedabad Survey
          </span>)}
        </Link>
        {width && (
          <div className='menu-bar' onClick={() => setNavMenu(!isNavmenu)}>
            {isNavmenu ? <Cancel className='ms-1' height='20' width='20' fill='#000' /> : <Menu height='30' width='30' />}
          </div>
        )}

      </div>
      <div className='header-right'>
        <div className='user-name'>{profileName}</div>
        <Dropdown>
          <Dropdown.Toggle className='header-btn'>
            <div className='img d-flex align-items-center justify-content-center'>
              <FontAwesomeIcon icon={faUser} />
              <DownSign height='13' width='13' style={{ margin: '4px 0 5px -3px' }} />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className='up-arrow'>
            <Dropdown.Item onClick={handleEditProfile}>
              <i className='icon-account'></i>
              <FormattedMessage id='myProfile' />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLogout()}>
              <i className='icon-logout'></i>
              <FormattedMessage id='logout' />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <CustomModal
        open={show}
        handleClose={handleClose}
        handleConfirm={handleConfirmLogout}
        disableHeader
        bodyTitle='Are you sure you want to logout ?'
        isLoading={isLoading || isFetching}
      />
    </header>
  )
}



Header.propTypes = {
  setNavMenu: PropTypes.func,
  isNavmenu: PropTypes.bool
}
export default Header
