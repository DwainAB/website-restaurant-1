import React, { useState, useEffect } from "react";
import { apiService } from '../../API/apiService';
import './Cards.css';

function Cards() {
    const [foods, setFoods] = useState([]);
    const [editableFoods, setEditableFoods] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [categories, setCategories] = useState([]); // État pour les catégories
    const [currentPage, setCurrentPage] = useState(1);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 790);
    const [itemsPerPage, setItemsPerPage] = useState(isSmallScreen ? 6 : 10);
    const [isLoading, setIsLoading] = useState(true); // État pour le suivi du chargement


    useEffect(() => {
        const fetchFoodsAndCategories = async () => {
            setIsLoading(true)
            try {
                const fetchedFoods = await apiService.getFoods();
                const fetchedCategories = await apiService.getAllCategories();
                setFoods(fetchedFoods);
                setCategories(fetchedCategories);
                setIsLoading(false) 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                setIsLoading(false)
            }
        };

        fetchFoodsAndCategories();
        
        const handleResize = () => {
            const smallScreen = window.innerWidth <= 790;
            setIsSmallScreen(smallScreen);
            setItemsPerPage(smallScreen ? 6  : 10);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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

    

    return (
        <div className="container-cards" id="card">
            <h1 className="cards-title">Notre carte</h1>
            <div className="navigation-cards">
                <select value={selectedCategory} onChange={(e) => handleCategoryClick(e.target.value)}>
                    <option value="Tous">Tous</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="global-cards">
                {isLoading ? (
                    <>
                    <div className="card"></div>
                    </>
                ) : currentFoods.map((food) => (
                    <div className="card" key={food.id}>
                        <img className="card-img" src={`https://back-wok-rosny.onrender.com/${food.image}`} alt={food.title} />
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
