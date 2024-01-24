import React, { useState, useEffect } from "react";
import { apiService } from '../../API/apiService';
import './CardsAdmin.css';
import SectionCategories from "../SectionCategories/SectionCategories";

function Cards() {
    const [foods, setFoods] = useState([]);
    const [editableFoods, setEditableFoods] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 790);
    const [itemsPerPage, setItemsPerPage] = useState(isSmallScreen ? 6 : 10);
    const [categories, setCategories] = useState([]); // État pour stocker les catégories

    useEffect(() => {
        // Charger les catégories lors du montage du composant
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await apiService.getAllCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const fetchedFoods = await apiService.getFoods();
                setFoods(fetchedFoods);
                console.log(fetchedFoods);
            } catch (error) {
                console.error("Erreur lors de la récupération des plats :", error);
            }
        };

        fetchFoods();
        
        const handleResize = () => {
            const smallScreen = window.innerWidth <= 890;
            setIsSmallScreen(smallScreen);
            // Mise à jour du nombre d'articles par page en fonction de la taille de l'écran
            setItemsPerPage(smallScreen ? 6  : 10);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const handleInputChange = (foodId, event) => {
        const { name, type, value, files } = event.target;
        const newValue = type === "file" ? files[0] : value;
      
        setEditableFoods((prev) => ({
            ...prev,
            [foodId]: {
                ...prev[foodId],
                [name]: newValue === '' ? "" : newValue,
            },
        }));
    };
     
    
    
    const handleUpdateAllFoods = async (event) => {
        event.preventDefault();
        
        let isUpdated = false;
    
        for (const foodId in editableFoods) {
            const formData = new FormData();
            const foodData = editableFoods[foodId];
    
            for (const key in foodData) {
                formData.append(key, foodData[key]);
            }
    
            try {
                const response = await apiService.updateFood(foodId, formData);
                if (response.success) {
                    console.log('Mise à jour réussie', response.message);
                    isUpdated = true;
                } else {
                    console.error('Erreur lors de la mise à jour', response.message);
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi à l\'API', error);
            }
        }
    
        if (isUpdated) {
            alert("Modifications ajoutées avec succès");
            const updatedFoods = await apiService.getFoods();
            setFoods(updatedFoods);
        }
    
        setEditableFoods({});
    };
    
    

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const filteredFoods = foods.filter(food => selectedCategory === 'Tous' || food.category === selectedCategory);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageCount = Math.ceil(filteredFoods.length / itemsPerPage);

    const handleDeleteFood = async (foodId) => {
        try {
            const response = await apiService.deleteFood(foodId);
            console.log('te');
            if (response.status === 204) {
                console.log('Suppression réussie');
                const updatedFoods = await apiService.getFoods(); // Ajout de cette ligne pour récupérer la liste mise à jour
            setFoods(updatedFoods);
                // Effectuez les actions nécessaires après la suppression
            } else {
                console.error('Réponse inattendue lors de la suppression');
            }
        } catch (error) {
            const updatedFoods = await apiService.getFoods(); // Ajout de cette ligne pour récupérer la liste mise à jour
            setFoods(updatedFoods);
            console.error('Erreur lors de la suppression', error.message);
        }
    };

    return (
        <div className="container-cards" id="card">
            <form onSubmit={handleUpdateAllFoods}>
                <div className="list-product">
                    <div className="container-title-product">
                        <p>Image</p>
                        <p>Titre</p>
                        <p>Description</p>
                        <p>Prix</p>
                        <p></p>
                    </div>
                    {currentFoods.map((food) => (
                        <div className="product-info" key={food.id}>
                            <label className="fileUpload" htmlFor={`fileUpload-${food.id}`}>Changer l'image</label>
                            <input
                                id={`fileUpload-${food.id}`}
                                style={{display: "none"}}
                                type="file"
                                name="image"
                                placeholder="image du plat"
                                onChange={(e) => handleInputChange(food.id, e)}
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder={food.title}
                                value={editableFoods[food.id]?.title !== undefined ? editableFoods[food.id]?.title : food.title}
                                onChange={(e) => handleInputChange(food.id, e)}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="description du plat"
                                value={editableFoods[food.id]?.description !== undefined ? editableFoods[food.id]?.description : food.description}
                                onChange={(e) => handleInputChange(food.id, e)}
                            />
                            <select
                                name="category"
                                value={editableFoods[food.id]?.category !== undefined ? editableFoods[food.id]?.category : food.category}
                                onChange={(e) => handleInputChange(food.id, e)}
                            >
                                <option value="">Sélectionnez une catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <input
                                className="input-price"
                                type="text"
                                name="price"
                                placeholder="prix du plat"
                                value={editableFoods[food.id]?.price !== undefined ? editableFoods[food.id]?.price : food.price}
                                onChange={(e) => handleInputChange(food.id, e)}
                            />
                            <button className="sup-product" onClick={() => handleDeleteFood(food.id)}>
                                {isSmallScreen ? 'Supprimer' : 'X'}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="container-btn-update"><button className="btn-update" type="submit">Mettre à jour les produits</button></div>
            </form>

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

            <SectionCategories/>
        </div>
    );
}

export default Cards;
