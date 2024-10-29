import { useLocation, useNavigate } from 'react-router-dom'

import { PiBarbell, PiCompass, PiHeart } from 'react-icons/pi'

function FooterContainer () {
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  // return !pathMatchRoute('/') && !pathMatchRoute('/register') && !pathMatchRoute('/login') && !pathMatchRoute('/forgot-password') && !pathMatchRoute('/reset-password') && !pathMatchRoute('/about') && !pathMatchRoute('/page-not-found') &&
  return (
    <footer id="footer-container">
      <nav id="footer-nav">
        <ul className="footer-nav-list">
          <li className={`footer-nav-item ${pathMatchRoute('/fitness') ? 'active' : ''}`} onClick={() => navigate('/fitness')}>
            <PiBarbell className='footer-nav-icon' />
            <span className="footer-nav-text">explore</span>
          </li>
          <li className={`footer-nav-item ${pathMatchRoute('/explore') ? 'active' : ''} active`} onClick={() => navigate('/explore')}>
            <PiCompass className='footer-nav-icon' />
            <span className="footer-nav-text">explore</span>
          </li>
          <li className={`footer-nav-item ${pathMatchRoute('/health') ? 'active' : ''}`} onClick={() => navigate('/health')}>
            <PiHeart className='footer-nav-icon' />
            <span className="footer-nav-text">explore</span>
          </li>
        </ul>
      </nav>
    </footer>)
}

export default FooterContainer