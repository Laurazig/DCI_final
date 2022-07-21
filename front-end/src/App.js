import LandingPage from "./views/landingpage/LandingPage";
import RegisterPage from './views/registerpage/RegisterPage';
import Navbar from "./components/globalComponents/navbar/Navbar";
import LoginPage from "./views/loginpage/LoginPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import HowItWorksPage from "./views/howitworks/HowItWorksPage";
import SupportPage from "./views/support/SupportPage";
import CommunityPage from "./views/community/CommunityPage";
import MealsPage from "./views/mealspage/MealsPage";
import React, { useState, useEffect } from "react";
import CartPage from "./views/cartpage/CartPage";
import Footer from "./components/globalComponents/footer/Footer";

export const MyContext = React.createContext();
// console.log(MyContext);


function App() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  
  const login = () => {
    setIsLoggedIn(true);
}

  return (
    <MyContext.Provider value={{ meals, setMeals, cart, setCart, orders, setOrders, user, setUser }}>
      <div className='App'>
        <HashRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/howitworks" element={<HowItWorksPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* // code copied from last class - If no user is currently logged in
            if (!isLoggedIn) {
                // Display the login view
                if (showLogin) {
                    return <Login setShowLogin={setShowLogin} login={login} />
                    // Display the register view
                } else {
                    return <Register setsetShowLogin={setShowLogin} login={login} />
                }
                // Else, if a user is logged in, display the "albums" page for that user
            } else {
                return <Albums token={token} currentUserId={currentUserId} logout={logout} deregister={deregister}   />
            } */}


          </Routes>
          <Footer />

        </HashRouter>
      </div>
    </MyContext.Provider>
  );
}

export default App;
