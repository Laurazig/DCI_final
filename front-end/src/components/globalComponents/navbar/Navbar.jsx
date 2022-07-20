
import "./navbar.scss";
import React from 'react';
import Logo from '../../../assets/logo.jpg';
import { NavLink } from "react-router-dom"
// RFC
export default function Navbar() {
  return (
    <div className="navbar">
         <div className="logoAndTitle">
          <NavLink to="/"><img className="logoImg" src={Logo} alt="BioBites Logo" /></NavLink>
            
        <h1>BioBites</h1>
      </div>
      <ul className="ulNav">
        <li><NavLink to="howitworks">How it works</NavLink></li>
        <li><NavLink to="/meals">Meals</NavLink></li>
        <li><NavLink to="/community">Community</NavLink></li>
        <li><NavLink to="/support">Support</NavLink></li>
        <li><NavLink to="/cart">Cart</NavLink></li>
      </ul>

      <div className='navButtons'>
        <button className='logInButton'><NavLink to="/login">Login</NavLink></button>
        <button className='regButton'><NavLink to="/register">Register</NavLink></butto
      </div>
    </div>
  )
}
