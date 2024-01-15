import React, { useState } from 'react';
import { apiService } from '../../API/apiService'; 
import "./FormAddFood.css"
import "../Cards/Cards.css"

function AddFoodForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState(null);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(""); // État pour stocker la valeur sélectionnée


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSelectChange = (event) => {
        setCategory(event.target.value);
      };

    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        const convertedValue = inputValue.replace(',', '.');
        const regex = /^[0-9]*\.?[0-9]*$/;
        
        if (regex.test(convertedValue) || convertedValue === '') {
            setPrice(convertedValue);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageURL(URL.createObjectURL(file)); // Pour afficher l'image dans l'UI
            setImage(file); // Pour l'envoyer avec le formulaire
        }
    };
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Créez un objet FormData pour envoyer les données du formulaire.
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('image', image);
        
        try {
            const result = await apiService.addFood(formData);
            console.log(result); // Traitez le résultat comme nécessaire.
    
            // Afficher l'alerte de confirmation ici
            alert('Plat ajouté avec succès!');
    
            // Réinitialiser le formulaire
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
            setImageURL(null);
            window.location.reload()
        } catch (error) {
            console.error(error);
            // Afficher une alerte d'erreur si quelque chose ne va pas
            alert('Une erreur est survenue lors de l\'ajout du plat.');
        }
    };
     
    

    return (
        <>
        <h1 className='h1FormAdd'>Ajouter un produit</h1>
        <div className='container-formaddfood'>
            <form onSubmit={handleSubmit}>
                <input className="input-title-food" type="text" name="title" placeholder='Nom du produit' value={title} onChange={handleTitleChange} required/>
                <textarea className="input-description-food" name="description" placeholder='Description du produit' value={description} onChange={handleDescriptionChange} rows={4} required/>
                <select name="category" value={category} onChange={handleSelectChange}>
                    <option value="">Sélectionnez une option</option>
                    <option value="Entrées">Entrées</option>
                    <option value="Plat chaud">Plat chaud</option>
                    <option value="Sushi">Sushi</option>
                    <option value="Yakitori">Yakitori</option>
                </select>
                <input className='input-price-food' type="text" name="price" placeholder='Prix' value={price} onChange={handlePriceChange} required/>
                <input type="file" name="image" onChange={handleImageChange} required/>
                <div className='container-btn-form-add'><button type="submit">Ajouter Plat</button></div>
            </form>

            <div className='container-visual-food'>
                <div className="card">
                    { imageURL ? <img className="card-img" src={imageURL} alt="food" /> : <p className='text-img-form-add'> Aucune image sélectionnée</p>}
                    {title && <h2 className="card-title" >{title}</h2>}
                    <div className="card-separator" ></div>
                    {price &&( 
                    <div className="card-info">
                        <p className="card-price">{price} €</p>
                        <button className="card-button" type="submit"> 
                            <div class="plus-icon"></div>
                        </button>
                    </div>
                     )}
                </div>
            </div>
        </div>
        </>
    );
}

export default AddFoodForm;
