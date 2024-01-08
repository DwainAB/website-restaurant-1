import React from "react";
import { useState } from "react";
import "./Navbar.css"
import Logo from '../../assets/kisspng-wen-ming-house-ii-chinese-cuisine-restaurant-crawf-fortuna-garden-chinese-restaurant-5b06b93226c0d7.6493265115271672821588.png'
import LogoMarket from "../../assets/panier.svg"
import LogoAccount from "../../assets/compte.svg"
import Login from "../Login/Login"
import {handleLogout} from '../Logout/Logout';

function Navbar(){

    const [loginVisible, setLoginVisible] = useState(false);
    const [basketVisible, setBasketVisible] = useState(false)

    const handleButtonClick = () => {
      setLoginVisible(!loginVisible);
    };

    const activateBasket = () => {
        setBasketVisible(!basketVisible);
    
        if (!basketVisible) {
            // Empêcher le scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Autoriser le scroll
            document.body.style.overflow = 'visible';
        }
    };

    return(
        <div className="container-navbar">
            <img className="logo" src={Logo} alt="" />

            <ul className="list-links">
                <li className="link"><a href="/">Accueil</a></li>
                <li className="link"><a href="#card">Carte</a></li>
                <li className="link">Réservation</li>
            </ul>

            <ul className="list-actions">
                <li onClick={activateBasket} className="action"><img src={LogoMarket} alt="" /></li>
                <li onClick={handleButtonClick} className="action"><img src={LogoAccount} alt="" /></li>
            </ul>
            <div className="logout" style={{ display: loginVisible ? 'block' : 'none' }}>
           
                <div className="logout-btns">
                <a className="adminpage-btn" href="/protectedPage">Page admin</a>
                <button className='logout-btn' onClick={handleLogout}>Déconnexion</button>
                </div>
               
            </div>
            <div className="login">
                 <Login show={loginVisible} />
            </div>

            <div class={basketVisible ? "container-basket" : "container-basket-close"}>
                <span onClick={activateBasket} class="material-symbols-outlined">arrow_forward_ios</span>
                <h1>Votre pannier</h1>
                <h2>A emporter</h2>

                <div className="container-basket-product">
                    <div className="basket-empty">
                        <span class="material-symbols-outlined">production_quantity_limits</span>
                        <p>Votre panier est actuellement vide</p>
                    </div>
                </div>

<hr />
                <div className="container-basket-button">
                    <button>Commander</button>
                    <button>Continuez votre commande</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar