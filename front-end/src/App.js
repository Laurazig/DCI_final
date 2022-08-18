import LandingPage from "./views/landingpage/LandingPage";
import RegisterPage from './views/registerpage/RegisterPage';
import LoginPage from "./views/loginpage/LoginPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import HowItWorksPage from "./views/howitworks/HowItWorksPage";
import SupportPage from "./views/support/SupportPage";
import CommunityPage from "./views/community/CommunityPage";
import MealsPage from "./views/mealspage/MealsPage";
import React, { useState, useEffect } from "react";
import CartPage from "./views/cartpage/CartPage";
import Footer from "./components/globalComponents/footer/Footer";
import NavbarTest from "./components/globalComponents/navTest/NavbarTest";

// console.log(`myContext= ${MyContext}`);
export const MyContext = React.createContext();

function App() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("fetching meals");
    fetch(process.env.REACT_APP_SERVER_URL + "/meals")
      .then(res => res.json())
      .then(data => {
        setMeals(data)
      })
  }, [])

  return (
    <MyContext.Provider value={{ meals, setMeals, cart, setCart, orders, setOrders, user, setUser, isLoggedIn, setIsLoggedIn }}>
      <div className='App'>
        <HashRouter>
          <NavbarTest isLogged ={isLoggedIn} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/howitworks" element={<HowItWorksPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            {/* <Route path="/login" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}/> */}
            <Route path="/register" element={isLoggedIn ? (<Navigate replace to="/meals" />) : (<RegisterPage setIsLoggedIn={setIsLoggedIn} />)} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </HashRouter>
      </div>
    </MyContext.Provider>
  );
}
export default App;
