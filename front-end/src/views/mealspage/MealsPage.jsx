import React, { useContext } from "react";
import { MyContext } from "../../App";
import ReactStars from "react-rating-stars-component";
import DeregisterUser from "../../components/DeregisterUser";
import { useNavigate } from 'react-router-dom';
import UserData from "../../components/UserData";
import TotalOrder from "../../components/TotalOrder";
import TotalOrderPerCustomer from "../../components/TotalOrderPerCustomer";
import "./mealsPage.scss";

const MealsPage = () => {
  const { meals, user, cart, setCart, isLoggedIn, deleteUserAccount, isAdmin, token } = useContext(MyContext);
  const navigate = useNavigate();

  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);

    if (!isLoggedIn) {
      alert("Please login");
      navigate("/login")
    } else {
      if (item) {
        item.quantity += 1;
        setCart([...cart]);
      } else {
        if ((cart.length + 1) > 3) {
          alert('Reached Maximum Quantity of Meals')
          return
        }
        setCart([...cart, { ...meal, quantity: 1 }]);
      }
    }

  };

  return (
    <div>
      {isAdmin && <h2 id="mealPageTitle">Admin Tools</h2>}

      {/* <div id="adminBox"> */}
      <div id='admin'>
        {isAdmin && <UserData token={token} userId={user.id} />}
        {isAdmin && <TotalOrder token={token} userId={user.id} />}
        {isAdmin && <TotalOrderPerCustomer token={token} userId={user.id} />}
      </div>
      <div id='buttonDel'>
        {isAdmin && <DeregisterUser token={token} userId={user.id} deleteUserAccount={deleteUserAccount} />}
      </div>
      {/* </div> */}
      <h3 className="mealPageText">Select 3 meals and proceed to cart for checkout</h3>
      <div className="meals-container">
        {meals.map((meal) => {
          return (
            <div key={meal._id} className="meal">
              <img src={meal.img} width="300" alt="" />
              <h2 className="mealName">{meal.mealName} <strong className="price">€ {meal.price}</strong></h2>
              <p className="mealDescription">{meal.description}</p>
              
           
              <div>
                <button onClick={() => addToCart(meal)}>Add To Cart</button>
              </div>
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
};

export default MealsPage;
