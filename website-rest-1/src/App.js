import React from "react";
import "./App.css";
import "./Global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from './Components/Navbar/Navbar'
import Footer from "./Components/Footer/Footer";
import AdminPage from "./Pages/AdminPage"
import BasketPage from "./Pages/BasketPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-page" element={<AdminPage/>}/>
            <Route path="/basket" element={<BasketPage/>}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
