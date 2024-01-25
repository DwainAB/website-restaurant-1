import React, { useEffect, useState } from "react";
import "./review.css"

function Review() {
    const [reviews, setReviews] = useState([]); // État pour stocker les avis

    useEffect(() => {
        // ID de Place et clé API (remplacez par vos propres valeurs)
        const placeId = 'ChIJE9HLgd0S5kcRjqY585LUGjg'; 
        const apiKey = 'AIzaSyBWCVfz4hi__lsl5xctq5O1D90VCezfzP4'; 

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;


        fetch('http://localhost/back-website-restaurant-1/services/googlePlacesProxy.php?placeId=ChIJE9HLgd0S5kcRjqY585LUGjg')
        .then(response => response.json())
        .then(data => {
            setReviews(data.result.reviews)
            console.log("Données récupérées de l'API Google Places :", data);
            // ... (traitement des données)
        })
        .catch(error => console.error('Erreur lors de la récupération des avis:', error));
    
    }, []); // Le tableau vide [] assure que l'effet s'exécute une seule fois après le premier rendu

    console.log(reviews);
    return (
        <div>
            {reviews.length > 0 ? (
                <div>
                    <h2 className="title-review">Avis des Clients</h2>
                    <div id="container-full-reviews">
                        {reviews.map((review, index) => (
                            <div key={index} className="review">
                                <div className="container-review-top">
                                    <div className="review-img-name">
                                        <img className="img-review" src={review.profile_photo_url} alt="" />
                                        <p><strong></strong> {review.author_name}</p>
                                    </div>
                                    <p className="test">{review.rating}/5<span class="material-symbols-outlined">star_rate</span></p>
                                </div>
                                <div className="container-text-review">
                                    <p>{review.text}</p>
                                </div>
                                <p className="time-review">{review.relative_time_description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Aucun avis disponible pour le moment.</p>
            )}
        </div>
    );
}

export default Review;
