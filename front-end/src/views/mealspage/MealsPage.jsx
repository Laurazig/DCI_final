import React, { useContext } from 'react';
import { MyContext } from '../../App';
import ReactStars from "react-rating-stars-component"


const MealsPage = props => {
  const { meals, cart, setCart } = useContext(MyContext);
  // console.log(`console.log MealsPage user: ${props.user.firstName}`);

  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    if (item) {
      item.quantity += 1;
      setCart(cart);
    } else {
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* <div>
        <h2>Welcome {user.email}</h2>
      </div> */}
      <h2>Meals page</h2>
      {meals.map((meal) => {
        return (
          <div key={meal._id} style={{ width: '300px', padding: '20px' }}>
            <h2>{meal.meal}</h2>
            <p>{meal.description}</p>
            <h3>
              <strong>$ {meal.price}</strong>
            </h3>
            <img src={meal.img} width="300" alt="" />
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
  );
};

export default MealsPage;
