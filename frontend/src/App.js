import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './views/Home.js';
import Navbar from './views/navbar/Navbar.jsx';


const App = () =>
{

  return (
    <div>
     

        <Router>
          <Navbar></Navbar>
          <header>
            <h1>Bio Bites</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={ <Home /> } />

            </Routes>
          </main>
          <footer>


          </footer>



        </Router>
    
    </div>

  );

};

export default App;
