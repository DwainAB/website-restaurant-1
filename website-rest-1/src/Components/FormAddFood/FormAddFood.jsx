// AddFoodForm.js
import React, { useState } from 'react';
import { apiService } from '../../API/apiService'; 
import "./FormAddFood.css"
import "../Cards/Cards.css"

function AddFoodForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
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
          const imageURL = URL.createObjectURL(file);
          setImageURL(imageURL);
        }
      };



    return (
        <div className='container-formaddfood'>
            <form >
                <input  className="input-title-food" type="text" name="title" placeholder='Nom du produit' onChange={handleTitleChange} required/>
                <textarea type="text" name="description" placeholder='description du produit' rows={4} cols={50} style={{ resize: "none" }} required/>
                <input className='input-price-food' type="text" name="price" placeholder='prix' pattern="^\d+(,|\.)\d{1,2}$" onChange={handlePriceChange} required/>
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
    );
}

export default AddFoodForm;
