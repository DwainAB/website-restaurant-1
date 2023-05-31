import React from "react";
import './Features.css'
import symbol1 from '../../assets/symbol1-features.svg'

function Features(){
    return(
        <div className="container-features">
             <h1 className="features-title">Nos caractéristiques</h1>
             <div className="features-cards-global">

                <div className="features-card">
                    <img className="features-card-img" src={symbol1} alt="" />
                    <h2 className="features-card-title">Produit frais</h2>
                    <p className="features-card-p">Nos poissons sont pêchés le <br /> jours même</p>
                </div>

                <div className="features-card">
                    <img className="features-card-img" src={symbol1} alt="" />
                    <h2 className="features-card-title">Produit frais</h2>
                    <p className="features-card-p">Nos poissons sont pêchés le <br /> jours même</p>
                </div>

                <div className="features-card">
                    <img className="features-card-img" src={symbol1} alt="" />
                    <h2 className="features-card-title">Produit frais</h2>
                    <p className="features-card-p">Nos poissons sont pêchés le <br /> jours même</p>
                </div>

                

             </div>
        </div>
    )
}

export default Features;