import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from '../../assets/logo.png';
import Login from "../Login/Login";
import { handleLogout } from '../Logout/Logout';
import { apiService } from "../../API/apiService";

function Navbar() {
    const [navbarVisible, setNavbarVisible] = useState(false)
    const [loginVisible, setLoginVisible] = useState(false);
    const [basketVisible, setBasketVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); // Ajouter un état pour le prix total
    const [cartItems, setCartItems] = useState([]);
    const [clientData, setClientData] = useState({ // Ajoutez un état pour les données du formulaire client
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        // Récupérer les articles du panier lors du montage du composant
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        // Calculer le prix total lorsque le panier est mis à jour
        const newTotalPrice = cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    
        setTotalPrice(newTotalPrice);
    }, [cartItems]);

    const updateQuantity = (id, delta) => {
        let updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + delta };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleButtonClick = () => {
        setLoginVisible(!loginVisible);
    };

    const showForm = () => {
        setFormVisible(!formVisible);
    };

    const activateBasket = () => {
        setBasketVisible(!basketVisible);
        document.body.style.overflow = basketVisible ? 'visible' : 'hidden';
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const orderData = {
                ...clientData,
                cartItems: storedCartItems
            };

            await apiService.addClientAndOrder(orderData);

            setClientData({
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                address: ""
            });

            setFormVisible(false);

            alert("Votre commande à bien été envoyé !");

            // Supprimer le contenu du localStorage
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire client : ", error);
        }
    };

    const activateNavbar = () =>{
        setNavbarVisible(!navbarVisible)
    }

    const activateNavAndBasket = () =>{
        activateNavbar()
        activateBasket()
    }

    useEffect(() => {
        if (!basketVisible) {
            const timer = setTimeout(() => {
                const element = document.querySelector('.container-basket-close');
                if (element) {
                    element.style.display = 'none';
                }
            }, 800); // 0.3 secondes
    
            return () => clearTimeout(timer); // Nettoyez le timer si le composant est démonté ou si l'état change
        } else {
            const element = document.querySelector('.container-basket');
            if (element) {
                element.style.display = 'block'; // Ou le style d'affichage initial
            }
        }
    }, [basketVisible]);
    

    
    return (
        <div className="container-navbar">
            <nav>
                <div className="container-nav-mobil">
                    <img className="logo" src={Logo} alt="Logo" />

                    <span onClick={activateNavbar} class="material-symbols-outlined btn-menu">menu</span>
                </div>


                <div className={navbarVisible ? "navbar navbar-open" : "navbar navbar-close"}>
                    <div></div>
                    <ul className="list-links">
                        <li onClick={activateNavbar} className="link"><a href="/">Accueil</a></li>
                        <li onClick={activateNavbar} className="link"><a href="#card">Carte</a></li>
                        <li onClick={activateNavbar} className="link"><a href="#hours">Horaires</a></li>
                    </ul>

                    <ul className="list-actions">
                        <li  onClick={activateNavAndBasket} className="action"><span class="material-symbols-outlined">shopping_basket</span></li>
                        <li onClick={handleButtonClick} className="action"><span class="material-symbols-outlined">person</span></li>
                    </ul>

                    <div onClick={activateNavbar} className="container-btn-close-menu"><span class="material-symbols-outlined btn-close-menu">arrow_upward</span></div>
                </div>


                <div className="logout" style={{ display: loginVisible ? 'block' : 'none' }}>
                    <div className="logout-btns">
                        <a className="adminpage-btn" href="/admin-page">Page admin</a>
                        <button className='logout-btn' onClick={handleLogout}>Déconnexion</button>
                    </div>
                </div>
            </nav>



            <div className={basketVisible ? "container-basket" : "container-basket-close"}>
                <span onClick={activateBasket} className="material-symbols-outlined">arrow_forward_ios</span>
                <h1>Votre panier</h1>
                <h2>A emporter</h2>

                {formVisible ? (
                    <div className="container-basket-form">
                        <p>Veuillez rentrez vos informations <br/>afin de passer commande</p>
                        <form onSubmit={handleSubmitForm}>
                        <div className="container-form-fullname">
                            <input type="text" name="firstname" placeholder="Prénom" value={clientData.firstname} onChange={handleFormChange} />
                            <input type="text" name="lastname" placeholder="Nom" value={clientData.lastname} onChange={handleFormChange} />
                        </div>
                        <input type="email" placeholder="email" name="email" value={clientData.email} onChange={handleFormChange} />
                        <input type="tel" placeholder="tel" name="phone" value={clientData.phone} onChange={handleFormChange} />
                        <input type="text" placeholder="adresse" name="address" value={clientData.address} onChange={handleFormChange} />
                        <input type="submit" />
                    </form>
                    </div>
                ) : (
                    <div className="container-basket-product">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="basket-item">
                                    <p>{item.quantity}x - {item.title}</p>
                                    <div className="container-btn-item">
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="basket-empty">
                                <span className="material-symbols-outlined">production_quantity_limits</span>
                                <p>Votre panier est actuellement vide</p>
                            </div>
                        )}
                        {cartItems.length > 0 ? (<p className="total-price">Prix total : {totalPrice.toFixed(2)} €</p> ) : ('')}                   
                        </div>
                )}

                <hr />
                <div className="container-basket-button">
                    <button onClick={showForm}>{formVisible ? "Retour" : "Commander"}</button>
                    <button onClick={activateBasket}>Retour</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
