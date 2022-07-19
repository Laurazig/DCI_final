import React from "react";
import "./mostPopularDishesSection.scss"

export default function MostPopularDishesSection() {
  return (
    <div className="mostPopularDishesSection">
      <h2> Try our most popular dishes</h2>

      <div className="cardsContainer">

        <div className="card card1">
          <div className="cardImg cardImg1"></div>
          <h3>Fresh Summer rolls</h3>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est.
          </p>
          <button>Add to cart +</button>
        </div>

        <div className="card card2">
          <div className="cardImg cardImg2"></div>
          <h3>Ricebowl with chickpeas</h3>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est.
          </p>
          <button>Add to cart +</button>
        </div>

        <div className="card card3">
          <div className="cardImg cardImg3"></div>
          <h3>Mint couscous salad</h3>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est.
          </p>
          <button>Add to cart +</button>
        </div>
      </div>
    </div>
  );
}
