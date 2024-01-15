import React, { useState, useEffect } from "react";
import { apiService } from '../../API/apiService';
import './CardsAdmin.css';

function Cards() {
    const [foods, setFoods] = useState([]);
    const [editableFood, setEditableFood] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isEditingFood, setIsEditingFood] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);

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
    }, []);

    const handleEditClick = (food) => {
        setIsEditingFood(true);
        setCurrentFood(food);
        setEditableFood({
            ...food,
            image: null, // Préparez pour une nouvelle image si nécessaire
        });
    };

    const handleUpdateFood = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', editableFood.title);
        formData.append('description', editableFood.description);
        formData.append('category', editableFood.category);
        formData.append('price', editableFood.price.toString());
        if (editableFood.image instanceof File) {
            formData.append('image', editableFood.image, editableFood.image.name);
        }

        if (editableFood.image instanceof File) {
            formData.append('image', editableFood.image, editableFood.image.name);
        }

        try {
            const response = await apiService.updateFood(currentFood.id, formData);
            console.log("Réponse de l'API:", response);
            if (response.success) {
                console.log('Mise à jour réussie :', response.message);
                setFoods(foods.map(food => (food.id === currentFood.id ? { ...food, ...editableFood } : food)));
                setIsEditingFood(false);
                setCurrentFood(null);
            } else {
                console.error('Échec de la mise à jour :', response.message);
            }
        } catch (error) {
            if (error.response) {
                error.response.text().then(text => {
                    console.error("Erreur lors de la mise à jour du plat :", text);

                });
            } else {
                console.error("Erreur lors de la mise à jour du plat :", error);
                window.location.reload()

            }       
         }
    };

    const handleRemoveFood = async (foodId) => {
        try {
            const response = await apiService.deleteFood(foodId);
            if (response.status === 200) {
                console.log('Produit supprimé avec succès');
                // Rafraîchir la page pour afficher les produits mis à jour
                window.location.reload();
                console.log(1);
            } else {
                console.error('Échec de la suppression du produit');
                console.log(2);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Si une SyntaxError se produit, ignorez-la car la réponse peut être vide
                console.log('La réponse est vide (pas de JSON)');
                // Rafraîchir la page pour afficher les produits mis à jour
                window.location.reload();
            } else {
                console.error('Erreur lors de la suppression du produit :', error);
                console.log(3);
            }
        }
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditableFood(prev => ({ ...prev, [name]: value }));
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
                <ul className="navigation-cards-ul">
                    {['Tous', 'Entrées', 'Plat chaud', 'Sushi', 'Yakitori', 'Dessert'].map((category) => (
                        <li
                            key={category}
                            className={`navigation-cards-li ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="global-cards">
                {currentFoods.map((food) => (
                    <div className="card" key={food.id}>
                        <img className="card-img" src={`http://localhost/back-website-restaurant-1/${food.image}`} alt={food.title} />
                        <h2 className="card-title">{food.title}</h2>
                        <div className="card-separator"></div>
                        <div className="card-info">
                            <p className="card-price">{food.price} €</p>
                            <button className="card-button" type="button" onClick={() => handleEditClick(food)}>
                                <span className="material-symbols-outlined pen">edit</span>                            
                            </button>
                        </div>
                        <button onClick={() => handleRemoveFood(food.id)} className="btn-remove">X</button>
                    </div>
                ))}
        {editableFood && (
            <div className="update-form">
                <h2>Modifier le Plat</h2>
                <form onSubmit={handleUpdateFood}>
                    <label htmlFor="title">Titre</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Nom du plat"
                        value={editableFood.title}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editableFood.description}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="category">Catégorie</label>
                    <select name="category" value={editableFood.category} onChange={handleInputChange} id="category">
                        <option value="">Sélectionnez une option</option>
                        <option value="Entrées">Entrées</option>
                        <option value="Plat chaud">Plat chaud</option>
                        <option value="Sushi">Sushi</option>
                        <option value="Yakitori">Yakitori</option>
                    </select>
                    <label htmlFor="price">Prix</label>
                    <input
                        id="price"
                        type="text"
                        name="price"
                        placeholder="Prix"
                        value={editableFood.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="file"
                        name="image"
                        placeholder="image"
                        value={editableFood.image}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Mettre à jour</button>
                    <button type="button" onClick={() => setEditableFood(null)}>Annuler</button>
                </form>
            </div>
        )}
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
