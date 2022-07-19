import './App.css';
import Navbar from "./components/globalComponents/navbar/Navbar"
import LandingPage from './views/landingPage/LandingPage';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
      
      {/* This will be inside of routes */}
      <LandingPage />
      <div>test test</div>

    </div>
  );
}

export default App;
