import React from "react";

function Cards(){
    return(
        <div className="container-cards">
            <h1>Notre carte</h1>

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

            <div className="global-cards">

                <div className="card">
                    <img className="card-img" src="" alt="" />
                    <h2 className="card-title" >Briyani aux épices</h2>
                    <div className="card-separator" ></div>
                    <div className="card-info">
                        <p className="card-price">7€</p>
                        <button className="card-button" type="submit"></button>
                    </div>
                </div>

            </div>

        </div>
    )
}       

export default Cards;

