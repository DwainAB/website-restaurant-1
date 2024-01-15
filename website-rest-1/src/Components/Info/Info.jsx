import React from "react";
import "./Info.css"

function Info(){
    return(
        <div className="container-info">

            <div className="container-info-hour" id="hours">
                <h2 className="hour-title" >Horaires :</h2>
                <div className="opening">
                    <div className="days">
                        <p className="day">Lundi</p>
                        <p className="day">Mardi </p>
                        <p className="day">Mercredi </p>
                        <p className="day">Jeudi </p>
                        <p className="day">Vendredi </p>
                        <p className="day">Samedi </p>
                        <p className="day">Dimanche </p>
                    </div>
                    <div className="Hours">
                        <p className="hour">12:00 - 14:30 / 19:00 - 22:30</p>
                        <p className="hour">Fermé</p>
                        <p className="hour">12:00 - 14:30 / 19:00 - 22:30</p>
                        <p className="hour">12:00 - 14:30 / 19:00 - 22:30</p>
                        <p className="hour">12:00 - 14:30 / 19:00 - 22:30</p>
                        <p className="hour">12:00 - 14:30 / 19:00 - 22:30</p>
                        <p className="hour">12:00 - 14:30 / 19:00 - 22:30</p>
                    </div>
                </div>
                
            </div>

            <div className="container-map">
            <iframe
            width="544"
            height="496"
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=544&amp;height=496&amp;hl=en&amp;q=1%20Rue%20Gustave%20Eiffel%20Rosny-sous-bois+(Wok%20Grill%20Rosny-sous-bois)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Map"
            ></iframe>
            <a href="https://maps-generator.com/"> </a>
            </div>

        </div>
    )
}

export default Info