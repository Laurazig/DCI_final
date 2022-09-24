import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import '../navbar/styleDesktop.scss';

export default function ButtonsNav(props) {
  return (
    <div buttonWrapper>   
    <NavLink to="/login">
      <button className={props.isLogged === true ? "hide" : "logInButton"}>
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
  )
}
