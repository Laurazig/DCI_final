import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import './cartPage.scss';

const CartPage = () => {
  const { cart, setCart, user, setOrders, orders, meals } =
    useContext(MyContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState(false);
  const [total, setTotal] = useState(0);
  const [userData, SetUserData] = useState(null);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    setTotal(sum);
  }, [cart]);

  // ===========================================================================
  // The customer placing an order in the front end and post it in the back end
  //============================================================================
  const placeOrder = async () => {
    if (!user) {
      navigate("/register");
    } else if (cart.length !== 0) {
      const newOrder = {
        meals: cart.map((item) => item._id),
        total: total,
        userId: user.id
      }
      console.log(user)
      const settings = {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch(`http://localhost:3001/orders`, settings)
      const result = await response.json()

      try {
        if (response.ok) {
          setOrders([...orders, result.data._id]);
          setCart([])
          //show success page with payment button
          setPlacedOrder(true)
        } else {
          throw new Error(result.message)
        }
      } catch (err) {
        alert(err.message)
      }
    }
  }
  // ===========================================================================
  // Customer can delete individual item from cart page
  //============================================================================
  const deleteItem = async event => {
    const userId = event.target.parentElement.id;
    const settings = {
      method: "DELETE",
      credentials: 'include'
    };
    const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${userId}/meals`, settings);
    const parsedRes = await response.json();
    try {
      if (response.ok) {
        console.log('Delete This Item', parsedRes.usersMeals);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  // ===========================================================================
  // Customer clicks pay on success page to load stripe payment (order already in database)
  //============================================================================
  const stripe = async () => {
    const pay = {
      total: total
    }
    console.log(pay)
    const settings = {
      method: "POST",
      body: JSON.stringify(pay),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch(`http://localhost:3001/payment`, settings)
    const result = await response.json()
    try {
      if (response.ok) {
        //STRIPE - taken from Youtube tutorial
        // .then(({ url }) => {   console.log(url) })
        // .then(({ url }) => {   window.location = url })
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      alert(err.message)
    }
  }
  //ternary oporator: 1 placed order===true - show success /2 placed order===false - show delete meals option
  return (
    <div>
      {placedOrder ? (
        <>
          <h2>Order  Summary</h2>
          <h3>This is your choice of meals:</h3>
          {cart.map((meal) => {
            return (
              <div key={meal._id}>
                <img src={meal.img} width="100" alt="" />
                <h4>{meal.mealName}</h4>
                <p>{meal.price}€</p>
              </div>
            );
          })}
          <h3>order address:</h3>
          <div>
            {
              userData &&
              (
                <div key={userData._id}>
                  <p>{userData.firstName} {userData.lastName}</p>
                  <p>{userData.street} {userData.houseNo}</p>
                  <p>{userData.city}</p>
                  <p>{userData.zipCode}</p>
                  <p>{userData.phone}</p>
                </div>
              )
            }
          </div>
          <h3>Total to pay:</h3>
          <div className="total">
            {" "}
            {cart.length > 0 && <h2> Total : {total}€  </h2>}{" "}
          </div>
          <button onClick={stripe}>pay</button>
        </>
      ) : (
        <div>
          <h3>Your choice this week: </h3>
          {cart.map((meal) => {
            return (
              <div key={meal._id}>
                <img src={meal.img} width="100" alt="" />
                <h4>{meal.mealName}</h4>
                <p>{meal.price}€</p>
                <div className={"deleteCartItems"}> 
                <h3>
                </h3> 
                <button className={"cartButtonsDelete"} onClick={deleteItem}>X</button> </div>
              </div>
            );
          })}

          <div className="total">
            {" "}
            {cart.length > 0 && <h2> Total : {total}€  </h2>}{" "}
          </div>
          <h3>{message}</h3>
          <h3>Address: </h3>
          <div>
            {
              userData &&
              (
                <div key={userData._id}>
                  <p>{userData.firstName} {userData.lastName}</p>
                  <p>{userData.street} {userData.houseNo}</p>
                  <p>{userData.city}</p>
                  <p>{userData.zipCode}</p>
                  <p>{userData.phone}</p>
                </div>
              )
            }
          </div>
          <button onClick={placeOrder}>checkout</button>
        </div>
      )}
    </div>

  );
};

export default CartPage;
