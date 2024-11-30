import React from 'react'
import './Navbar.css'
import logo_light from '../../assets/logo-black.png'
import logo_dark from '../../assets/logo-white.png'
import toogle_light from '../../assets/night.png'
import toogle_dark from '../../assets/day.png'
import { Link } from 'react-router-dom'

const Navbar = ({ theme, setTheme }) => {

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }


  return (
    <div className='navbar'>
      <img src={theme == 'light' ? logo_light : logo_dark} alt="logo" className='logo' />
      <ul>
        <Customlink className='navop' to="/">Home</Customlink>
        <Customlink className='navop' to="/QrGenerator">QrGenerator</Customlink>
        <Customlink className='navop' to="/Feedback">Feedback</Customlink>
        <Customlink className='navop' to="/About">About</Customlink>
      </ul>

      <img onClick={() => { toggle_mode() }} src={theme == 'light' ? toogle_light : toogle_dark} alt="" className='toggleicon' />
    </div>
  )
}

const Customlink = ({ to, children, ...props }) => {
  const path = window.location.pathname
  return (
    <li className={path === to ? "active" : ""}><Link to={to} {...props}>{children}</Link></li>
  )
}

export default Navbar