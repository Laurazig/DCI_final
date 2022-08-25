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


  /*
  const changeQuantity = (e, meal) => {
    const item = cart.find((elem) => elem._id === meal._id);
    item.quantity = Number(e.target.value);
    setCart([...cart]);
    console.log(item);
  };

  const getAddress = (e) => {
      e.preventDefault();
      let userAddress = {
        house: e.target.hn.value,
        street: e.target.stn.value,
        postcode: e.target.pc.value,
        city: e.target.city.value,
        country: e.target.country.value,
      };
      console.log(userAddress);
      e.target.reset();
    };

  user enters card number, date, 3dig - click confirm order
  last 4 dig card is stored in database order
  stripe sandbox to process payment
  const payment = (e) => {
    e.preventDefault()
    ??setCardNum =cardNumber.slice(-4)
  }

  const placeOrder = () => {
    if (!user) {
      navigate("/register");
    } else if (cart.length !== 0) {

      fetch(`http://localhost:3001/users/${user.id}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          usersMeals: cart.map((item) => item._id),
          //CardNumLast4Dig:
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result);
            fetch(`http://localhost:3001/order/${result.data._id}`)
              .then((res) => res.json())
              .then((final) => {
                console.log(final);
                if (final.success) {
                  console.log(final);
                  setOrders([...orders, ...final.data.usersMeals]);
                }
              });
            setPlacedOrder(true);
            setUser(result.data.userId);
            setCart([]);
          } else {
            alert(result.message);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      alert("please select any item from our meal list");
    }
  };

  */

  // * Yohannes and Sameer modify the placeOrder function 

  // ===========================================================================
  // The customer placing an order in the front end and post it in the back end
  //============================================================================
  const placeOrder = async () => {
    if (!user) {
      navigate("/register");

    } else if (cart.length < 3) {
      alert("Minimum order is three meals")


    } else {
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
          setCart([]);
          setPlacedOrder(true)
        } else {
          throw new Error(result.message)
        }
      } catch (err) {
        alert(err.message)
      }
    }
  }

  // * Yohannes and Sameer modify the placeOrder function 

  // ===========================================================================
  // Deleting a single ordered meal by the customer
  //============================================================================

  const deleteSingleOrderedMeal = async event => {

    const selectedMealId = event.target.parentElement.id;
    const cartItem = cart.filter((cartItem) => cartItem._id != selectedMealId)
    setCart(cartItem)
    const settings = {
      method: "DELETE"
    };

    console.log(selectedMealId)

    const response = await fetch(`http://localhost:3001/orders/${selectedMealId}`, settings);
    const result = await response.json();

    try {
      if (response.ok) {
        setOrders(result.meals)
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      alert(err.message)
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
  //ternary operator: 1. placed order===true - show success page | 2. placed order===false - show delete meals option
  return (
    <div>
      {placedOrder ? (
        // success page:
        <>
          <h2>Order  Summary</h2>
          <h3>This is your choice of meals:</h3>
          {/* meals not showing */}
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
          {/* address not showing */}
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
          {/* total not showing */}
          <div className="total">
            {" "}
            {cart.length > 0 && <h2> Total : {total}€  </h2>}{" "}
          </div>
          {/* click pay=>500error */}
          <button onClick={stripe}>pay</button>
        </>
      ) : (
        // delete page
        <div className="ordered-meals-container">
          <h3>Your choice this week: </h3>
          {cart.map((meal) => {
            return (
              <div key={meal.id} onClick={deleteSingleOrderedMeal} className="ordered-meals">
                <div> <img src={meal.img} width="100" alt="" /> </div>
                <h4>{meal.mealName}</h4>
                <p>{meal.price}€</p>
                <div id={meal._id} className="deleteOrderedMeal" > <span>X</span></div>
              </div>
            );
          })}
          <div className="total">
            {" "}
            {cart.length > 0 && <h2> Total : {total}€  </h2>}{" "}
          </div>
          <h3>{message}</h3>
          {/* address not showing */}
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
              {/* </h3> <button  onClick={ addAddress}>Add Address</button> */}
            </div>
          )
             }
      </div>
          {/* 
          <form onSubmit={getAddress}>
            <label>
              House No.
              <input type="number" name="hn" min={1} />
            </label>
            <br />
            <label>
              Street No.
              <input type="number" name="stn" />
            </label>
            <br />
            <label>
              City.
              <input type="text" name="city" />
            </label>
            <br />
            <label>
              Postal Code.
              <input type="number" name="pc" />
            </label>
            <br />
            <label>
              Country
              <input type="text" name="country" />
            </label>
            <br />
            <input type="submit" value="add" />
          </form> 
          */}

          {/* onclick loads success page with pay button. Success page will always show until user pays */}
          <button onClick={placeOrder}>checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
