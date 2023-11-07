import React from "react";
import AddFoodForm from "../Components/FormAddFood/FormAddFood";
import Cards from "../Components/Cards/Cards"

function AdminPage(){
    return(
        <div>
            <AddFoodForm/>
            <Cards/>
        </div>
        )
}

export default AdminPage