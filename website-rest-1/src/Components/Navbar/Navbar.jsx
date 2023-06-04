import React from "react";
import { useState } from "react";
import "./Navbar.css"
import Logo from '../../assets/kisspng-wen-ming-house-ii-chinese-cuisine-restaurant-crawf-fortuna-garden-chinese-restaurant-5b06b93226c0d7.6493265115271672821588.png'
import LogoMarket from "../../assets/panier.svg"
import LogoAccount from "../../assets/compte.svg"
import Login from "../Login/Login"
import { auth } from '../Firebase/FirebaseConfig';
import {handleLogout} from '../Logout/Logout';

function Navbar(){

    const [loginVisible, setLoginVisible] = useState(false);

    const handleButtonClick = () => {
      setLoginVisible(!loginVisible);
    };

    const user = auth.currentUser;

    return(
        <div className="container-navbar">
            <img className="logo" src={Logo} alt="" />

            <ul className="list-links">
                <li className="link"><a href="/">Accueil</a></li>
                <li className="link"><a href="#card">Carte</a></li>
                <li className="link">Réservation</li>
            </ul>

            <ul className="list-actions">
                <li className="action"><img src={LogoMarket} alt="" /></li>
                <li onClick={handleButtonClick} className="action"><img src={LogoAccount} alt="" /></li>
            </ul>
            <div className="logout" style={{ display: loginVisible ? 'block' : 'none' }}>
                {user ? 
                <div className="logout-btns">
                <a className="adminpage-btn" href="/protectedPage">Page admin</a>
                <button className='logout-btn' onClick={handleLogout}>Déconnexion</button>
                </div>
                : null}
            </div>
            <div className="login">
                 <Login show={loginVisible} />
            </div>
        </div>
    )
}

export default Navbar