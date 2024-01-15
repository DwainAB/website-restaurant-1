import React, { useEffect, useState } from "react";
import { apiService } from "../../API/apiService";
import "./CardOrders.css"

function CardsOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const ordersData = await apiService.getAllOrdersAndClients();
            const formattedOrders = ordersData.map(order => {
                try {
                    const parsedOrders = JSON.parse(`[${order.orders.replace(/}{/g, '},{')}]`);
                    const total = parsedOrders.reduce((acc, product) => {
                        const price = parseFloat(product.product_price) || 0;
                        const quantity = parseFloat(product.order_quantity) || 0;
                        return acc + (price * quantity);
                    }, 0);
                    return { ...order, orders: parsedOrders, total };
                } catch (error) {
                    console.error('Erreur lors du traitement JSON pour la commande:', order, error);
                    return { ...order, orders: null, total: 0 };
                }
            });
            setOrders(formattedOrders);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
    }

    const handleDelete = async (clientId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client et toutes ses commandes ?")) {
            try {
                await apiService.deleteClient(clientId);
                alert("Client et commandes supprimés avec succès");
                fetchOrders(); // Recharger les commandes après la suppression
                window.location.reload()
            } catch (error) {
                console.error('Erreur lors de la suppression du client:', error);
                window.location.reload()
            }
        }
    }

    return (
        <>
            <h2 className="title-order">Commande en cours</h2>
            <div className="container-card-order">
                {orders.length > 0 ? orders.map(order => (
                    <div key={order.client_id} className="card-order">
                        <h2>Commande #{order.client_id}</h2>

                        <div className="section-card-order">
                            <div className="order">
                                {order.orders ? order.orders.map((product, index) => (
                                    <div key={index} className="product-order">
                                        <p>{product.order_quantity}x - {product.product_title || 'Produit inconnu'} - Prix: {product.product_price || 'Prix inconnu'}</p>
                                    </div>
                                )) : <p>Informations sur les commandes indisponibles</p>}
                            </div>

                            <div className="order-info-client">
                                <p>Client: {order.client_firstname} {order.client_lastname}</p>
                                <p>Mail: {order.client_email}</p>
                                <p>Tel: {order.client_phone}</p>
                                <p>Adresse: {order.client_address}</p>
                                <p className="total-order">Total: {order.total ? order.total.toFixed(2) : '0.00'} €</p>
                                <button className="delete-order" onClick={() => handleDelete(order.client_id)} >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-empty-order">Aucune commande trouvée.</p>}
            </div>
        </>
    );
}

export default CardsOrders;
