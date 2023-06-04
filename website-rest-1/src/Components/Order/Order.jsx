import React from "react";
import "./Order.css"

function Order(){
    return(
        <div className="container-order">
            <h1>Commande en cours</h1>
            <div className="pending-order">

                <div className="order">

                    <div className="info-article-order">
                        <div className="articles-order">
                            <li className="article-order"><span className="quantity-order">1 </span>Sushi</li>
                            <li className="article-order"><span className="quantity-order">2 </span>Brochette</li>
                            <li className="article-order"><span className="quantity-order">6 </span>Nems</li>
                            <li className="article-order"><span className="quantity-order">1 </span>Nouilles</li>
                        </div>
                        <div className="info-client-order">
                            <li className="name-client">John Joe</li>
                            <li className="phone-client-order">0712345678</li>
                        </div>
                    </div>

                    <div className="info-total-order">
                        <p className="total-price">Total <span className="price-number">45</span> €</p>
                        <p className="number-order">n° <span className="number">1</span></p>
                    </div>
                </div>
                <div className="order">

                    <div className="info-article-order">
                        <div className="articles-order">
                            <li className="article-order"><span className="quantity-order">1 </span>Sushi</li>
                            <li className="article-order"><span className="quantity-order">2 </span>Brochette</li>
                            <li className="article-order"><span className="quantity-order">6 </span>Nems</li>
                            <li className="article-order"><span className="quantity-order">1 </span>Nouilles</li>
                        </div>
                        <div className="info-client-order">
                            <li className="name-client">John Joe</li>
                            <li className="phone-client-order">0712345678</li>
                        </div>
                    </div>

                    <div className="info-total-order">
                        <p className="total-price">Total <span className="price-number">45</span> €</p>
                        <p className="number-order">n° <span className="number">1</span></p>
                    </div>
                </div>
                <div className="order">

                    <div className="info-article-order">
                        <div className="articles-order">
                            <li className="article-order"><span className="quantity-order">1 </span>Sushi</li>
                            <li className="article-order"><span className="quantity-order">2 </span>Brochette</li>
                            <li className="article-order"><span className="quantity-order">6 </span>Nems</li>
                            <li className="article-order"><span className="quantity-order">1 </span>Nouilles</li>
                        </div>
                        <div className="info-client-order">
                            <li className="name-client">John Joe</li>
                            <li className="phone-client-order">0712345678</li>
                        </div>
                    </div>

                    <div className="info-total-order">
                        <p className="total-price">Total <span className="price-number">45</span> €</p>
                        <p className="number-order">n° <span className="number">1</span></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Order