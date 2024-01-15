import React from "react";
import AddFoodForm from "../Components/FormAddFood/FormAddFood";
import Cards from "../Components/CardsAdmin/CardsAdmin";
import CardsOrders from "../Components/CardOrders/CardOrders"

function AdminPage(){
    return(
        <div>
            <AddFoodForm/>
            <Cards/>
            <CardsOrders/>
        </div>
        )
}

export default AdminPage