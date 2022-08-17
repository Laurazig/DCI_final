import React, { useState, useContext} from "react";
import "./navTestStyle.scss";
import { NavLink } from "react-router-dom";

const NavTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Navbar">

      {/* logo */}
      <span className="nav-logo">
        <div className="logoImg" />
        <NavLink to="/">
          <h1>BioBites</h1>
        </NavLink>
      </span>
      {/* links and buttons containers */}
      <div className={`nav-items ${isOpen && "open"}`}>
        {/* links */}
        <div className="linkWrapper">
          <NavLink to="howitworks">How it works</NavLink>
          <NavLink to="/meals"> Meals</NavLink>
          <NavLink to="/support">Support</NavLink>
          <NavLink to="/cart"> Cart</NavLink>
        </div>
        
        {/* buttons */}
        <div className="buttonWrapper">
          <NavLink to="/login">
            <button className="logInButton">Login</button>
          </NavLink>
          <NavLink className="button" to="/register">
            <button className="regButton">Register</button>
          </NavLink>
        </div>
      </div>

      {/* toggle area */}
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default NavTest;
