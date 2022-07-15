import './stylingCss/Login.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './views/Home.js';


const App = () =>
{

  return (
    <div>
     

        <Router>
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
