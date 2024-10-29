import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import AlertContext from '../../context/alert/AlertContext'
import ModalContext from '../../context/modal/ModalContext'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearCredentials } from '../../slices/authSlice'

import { PiDoor, PiGear, PiMagnifyingGlass, PiPlusBold, PiUser } from 'react-icons/pi'

function HeaderContainer () {
  const { setAlertActive } = useContext(AlertContext)
  const { setModalActive } = useContext(ModalContext)
  const { userInfo } = useSelector((state) => state.auth)
  const disatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      disatch(clearCredentials())
      navigate('/')
    } catch (error) {
      setAlertActive(`Log out failed - ${error}`, 'error')
    }
  }
  return !pathMatchRoute('/') && !pathMatchRoute('/register') && !pathMatchRoute('/login') && !pathMatchRoute('/forgot-password') && !pathMatchRoute('/reset-password') && !pathMatchRoute('/about') && !pathMatchRoute('/page-not-found') &&
    <header id="header-container">
      <nav id="header-nav">
        <span id="brand"><em>OK</em>life</span>
        <ul className="header-nav-list">
          {
            userInfo && pathMatchRoute('/fitness') &&
              <li className="header-nav-item" onClick={() => setModalActive('log-workout')}>
                <PiPlusBold className='header-nav-icon' />
              </li>
          }
          {
            userInfo && pathMatchRoute('/health') &&
              <li className="header-nav-item" onClick={() => setModalActive('log-meal')}>
                <PiPlusBold className='header-nav-icon' />
              </li>
          }
          {
            userInfo && pathMatchRoute('/explore') &&
              <li className="header-nav-item" onClick={() => setModalActive('search')}>
                <PiMagnifyingGlass className='header-nav-icon' />
              </li>
          }
          {
            userInfo && pathMatchRoute('/settings') ?
              <li className='header-nav-item' onClick={logoutHandler}>
                <PiDoor className='header-nav-icon' />
              </li>
            : <li className="header-nav-item" onClick={() => navigate('/settings')}>
                <PiGear className='header-nav-icon' />
              </li>
          }
          {
            userInfo && pathMatchRoute('/profile') ?
              <li className='header-nav-item' onClick={logoutHandler}>
                <PiDoor className='header-nav-icon' />
              </li>
            : userInfo && !pathMatchRoute('/profile') ? 
              <li className="header-nav-item" onClick={() => navigate('/profile')}>
                <img src="src/assets/profile.jpg" alt="" className='header-nav-image' />
              </li>
            : <li className="header-nav-item" onClick={() => navigate('/login')}>
                <PiUser className='header-nav-icon' />
              </li>
          }
        </ul>
      </nav>
    </header>
}

export default HeaderContainer