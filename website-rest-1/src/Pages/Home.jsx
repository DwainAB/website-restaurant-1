import React from "react";
import Cards from "../Components/Cards/Cards";
import Header from "../Components/Header/Header";
import Info from "../Components/Info/Info"
import Features from "../Components/Features/Features"

function Home(){
    return(
        <div className="Home">
            <Header/>
            <Cards/>
            <Features />
            <Info/>
        </div>
    )
}

export default Home