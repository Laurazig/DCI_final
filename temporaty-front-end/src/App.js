import './App.css';
import Navbar from "./components/globalComponents/navbar/Navbar"
import LandingPage from './views/landingPage/LandingPage';
function App() {
  return (
    <div className='App'>

      <Router>
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/meals" element={<Meals />}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </main>


        <footer>
        </footer>
      </Router>

    </div>
  );
}

export default App;
