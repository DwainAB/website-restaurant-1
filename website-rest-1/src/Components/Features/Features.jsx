import React from "react";
import './Features.css'
import symbol1 from '../../assets/symbol1-features.svg'
import symbol2 from '../../assets/symbol2-features.svg'
import symbol3 from '../../assets/symbol3-features.svg'

function Features(){
    return(
        <div className="container-features">
             <h1 className="features-title">Nos caractéristiques</h1>
             <div className="features-cards-global">

                <div className="features-card">
                    <img className="features-card-img" src={symbol1} alt="" />
                    <h2 className="features-card-title">Produits frais</h2>
                    <p className="features-card-p">Nos poissons sont pêchés le <br /> jour même</p>
                </div>

                <div className="features-card">
                    <img className="features-card-img" src={symbol2} alt="" />
                    <h2 className="features-card-title">Service rapide</h2>
                    <p className="features-card-p">Nos équipes répondront à <br /> vos attentes dans les plus <br /> bref délais</p>
                </div>

                <div className="features-card">
                    <img className="features-card-img" src={symbol3} alt="" />
                    <h2 className="features-card-title">Buffet à volonté</h2>
                    <p className="features-card-p">Une multitude de choix rien <br /> que pour vous</p>
                </div>

                

             </div>
        </div>
    )
}

export default Features;