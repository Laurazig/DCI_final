import React, { useState, useContext } from "react";
import "./navTestStyle.scss";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";


const NavTest = (props) => {
  let navigate = useNavigate();
  const{user,setUser,setIsLoggedIn,setToken,setCart,isLoggedIn}=useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [ logOutButton, setLogOutButton ]=useState(false)

const logOut=()=>{
  localStorage.clear()
  setUser(null)
  setIsLoggedIn(false)
  setToken(null)
  setCart([])
  navigate("/")
}

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
          <NavLink to="/support">Sustainability</NavLink>
          <NavLink to="/cart"> Cart</NavLink>
        </div>

        {/* buttons */}
        <div className="buttonWrapper">
          <NavLink to="/login">
            <button
              className={isLoggedIn === true ? "hide" : "logInButton"}
            >
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className={isLoggedIn === true ? "hide" : "regButton" }>
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

      <div className={props.isLogged === true ?  "showUserIcon" : "hide" }>
            <p>Hello {user && user.firstName} </p>
           
            <div >
            <AccountCircleIcon onClick={()=>{setLogOutButton(!logOutButton)}} style={{ fontSize: 50, cursor:"pointer" }} />
              <p onClick={logOut} style={{position:"absolute", right:"50px", width:"120px", padding:"5px", color:"white", backgroundColor:"gray",textAlign:"center", display:logOutButton ?"block" : "none", cursor:"pointer"}}>Log-Out</p>
            </div>
      </div>
    </div>
  );
};

export default NavTest;