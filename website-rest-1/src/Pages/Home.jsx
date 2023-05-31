import React from "react";
import Cards from "../Components/Cards/Cards";
import Header from "../Components/Header/Header";
import Info from "../Components/Info/Info"

function Home(){
    return(
        <div>
            <Header/>
            <Cards/>
            <Info/>
        </div>
    )
}

export default Home