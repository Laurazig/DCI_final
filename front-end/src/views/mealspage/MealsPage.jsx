import React, { useContext } from "react";
import { MyContext } from "../../App";
import ReactStars from "react-rating-stars-component";
import "./mealsPage.scss";

const MealsPage = () => {
  const { meals, user, addToCart } = useContext(MyContext);

  return (
    <div>
      <div>
        <h2>Welcome {user && user.firstName}</h2>
      </div>
      <h2>Meals page</h2>
      <div className="meals-container">
        {meals.map((meal) => {
          return (
            <div key={meal._id} className="meal">
              <img src={meal.img} width="300" alt="" />
              <h2>{meal.mealName}</h2>
              <p>{meal.description}</p>
              <h3>
                <strong>€ {meal.price}</strong>
              </h3>
              <ReactStars
                count={5}
                value={meal.rating}
                size={24}
                half={true}
                activeColor="yellow"
              />
              <div>
                <button onClick={() => addToCart(meal)}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsPage;
