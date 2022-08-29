import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import "../navbar/styleNavigation.scss";

export default function Navigation(props) {
  const { user, setUser, setIsLoggedIn, isLoggedIn, setToken, setCart } =
    useContext(MyContext);

  // 1) First, I Added Two New State Variables to the Navigation Component

  // The mobileNavOpen state is in charge of knowing when to display the *** mobile nav links *** to a user.
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // The showMobileNavMenu to show the **hamburger** bar for the mobile menu or not.
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);

  // 2) Next, I Added a useEffect to Track Initial Viewport Size

  //  useEffect to check on component load if a user should be shown the large nav bar across the top or the more compact hamburger nav menu icon.
  useEffect(() => {
    if (window.innerWidth > 750) {
      setShowMobileNavMenu(false);
    } else if (window.innerWidth < 750) {
      setShowMobileNavMenu(true);
    }
  }, []);

  // 3) Finally, Track All Other Browser Size Changes Inside a Second useEffect

  useEffect(() => {
    const handleRezise = () => {
      if (window.innerWidth > 750) {
        setShowMobileNavMenu(false);
        setMobileNavOpen(false);
      } else if (window.innerWidth < 750) {
        setShowMobileNavMenu(true);
      }
    };

    window.addEventListener("resize", handleRezise);

    return () => {
      window.removeEventListener("resize", handleRezise);
    };
  }, []);

  return (
    <div className="navBar">
      {/* logo */}
      <NavLink to="/">
        <span className="nav-logo">
          <div className="logoImg" />
          <h1>BioBites</h1>
        </span>
      </NavLink>

      {showMobileNavMenu === true ? (
        <MobileNav isLoggedIn={props.isLoggedIn} />
      ) : (
        <DesktopNav isLoggedIn={props.isLoggedIn} />
      )}
    </div>
  );
}
