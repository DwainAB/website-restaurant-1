import React, { useState } from "react";
import './Cards.css'
import plat1 from '../../assets/plat1.png'

function Cards(){

    const [isExpanded, setIsExpanded] = useState(false);

    // Fonction pour basculer l'état d'expansion
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className="container-cards" id="card">
            
            <h1 className="cards-title">Notre carte</h1>

            <div className="navigation-cards">
                <ul className="navigation-cards-ul">
                    <li className="navigation-cards-li">Tempura</li>
                    <li className="navigation-cards-li">Sushi & sashimi</li>
                    <li className="navigation-cards-li">Ramen</li>
                    <li className="navigation-cards-li">Donburi</li>
                    <li className="navigation-cards-li">Yakitori</li>
                    <li className="navigation-cards-li" >Izakaya</li>
                </ul>
            </div>

            <div className="global-cards" style={{ height: isExpanded ? 'auto' : '800px' }}>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={plat1} alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7 €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                </div>

            </div>

            <button className="card-global-button" onClick={toggleExpansion}>
                {isExpanded ? 'Voir moins' : 'Voir plus'}
            </button>

        </div>
    )
}       

export default Cards;

