import React, { useEffect, useState } from "react";
import { apiService } from "../../API/apiService";
import "./CardOrders.css";

function CardsOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(4);
    const [filter, setFilter] = useState('Tous');

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const newFilteredOrders = orders.filter(order => {
            if (filter === 'Tous') return true;
            return order.client_method === filter;
        });
        setFilteredOrders(newFilteredOrders);
        setCurrentPage(1);
    }, [orders, filter]);

    const fetchOrders = async () => {
        try {
            const ordersData = await apiService.getAllOrdersAndClients();
            const formattedOrders = ordersData.map(order => {
                try {
                    if (typeof order.orders === 'string') {
                        const parsedOrders = JSON.parse(`[${order.orders.replace(/}{/g, '},{')}]`);
                        const total = parsedOrders.reduce((acc, product) => {
                            const price = parseFloat(product.product_price) || 0;
                            const quantity = parseFloat(product.order_quantity) || 0;
                            return acc + (price * quantity);
                        }, 0);
                        return { ...order, orders: parsedOrders, total };
                    } else {
                        // Traiter le cas où order.orders n'est pas une chaîne JSON valide
                        console.warn('Le champ "orders" n\'est pas une chaîne JSON valide:', order.orders);
                        return { ...order, orders: null, total: 0 };
                    }
                } catch (error) {
                    console.error('Erreur lors du traitement JSON pour la commande:', order);
                    console.error('Détail de l\'erreur:', error);
                    console.error('JSON brut:', order.orders);
                    return { ...order, orders: null, total: 0 };
                }
            });
            setOrders(formattedOrders);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
    };

    const handleDelete = async (clientId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client et toutes ses commandes ?")) {
            try {
                await apiService.deleteClient(clientId);
                alert("Client et commandes supprimés avec succès");
                fetchOrders();
            } catch (error) {
                console.error('Erreur lors de la suppression du client:', error);
            }
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <h2 className="title-order">Commande en cours</h2>

            <div className="container-filter-order">
                <select 
                    name="filter-order" 
                    id="filter-order" 
                    onChange={handleFilterChange}
                >
                    <option value="Tous">Tous</option>
                    <option value="A emporter">A emporter</option>
                    <option value="Livraison">Livraison</option>
                </select>
            </div>

            <div className="container-card-order">
                {currentOrders.length > 0 ? currentOrders.map(order => (
                    <div key={order.client_id} className="card-order">
                        <div className="container-title-card-order">
                            <h2>Commande #{order.client_id}</h2>
                            <p>{order.client_method}</p>
                        </div>

                        <div className="section-card-order">
                            <div className="order">
                                {order.orders ? order.orders.map((product, index) => (
                                    <div key={index} className="product-order">
                                        <p><span className="bold">{product.order_quantity}x</span> - {product.product_title || 'Produit inconnu'}</p>
                                    </div>
                                )) : <p>Informations sur les commandes indisponibles</p>}
                            </div>

                            <div className="order-info-client">
                                <p><span className="bold">Client:</span> {order.client_firstname} {order.client_lastname}</p>
                                <p><span className="bold">Mail:</span> {order.client_email}</p>
                                <p><span className="bold">Tel:</span> {order.client_phone}</p>
                                <p><span className="bold">Adresse:</span> {order.client_address}</p>
                                <p className="total-order">Total: {order.total ? order.total.toFixed(2) : '0.00'} €</p>
                                <button className="delete-order" onClick={() => handleDelete(order.client_id)} >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-empty-order">Aucune commande trouvée.</p>}
            </div>

            <nav>
                <ul className='pagination'>
                    {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => i + 1).map(number => (
                        <li key={number} className='page-item'>
                            <button onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default CardsOrders;
