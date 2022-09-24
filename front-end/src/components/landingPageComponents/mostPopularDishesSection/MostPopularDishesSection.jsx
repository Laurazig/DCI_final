import React, { useContext, useEffect } from 'react';
import './mostPopularDishesSection.scss';
import ReactStars from 'react-rating-stars-component';
import { MyContext } from '../../../App.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MostPopularDishesSection() {
  const { cart, token, isLoggedIn, setCart } = useContext(MyContext);
  const navigate = useNavigate();
  const [featuredMeals, setFeaturedMeals] = useState([]);
  useEffect(() => {
    selectMeals();
  }, []);
  const selectMeals = async () => {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + '/landingPage/meals/featured',
      settings
    );
    const parsedRes = await response.json();
    try {
      if (response.ok) {
        setFeaturedMeals(parsedRes.featured);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);

    if (!isLoggedIn) {
      alert('Please login');
      navigate('/login');
    } else {
      if (item) {
        item.quantity += 1;
        setCart([...cart]);
      } else {
        if (cart.length + 1 > 3) {
          alert('Reached Maximum Quantity of Meals');
          return;
        }
        setCart([...cart, { ...meal, quantity: 1 }]);
      }
    }
  };

  return (
    <div className="mostPopularDishesSection">
      <h2 className='pageTitle'> Try our most popular dishes</h2>

      <div className="cardsContainer">
        {featuredMeals.map((meal) => {
          return (
            <div key={meal._id} className="popularMeals">
              <img className='imgPopular' src={meal.img} width="300" alt="" />
              <h2 className="mealName">{meal.mealName} <strong className="price">€ {meal.price}</strong></h2>
              <p className="mealDescription">{meal.description}</p>
              <button className='addToCart' onClick={() => addToCart(meal)}>Add To Cart</button>
              <ReactStars 
                count={5}
                value={meal.rating}
                size={16}
                isHalf={true}
                activeColor="yellow"
              />
               
            </div>
          );
        })}
      </div>
    </div>
  );
}
