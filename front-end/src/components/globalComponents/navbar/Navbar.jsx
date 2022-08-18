import "./navbar.scss";
import React from "react";
import { NavLink } from "react-router-dom";
// RFC

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarItemsWrapper">
        <div className="logoWrapper">
          <NavLink to="/">
            <div className="logoImg" />
          </NavLink>

          <NavLink to="/">
            <h1>BioBites</h1>
          </NavLink>
        </div>

        <ul className="navLinks">
          <NavLink to="howitworks">
            <li> How it works</li>
          </NavLink>
          <NavLink to="/meals">
            {" "}
            <li> Meals </li>
          </NavLink>
          <NavLink to="/community">
            {" "}
            <li>Community</li>
          </NavLink>
          <NavLink to="/support">
            <li>Support</li>
          </NavLink>
          <NavLink to="/cart">
            {" "}
            <li>Cart</li>
          </NavLink>
        </ul>

        <div className="buttonWrapper">
          <NavLink to="/login">
            <button className="logInButton">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="regButton">Register</button>
          </NavLink>
        </div>
      </div>
      <div className="hamburgerMenu">
      <input type="checkbox" id="hamburger-input" class="burger-shower" />
        <div className="bar bar1"/>
        <div className="bar bar2"/>
        <div className="bar bar3"/>
      </div>
    </div>
  );
}
