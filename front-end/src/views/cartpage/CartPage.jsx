import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import './cartPage.scss';

const CartPage = () => {
  const {
    cart,
    setCart,
    user,
    setOrders,
    orders,
    addToCart,
    removeFromCart,
    changeQuantity,
  } = useContext(MyContext);

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [placedOrder, setPlacedOrder] = useState(false);
  const [total, setTotal] = useState(0);
  const [userData, SetUserData] = useState(null);
  const [sameAddress, setSameAddress] = useState(true);
  //const [stripeState, setStripeState] = useState(false)

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    setTotal(sum);
  }, [cart]);

  // * Yohannes and Sameer modify the placeOrder function
  // ===========================================================================
  // The customer placing an order in the front end and post it in the back end
  //============================================================================
  const submitOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/register');
    } else if (cart.length < 3) {
      alert('Minimum order is three meals');
    } else {
      const newOrder = {
        meals: cart.map((item) => item._id),
        total: total,
        userId: user.id,
        deliveryAddress: {
          houseNo: sameAddress ? user.info.houseNo : e.target.hn.value,
          street: sameAddress ? user.info.street : e.target.stn.value,
          zipCode: sameAddress ? user.info.zipCode : e.target.zc.value,
          city: sameAddress ? user.info.city : e.target.city.value,
          phone: sameAddress ? user.info.phone : e.target.phone.value,
        },
      };

      // console.log(newOrder);

      const settings = {
        method: 'POST',
        body: JSON.stringify(newOrder),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`http://localhost:3001/orders`, settings);
      const result = await response.json();
      try {
        if (response.ok) {
          setOrders([...orders, result.data._id]);
          setPlacedOrder(true);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const changeAddress = (e) => {
    setSameAddress(e.target.checked);
  };

  // ===========================================================================
  // Deleting a single ordered meal by the customer
  //============================================================================

  const deleteSingleOrderedMeal = (meal) => {
    let updatedCart = cart.filter((item) => item._id !== meal._id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    /* const selectedMealId = event.target.parentElement.id;

    const cartItem = cart.filter((cartItem) => cartItem._id != selectedMealId)
    setCart(cartItem)
    const settings = {
      method: "DELETE"
    };

    console.log(selectedMealId)

    const response = await fetch(`http://localhost:3001/orders/${selectedMealId}`, settings);
    const result = await response.json();

      try{
        if(response.ok){
          setOrders(result.meals)
        } else{
          throw new Error(result.message)
        }
      }catch(err){
        alert(err.message)
      } */
  };

  // ===========================================================================
  // Customer clicks pay on success page to load stripe payment (order already in database)
  //============================================================================
  const stripe = async () => {
    const pay = {
      total: total,
    };
    // console.log(`console.log cartpage: pay-${pay}`);
    const settings = {
      method: 'POST',
      body: JSON.stringify(pay),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`http://localhost:3001/payment`, settings);
    const result = await response.json();
    try {
      if (response.ok) {
        //setStripeState(true)
        setCart([]);
        window.location.href = result.url;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //ternary operator: 1. placed order===true - show success page | 2. placed order===false - show delete meals option
  return (
    <div>
      {placedOrder ? (
        <>
          <h2>Order summary </h2>
          <h3>Meals:</h3>
          {cart.map((meal) => {
            return (
              <div key={meal._id} className="ordered-meals">
                <div>
                  {' '}
                  <img src={meal.img} width="100" alt="" />{' '}
                </div>
                <h4>{meal.mealName}</h4>
                <p>{meal.price}€</p>
                <div> {meal.quantity}</div>
              </div>
            );
          })}

          <h3>Address:</h3>
          <p>{user.info.houseNo}</p>
          <p>{user.info.street}</p>
          <p>{user.info.city}</p>
          <p>{user.info.zipcode}</p>
          <p>{user.info.phone}</p>
          <div className="total">
            {' '}
            {cart.length > 0 && <h2> Total : {total}€ </h2>}{' '}
          </div>
          <button onClick={stripe}>Pay</button>
        </>
      ) : (
        <div className="ordered-meals-container">
          {cart.length === 3 ? null : (
            <h3 style={{ color: 'Red' }}>
              Please Select 3 Separate Meals From Our Meal's Selection page to
              proceed to Payment page{' '}
            </h3>
          )}
          <h3>Your choices this week: </h3>
          {cart.map((meal) => {
            return (
              <div key={meal._id} className="ordered-meals">
                <div>
                  {' '}
                  <img src={meal.img} width="100" alt="" />{' '}
                </div>
                <h4>{meal.mealName}</h4>
                <div className="add-reduce-quantity-container">
                  <div>
                    <button onClick={() => addToCart(meal)}>+</button>
                  </div>
                  <div className="value-input-container">
                    <input
                      type="text"
                      value={meal.quantity}
                      onChange={(e) => changeQuantity(e, meal)}
                    />
                  </div>
                  <div>
                    <button onClick={() => removeFromCart(meal)}>-</button>
                  </div>
                </div>
                <p>{meal.price}€</p>
                <div
                  id={meal._id}
                  onClick={() => deleteSingleOrderedMeal(meal)}
                  className="deleteOrderedMeal"
                >
                  {' '}
                  <span>X</span>
                </div>
              </div>
            );
          })}
          <div className="total">
            {' '}
            {cart.length > 0 && <h2> Total : {total}€ </h2>}{' '}
          </div>

          <h3>{message}</h3>
          <label>
            <b>Delivery Address Is Same as Registered Address :</b>{' '}
            <input
              style={{
                width: '50px',
                height: '25px',
                cursor: 'pointer',
                border: '3px solid black',
              }}
              type={'checkbox'}
              defaultChecked
              onChange={changeAddress} /* name="check" */
            />
            <br></br>{' '}
            <p style={{ color: 'red' }}>
              PLEASE NOTE : If your delivery address is Different than your
              REGISTERED Address than please UNCHECK the Box Above and Fill New
              Delivery Address:
            </p>
            <br></br>
          </label>
          <br></br>
          {!sameAddress && (
            <form onSubmit={submitOrder}>
              <h3>New Delivery Address: </h3>
              <label>
                House No.
                <input
                  defaultValue={user.info.houseNo}
                  type="number"
                  name="hn"
                  min={1}
                />
              </label>
              <br></br>

              <label>
                Street No.
                <input defaultValue={user.info.street} type="text" name="stn" />
              </label>
              <br></br>
              <label>
                City.
                <input defaultValue={user.info.city} type="text" name="city" />
              </label>
              <br></br>

              <label>
                Zip Code.
                <input
                  defaultValue={user.info.zipCode}
                  type="number"
                  name="zc"
                />
              </label>
              <br />
              <label>
                Phone
                <input
                  defaultValue={user.info.phone}
                  type="number"
                  name="phone"
                />
              </label>
              <br></br>
              <button disabled={cart.length < 3}>
                Confirm Your Selections And Proceed To Payment Page
              </button>
            </form>
          )}
          {sameAddress && (
            <button onClick={submitOrder} disabled={cart.length < 3}>
              Confirm Your Selections And Proceed To Payment Page
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
