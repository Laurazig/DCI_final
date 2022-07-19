import LandingPage from "./views/landingpage/LandingPage";
import RegisterPage from './views/registerpage/RegisterPage';
import LoginPage from './views/registerpage/RegisterPage';
import Navbar from "./components/globalComponents/navbar/Navbar";
import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <BrowserRouter>
      
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />

      </Routes>

      </BrowserRouter>

     </div>
  );
}

export default App;
