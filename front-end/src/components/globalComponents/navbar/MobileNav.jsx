import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import "../navbar/styleMobile.scss";

export default function MobileNav(props) {
  let navigate = useNavigate();
  const { user, setUser, setIsLoggedIn, isLoggedIn, setToken, setCart } =
    useContext(MyContext);

  // STATE VARIABLES -----------------------------------------

  const [hideSidemenu, setHideSideMenu] = useState(true);
  const [logOutButton, setLogOutButton] = useState(false);

  // SHOW / HIDE *LOGOUT BUTTON* -----> function to set the opposite state to show or hide the logout button.
  // will be given to the user icon as per:
  // <AccountCircleIcon onClick={handleClick}> -------------------------------------------------------------
  const handleClick = (event) => {
    setLogOutButton((current) => !current);
  };

  // FUNCTION TO LOGOUT -----> will be given to the logout button --->  button onClick={logOut}

  const logOut = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    setCart([]);
    navigate("/");
  };

  // SHOW HIDE BURGER MENU -----> function to set the opposite state to show or hide the burger menu

  const handleClickBurger = (event) => {
    setHideSideMenu((current) => !current);
  };

  return (
    <div className="mobileNav">
      {/* Burger Icon */}
      <MenuIcon
        onClick={handleClickBurger}
        className={hideSidemenu === false ? "hide" : "menuIcon"}
        style={{ fontSize: 35 }}
      />
{/* -------------------------------- */}
      {/* user Icon */}
      {/* display name of user & user Icon */}
      <div className={props.isLoggedIn === true ? "showUserIcon" : "hide"}>
        <span className={hideSidemenu === true ? "hide" : "userIconWrapper"}>
          {/* display user icon & logout button*/}
          <AccountCircleIcon onClick={handleClick} 
          className = {hideSidemenu === true ? "hide" : "userIcon"}
          style={{ fontSize: 50 }} />

          {/* display name of user */}
          <p
          className = {hideSidemenu === true ? "hide" : "userNameText"}>
            Hello {user && user.firstName} 
          </p>
          </span>
          {/* display log-out button */}
          {logOutButton && (
            <button onClick={logOut} 
            className = {hideSidemenu === true ? "hide" : "logoutButton"}
            >
              Logout
            </button>
          )}
        </div>

      {/* Green area with content */}
      <div className={hideSidemenu === true ? "hide" : "sectionWrapper"}>
        <CloseIcon
          onClick={handleClickBurger}
          className={hideSidemenu === false ? "closeIcon" : "hide"}
        />
        {/* Login and register button */}
        <span>
          <NavLink to="/login">
            <button
              className={props.isLoggedIn === true ? "hide" : "logInButton"}
              // onClick={handleClickBurger} is there to close the menu everytime the links are clicked

              onClick={handleClickBurger}
            >
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button
              className={props.isLoggedIn === true ? "hide" : "regButton"}
              onClick={handleClickBurger}
            >
              Register
            </button>
          </NavLink>
        </span>

        {/* ------------- links ------------- */}
        <div className="linkWrapper">
        <NavLink to="howitworks" onClick={handleClickBurger}>
          How it works
        </NavLink>

        <NavLink to="/meals" onClick={handleClickBurger}>
          {" "}
          Meals
        </NavLink>
        <NavLink to="/support" onClick={handleClickBurger}>
          Support
        </NavLink>

        <NavLink
          className={props.isLoggedIn === true ? "hide" : "cartPage"}
          to="/cart"
          onClick={handleClickBurger}
        >
          Cart
        </NavLink>
        </div>
      </div>
      {/* This is the background filter */}
      <div className={hideSidemenu === true ? "hide" : "filter"} />
    </div>
  );
}
