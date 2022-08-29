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

function App ()
{
  const cartItems = JSON.parse( localStorage.getItem( "cart" ) ) || [];
  const userData = JSON.parse( localStorage.getItem( "data" ) ) || null;
  const [ meals, setMeals ] = useState( [] );
  const [ cart, setCart ] = useState( cartItems );
  const [ orders, setOrders ] = useState( [] );
  const [ user, setUser ] = useState( userData );
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );
  const [ token, setToken ] = useState( false );
  const [ userId, setUserId ] = useState( "" );

  useEffect( () =>
  {
    const data = JSON.parse( localStorage.getItem( "data" ) );
    // console.log(data);
    if ( data )
    {
      console.log(data.token)
      /* fetch(process.env.REACT_APP_SERVER_URL + `/user/${data.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
       setUser(data)
      }) */
      fetch( process.env.REACT_APP_SERVER_URL + "/users/verifytoken", {
        method: "POST",
        headers: {
          "token": data.token
        }
      } ).then( ( res ) =>
      {
        return res.json();
      } ).then( ( result ) =>
      {
        console.log( result );
        if ( result.success )
        {   const now = new Date();
          const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
          setIsLoggedIn(true);
          setUser({token: data.token, id:data.id, firstName: data.firstName, expiry: tokenExpiry.toISOString(), orders: data.orders})
          setToken( data.token );
          setUserId( data.id );
        } else
        {
         console.log( result.message );
        }
      });
    }
    fetch( process.env.REACT_APP_SERVER_URL + "/meals" )
    .then( res => res.json() )
    .then( data =>
    {
      setMeals( data );
    } );
  }, [] );

  useEffect( () =>
  {
    localStorage.setItem( "data", JSON.stringify( user ) );localStorage.setItem( "cart", JSON.stringify( cart ) );
  }, [ user,cart ] );


  const logOut = () =>
      {
          localStorage.removeItem( 'data' );
          setToken( false );
          setUserId( "" );
          setIsLoggedIn( false );
      };
  
      const deregister = async event =>
      {
          const settings = {
              method: "DELETE",
              headers: {
                  "Authorization": "Bearer " + token
              }
          };
          const response = await fetch( process.env.REACT_APP_SERVER_URL + `/users/${ userId }`, settings );
          //await fetch( `http://localhost:3001/users/ettings );
        const parsedRes = await response.json();
          try
          {
              // If the request was successful...
              if ( response.ok )
              {
                  alert( parsedRes.message );
                  setIsLoggedIn( false );
                  setUserId( "" );
              } else
              {
                  throw new Error( parsedRes.message );
              }
          } catch ( err )
          {
              alert( err.message );
          }
      };
  


  return (
    <MyContext.Provider value={ { meals, setMeals, cart, setCart, orders, setOrders, user, setUser, userId, token, setToken, isLoggedIn, setIsLoggedIn, /* {logOut}, {deregister}  */ } }>
      <div className='App'>
        <HashRouter>
        <Navigation isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={ <LandingPage /> } />
            <Route path="/howitworks" element={ <HowItWorksPage /> } />
            <Route path="/support" element={ <SupportPage /> } />
            <Route path="/meals" element={ <MealsPage /> } />
            <Route path="/community" element={ <CommunityPage /> } />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/register" element={ <RegisterPage /> } />
            <Route path="/cart" element={ <CartPage /> } />
          </Routes>
          <Footer />
        </HashRouter>
      </div>
    </MyContext.Provider>
  );
}
export default App;
