import React from 'react'
import MainVisual from '../../components/landingPageComponents/mainVisual/MainVisual'
import TrademarkSection from '../../components/landingPageComponents/trademarkSection/TrademarkSection'
import MostPopularDishesSection from '../../components/landingPageComponents/mostPopularDishesSection/MostPopularDishesSection'
import "./landingPage.scss"
import PremiumSection from '../../components/landingPageComponents/premiumSection/PremiumSection'


export default function LandingPage () {
  return (
    <div className='LandingPage'>
        <MainVisual/>
        <TrademarkSection/>
        <MostPopularDishesSection/>
        <PremiumSection/>
    </div>
  )
}



// to revise together: register function / general login
// import React, { useEffect, useState } from "react";
// import RegisterPage from "../views/registerpage/RegisterPage";
// import LoginPage from "../views/loginpage/LoginPage";



// const Home = () =>
// {
//     const [ isLoggedIn, setIsLoggedIn ] = useState( false );
//     const [ currentUserId, setCurrentUserId ] = useState( "" );
//     const [ showLogin, setShowLogin ] = useState( true );
//     const [ token, setToken ] = useState( false );


//     useEffect( () =>
//     {
//         const data = JSON.parse( localStorage.getItem( 'data' ) );
         
//         if ( data && data.token && data.id && data.expiry )
//         {
//             const tokenExpiry = new Date( data.expiry );
//             const now = new Date();


//             if ( tokenExpiry > now )
//             {
//                 login( data.token, data.id );
//             } else
//             {
//                 logout();
//             }

//         } else
//         {
//             logout();
//         }
//     }, [] );

//     const login = ( token, id ) =>
//     {
//         setToken( token );
//         setCurrentUserId( id );
//         setIsLoggedIn( true );
//     };


//     const logout = () =>
//     {
//         localStorage.removeItem( 'data' );
//         setCurrentUserId( "" );
//         setIsLoggedIn( false );
//         setShowLogin( true );
//     };

//     const deregister = async event =>
//     {
//         const settings = {
//             method: "DELETE"
//         };
//         const response = await fetch( process.env.REACT_APP_SERVER_URL + `/users/${ currentUserId }`, settings );
       
//         const parsedRes = await response.json();
//         try
//         {
//             if ( response.ok )
//             {
//                 alert( parsedRes.message );
//                 setIsLoggedIn( false );
//                 setShowLogin( true );
//                 setCurrentUserId( "" );
//             } else
//             {
//                 throw new Error( parsedRes.message );
//             }
//         } catch ( err )
//         {
//             alert( err.message );
//         }
//     };

//     if ( !isLoggedIn )
//     {
      
//         if ( showLogin )
//         {
//             return <Login setShowLogin={ setShowLogin }  login={ login } />;
          
//         } else
//         {
//             return <Register setShowLogin={ setShowLogin }  login={ login } />;
//         }

//     }
// };

// export default Home;