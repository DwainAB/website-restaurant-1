import React, { useState } from "react";
import AddFoodForm from "../Components/FormAddFood/FormAddFood";
import Cards from "../Components/CardsAdmin/CardsAdmin";
import CardsOrders from "../Components/CardOrders/CardOrders";

function AdminPage() {
    const [selectedComponent, setSelectedComponent] = useState("addFood");

    const handleSelectChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case "addFood":
                return <AddFoodForm />;
            case "cards":
                return <Cards />;
            case "cardsOrders":
                return <CardsOrders />;
            default:
                return null;
        }
    };

    return (
        <div>
            <select style={{marginTop: "80px",paddingLeft: "20px", border:"2px solid #FF9A00", height: "40px", width:"200px", color: "#FF9A00", borderRadius: "20px"}} onChange={handleSelectChange} value={selectedComponent}>
                <option value="addFood">Ajouter un produit</option>
                <option value="cards">Cartes</option>
                <option value="cardsOrders">Commandes</option>
            </select>
            {renderComponent()}
        </div>
    );
}

export default AdminPage;
