import React from "react";
import "./Header.css"
import ImgHeader from "../../assets/imgheader.png"

function Header(){
    return(
        <div className="container-header">

            <div className="container-header-info">
                <h1 className="title-header">Wok Grill<br/> <span className="title-color">Rosny-sous-bois</span></h1>
                <p className="text-header">Venez déguster nos plats dans un cadre chaleureux et convivial</p>
                <a className="btn-header" href="/">Contact</a>
            </div>

            <div className="container-header-img">
                <img src={ImgHeader} alt="" />
            </div>

        </div>
    )
}

export default Header