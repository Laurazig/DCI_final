import React, { useContext } from 'react';
import { MyContext } from '../../App';
import ReactStars from "react-rating-stars-component"


const MealsPage = () => {
  const { meals, cart, setCart, user } = useContext(MyContext);
  

  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    
    if (item) {
      item.quantity += 1;
      setCart([...cart]);
    } else {if ((cart.length +1) > 3 ){
      alert('Reached Maximum Quantity of Meals')
      console.log('Minimum and  Maximum meals')
      return 
    }
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };

  return (
    <div >

      <div>
        <h2>Welcome {user && user.firstName}</h2>
      </div>
      <h2>Meals page</h2>
      <p>Select 3 meals and then go to cart page to process your order. </p>
<div style={{ display: 'flex', flexWrap: 'wrap' }}>

      {meals.map((meal) => {
        return (
          <div key={meal._id} style={{ width: '300px', padding: '20px' }}>
            <h2>{meal.mealName}</h2>
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
    </div>
  );
};

export default MealsPage;
