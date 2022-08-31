import LandingPage from "./views/landingpage/LandingPage";
import RegisterPage from './views/registerpage/RegisterPage';
import Navigation from "./components/globalComponents/navbar/Navigation";
import LoginPage from "./views/loginpage/LoginPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import HowItWorksPage from "./views/howitworks/HowItWorksPage";
import SupportPage from "./views/sustainability/Sustainability";
import CommunityPage from "./views/community/CommunityPage";
import MealsPage from "./views/mealspage/MealsPage";
import React, { useState, useEffect } from "react";
import CartPage from "./views/cartpage/CartPage";
import Footer from "./components/globalComponents/footer/Footer";
import './App.scss';


export const MyContext = React.createContext();

function App() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const userData = JSON.parse(localStorage.getItem("data")) || null;
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState(cartItems);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(userData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  //======================================================================
  // UseEffect used to handle user and meal data functions 
  //======================================================================
  useEffect( () => {
    //===============================
    // Function to fetch user data
    //==============================
    const fetchUserData = async () => {
      const data = JSON.parse( localStorage.getItem( "data" ) );
    if ( data ) {
      const settings = {
        method: "POST",
        headers: {
          "token": data.token
        }
      }

      const response = await fetch( process.env.REACT_APP_SERVER_URL + "/users/verifytoken", settings);
      const result = await response.json();
      try{
        if(response.ok) {
          const now = new Date();
          const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
          setIsLoggedIn(true);
          setUser({id:result.data._id, info:result.data, expiry: tokenExpiry.toISOString(), token:result.token  })
          setToken( data.token );
          //setIsAdmin(result.isAdmin)
        } else {
          throw new Error(result.message)
        }
      }catch(err){
        alert(err.message)
      }
    }
    }
    fetchUserData();
    
    //================================
    // Function to fetch meals data
    //===============================
    const fetchMealsData = async () => {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/meals");
      const result = await response.json();
      try{
        if(response.ok) {
          setMeals(result)
        } else {
          throw new Error(result.message)
        }
      }catch(err){
        alert(err.message)
      }
    }
   fetchMealsData()
  }, [] );

  //======================================================================
  // UseEffect used to store user data and cart data in the local storage
  //======================================================================
  useEffect( () =>  {
    localStorage.setItem( "data", JSON.stringify( user ) );
    localStorage.setItem( "cart", JSON.stringify( cart ) );
  }, [ user,cart ] );
  
  // =======================================================================
  // Function to Add to the Cart
  //========================================================================
 const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    
    if (item) {
      item.quantity += 1;
      setCart([...cart]);
    } else {if ((cart.length +1) > 3 ){
      alert('Reached Maximum Quantity of Meals')
      return 
    }
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };

  // =======================================================================
  // Function to Remove from the Cart Item/s 
  //========================================================================
  const removeFromCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    
    if (item) {
      item.quantity -= 1;
      setCart([...cart]);
    } 
  };

  // =======================================================================
  // Function to Change Quantity
  //========================================================================
  const changeQuantity = (e, meal) => {
    const foundItem = cart.find((elem) => elem._id === meal._id);
    foundItem.quantity =  Number(e.target.value);
    setCart([...cart]);
  };

 // =======================================================================
 // Function to delete user account
 //========================================================================
  const deleteUserAccount = async () => {
 
      const settings = {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
      };
      const response = await fetch( process.env.REACT_APP_SERVER_URL + `/users/${user.id}`, settings );
      const result = await response.json();
  
      try{
        if(response.ok) {
          setToken(false);
          alert(result.message);
          setIsLoggedIn(false);
          setUser([...user]);
        } else {
          throw new Error(result.message)
        }
      }catch(err){
        alert(err.message)
      }
    };
  
 return (
    <MyContext.Provider value={{ meals, setMeals, cart, setCart, orders, setOrders, user, setUser, token, setToken, isLoggedIn, setIsLoggedIn, addToCart, removeFromCart, changeQuantity, deleteUserAccount, isAdmin, setIsAdmin }}>
      <div className='App'>
        <HashRouter>
          <Navigation isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/howitworks" element={<HowItWorksPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </HashRouter>
      </div>
    </MyContext.Provider>
  );
}
export default App;
