import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import "../navbar/styleDesktop.scss";

export default function DesktopNav(props) {

  let navigate = useNavigate();
  const { user, setUser, setIsLoggedIn, isLoggedIn, setToken, setCart } =
    useContext(MyContext);

  // STATE VARIABLES -----------------------------------------
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
  return (
    <div className="desktopNav">
      {/* Links */}
      <div className="linkWrapper">
        <NavLink to="howitworks" style={({ isActive }) => ({
          textDecoration: isActive && "underline"})}>How it works</NavLink>

        <NavLink to="/meals" style={({ isActive }) => ({
          textDecoration: isActive && "underline"})}> Meals</NavLink>

        <NavLink to="/sustainability" style={({ isActive }) => ({
          textDecoration: isActive && "underline"})}>Sustainability</NavLink>
        
        <NavLink className={props.isLoggedIn === false ? "hide" : "cartPage"} to="/cart" style={({ isActive }) => ({
          textDecoration: isActive && "underline"})}>
          Cart
        </NavLink>
      </div>

      {/* Login and register button */}
      <span>
        <NavLink to="/login">
          <button
            className={props.isLoggedIn === true ? "hide" : "logInButton"}>
            Login
          </button>
        </NavLink>
        <NavLink to="/register">
          <button className={props.isLoggedIn === true ? "hide" : "regButton"}>
            Register
          </button>
        </NavLink>
      </span>

      {/* display name of user & user Icon */}
      <div className={props.isLoggedIn === true ? "showUserIcon" : "hide"}>
        {/* display name of user */}
        {/* <p>Hello {user && user.firstName} </p> */}
        <button onClick={logOut} className="logoutButton">
          Logout
        </button>

        {/* display user icon & logout button*/}
        {/* <AccountCircleIcon onClick={handleClick} style={{ fontSize: 50 }} /> */}

        {/* display log-out button */}
        {/* ------ this is one way how to render a component based on the state variable */}
        {/* {logOutButton && (
          <button onClick={logOut} className="logoutButton">
            Logout
          </button>
        )} */}
      </div>
    </div>
  );
}
