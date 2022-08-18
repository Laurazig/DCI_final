import React, { useState, useContext } from "react";
import "./navTestStyle.scss";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavTest = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutIsShown, setLogoutIsShown] = useState(false);
  const handleClick = (event) => {
    setLogoutIsShown((current) => !current);
  };

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
            <button
              className={props.isLogged === true ? "hide" : "logInButton"}
            >
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className={props.isLogged === true ? "hide" : "regButton"}>
              {" "}
              Register
            </button>
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

      {/* user icon + logout button */}
      <div className={props.isLogged === true ? "showUserIcon" : "hide"}>
        <p className="userName">Hello *name of user* </p>
        <AccountCircleIcon onClick={handleClick} style={{ fontSize: 50 }} />
        {logoutIsShown && (
          <div className="logoutButtonWrapper">
            <button  className="logoutButton">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTest;