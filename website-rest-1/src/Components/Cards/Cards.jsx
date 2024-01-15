import React, { useState, useEffect } from "react";
import { apiService } from '../../API/apiService';
import './Cards.css';

function Cards() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [foods, setFoods] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [currentPage, setCurrentPage] = useState(1);
    const [width] = useWindowSize();
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const fetchedFoods = await apiService.getFoods();
                setFoods(fetchedFoods);
            } catch (error) {
                console.error("Erreur lors de la récupération des plats :", error);
            }
        };

        fetchFoods();
    }, []);

    const addToLocalStorage = (food) => {
        // Récupérer la liste des plats stockés ou initialiser un tableau vide si ce n'est pas le cas
        let storedFoods = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Trouver l'index de l'élément s'il existe déjà dans le panier
        const existingFoodIndex = storedFoods.findIndex(item => item.id === food.id);
    
        if (existingFoodIndex !== -1) {
            // Si l'élément existe déjà, augmenter la quantité
            storedFoods[existingFoodIndex].quantity += 1;
        } else {
            // Si l'élément n'existe pas, l'ajouter avec une quantité initiale de 1
            storedFoods.push({ ...food, quantity: 1 });
        }
    
        // Sauvegarder le tableau mis à jour dans le localStorage
        localStorage.setItem('cartItems', JSON.stringify(storedFoods));
    
        // Afficher une confirmation ou mettre à jour l'interface utilisateur
        alert(`Ajouté au panier: ${food.title}`);
        window.location.reload()
    };
    

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Réinitialiser la pagination lors du changement de catégorie
    };

    const filteredFoods = foods.filter((food) => {
        return selectedCategory === 'Tous' || food.category === selectedCategory;
    });

    // Obtenir les produits pour la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculer le nombre de pages
    const pageCount = Math.ceil(filteredFoods.length / itemsPerPage);

    function useWindowSize() {
        const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    
        useEffect(() => {
            const handleResize = () => {
                setSize([window.innerWidth, window.innerHeight]);
            };
    
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);
    
        return size;
    }
    
    useEffect(() => {
        setItemsPerPage(width <= 850 ? 5 : 10);
    }, [width]);

    return (
        <div className="container-cards" id="card">
            <h1 className="cards-title">Notre carte</h1>
            <div className="navigation-cards">
            <select
                className="navigation-cards-ul"
                onChange={(e) => handleCategoryClick(e.target.value)}
                value={selectedCategory}
            >
                {['Tous', 'Entrées', 'Plats chauds', 'Sushis', 'Yakitoris', 'Desserts'].map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            </div>
            <div className="global-cards">
                {currentFoods.map((food) => (
                    <div className="card" key={food.id}>
                        <img className="card-img" src={`http://localhost/back-website-restaurant-1/${food.image}`} alt={food.title} />
                        <h2 className="card-title">{food.title}</h2>
                        <div className="card-separator"></div>
                        <div className="card-info">
                            <p className="card-price">{food.price} €</p>
                            <button className="card-button" type="button" onClick={() => addToLocalStorage(food)}>
                                <div className="plus-icon"></div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
            {[...Array(pageCount)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
        </div>
    );
}

export default Cards;
