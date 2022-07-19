import './stylingCss/Login.css';
import Home from './views/Home.js';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './views/navbar/Navbar.jsx';
import Meals from './views/Meals';
import Register from './views/Register';
import Orders from './views/Orders';
import Cart from './views/Cart';
 export const MyContext = React.createContext();
console.log( MyContext ); 

const App = () =>
{

  return (
    <div>
<div>Hallo</div>

      <Router>
        <header>
             <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={ <Home /> } />
          {/*  <Route path="/navbar" element={ <Navbar /> } />
            <Route path="/meals" element={ <Meals /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/orders" element={ <Orders /> } />
            <Route path="/cart" element={ <Cart /> } /> */}
          </Routes>
        </main>
        <footer>
        </footer>
      </Router>

    </div>

  );

};

export default App;
