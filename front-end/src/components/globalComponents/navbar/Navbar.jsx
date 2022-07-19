import "./navbar.scss"
import React from 'react'
import Logo from '../../../assets/logo.jpg'
import { Link } from "react-router-dom";

// RFC

export default function Navbar() {
  return (
    <div className="navbar">
         <div className="logoAndTitle">
            <img className="logoImg" src={Logo} alt="BioBites Logo" />
        <h1>BioBites</h1>
      </div>
      <ul className="ulNav">
        <li>How it works</li>
        <li>Meals</li>
        <li>Community</li>
        <li>Support</li>
      </ul>

      <div className='navButtons'>
        <button className='logInButton'>Login</button>
        {/* <Link to="/register"> */}
        <button className='regButton'>Register</button>
        {/* </Link> */}
      </div>

    </div>
  )
}
