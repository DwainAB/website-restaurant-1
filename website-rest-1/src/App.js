import React from "react";
import "./App.css";
import "./Global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from './Components/Navbar/Navbar'
import Footer from "./Components/Footer/Footer";
import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProtectedPage" element={<ProtectedPage/>}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
