import React, { useState, useEffect } from 'react';
import { apiService } from '../../API/apiService';
import "./SectionCategories.css";

function SectionCategories() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    // Extraction de la logique de récupération des catégories dans une fonction séparée
    const fetchCategories = async () => {
        try {
            const fetchedCategories = await apiService.getAllCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    };

    const addCategory = async () => {
        try {
            await apiService.addCategory(newCategoryName);
            setNewCategoryName("");
            fetchCategories(); // Rafraîchir les catégories après l'ajout d'une nouvelle catégorie
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await apiService.deleteCategory(categoryId);
            fetchCategories(); // Rafraîchir les catégories après la suppression
        } catch (error) {
            fetchCategories()
            console.error('Erreur lors de la suppression de la catégorie:', error);
        }
    };

    return (
        <div>
            <h2 className='title-categorie'>Catégories</h2>
            <div className='container-params-category'>
                <ul className='list-categories'>
                    {categories.map(category => (
                        <li className='categorie-item' key={category.id}>
                            {category.name}
                            <button onClick={() => deleteCategory(category.id)}>X</button>
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        className='addCategorie'
                        type="text"
                        placeholder="Nom de la catégorie"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button className='btn-addCategorie' onClick={addCategory}>Ajouter</button>
                </div>
            </div>
        </div>
    );
}

export default SectionCategories;
