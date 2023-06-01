import React from "react";
import "./App.css";
import "./Global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import AdminPage from "./Pages/AdminPage"
import Navbar from './Components/Navbar/Navbar'
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adminpage" element={<AdminPage/>}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
