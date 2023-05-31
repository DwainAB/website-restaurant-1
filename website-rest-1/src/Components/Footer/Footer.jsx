import React from "react";
import "./Footer.css"
import BackFooter from "../../assets/footer.png"
import Phone from "../../assets/phone.svg"
import Email from "../../assets/email.svg"
import LocationImg from "../../assets/location.svg"

function Footer(){
    return(
        <div className="container-footer">
            <img className="background-footer" src={BackFooter} alt="" />

            <div className="container-info-footer">
                <ul className="location">
                    <li className="li-title"><img className="info-footer-img" src={LocationImg} alt="" /><h3 className="info-footer-title">Localisation</h3></li>
                    <li><p className="info-footer-text">1 Rue Gustave Eiffel<br/>93110, Rosny-sous-Bois</p></li>
                </ul>
                <ul className="number">
                    <li className="li-title"><img className="info-footer-img" src={Phone} alt="" /><h3 className="info-footer-title">Téléphone</h3></li>
                    <li><p className="info-footer-text">01 45 28 43 08</p></li>
                </ul>
                <ul className="email">
                    <li className="li-title"><img className="info-footer-img" src={Email} alt="" /><h3 className="info-footer-title">Email</h3></li>
                    <li><p className="info-footer-text">rosnywokgrill@gmail.com</p></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer