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

  return (
    <section className='cart-page-container'>
      {placedOrder ? (
        <div id='orderSummary'>
          <h2>Order summary </h2>
          <div className='orderSummBox'>
            <h3>Meals:</h3>
            {cart.map((meal) => {
              return (
                <div key={meal._id} id="ordered-meals-summ">
                  <div>
                    {' '}
                    <img src={meal.img} width="100" alt="" />{' '}
                  </div>
                  <h4>{meal.mealName}</h4>
                  <p className='individualMealPrice'>{meal.price}€ </p>
                  <div> {meal.quantity} </div>
                </div>
              );
            })}
          </div>
          <div className='orderSummBox'>
            <h3>Address:</h3>
            <p>{user.info.street} {user.info.houseNo}</p>
            <p>{user.info.city}</p>
            <p>{user.info.zipcode}</p>
            <p>{user.info.phone}</p>
          </div>
          <div className="total">
            {' '}
            {cart.length > 0 && <h2> Total : {total}€ </h2>}{' '}
          </div>
          <button onClick={stripe} className='buttonCheckout'>Pay</button>
        </div>
      ) : (
        <div className="ordered-meals-container">
          <h3 id='cartChoicesH3'>Your choices this week: </h3>
          {cart.length === 3 ? null : (
            <h3 id='cartNotificationSelect'>
              Please select 3 separate meals from our meal's selection page to
              proceed to payment page{' '}
            </h3>
          )}
          
          {cart.map((meal) => {
              return (
                <div key={meal._id} className="ordered-meals">
                  <div className='image-container'> <img src={meal.img} width="450" height="340" alt="" /></div>
                  <h4 className='meal-name'>{meal.mealName}</h4>

                  <div className="add-reduce-quantity-container">
                    <div className='quantity-button'> <button onClick={() => addToCart(meal)}>+</button> </div>
                    <div className="value-input-container">
                      <input
                        type="text"
                        value={meal.quantity}
                        onChange={(e) => changeQuantity(e, meal)}
                      />
                    </div>
                    <div className='quantity-button'> <button onClick={() => removeFromCart(meal)}>-</button> </div>

                    <div className='meal-price'>{meal.price}€</div>

                    <div id={meal._id} onClick={() => deleteSingleOrderedMeal(meal)} className="deleteOrderedMeal">  <span>X</span> </div>
                  </div>
                </div>
              );
            })}
         </div>

         <hr />
          <div className="total">
            {cart.length > 0 && <h2> Total : {total}€ </h2>}
          </div>
          <hr />

          <div className='delivery-address'>
            <h3>{message}</h3>  {/* What is the importance of message state variable */}
            <div className='check-box-container'>
                <label className='check-box-and-paragraph-container'>
                    <p className='same-delivery-address-paragraph'>If Delivery Address Is Same as Registered Address, click continue. Otherwise, please UNCHECK the Box next to this paragraph and then Fill out the New Delivery Address.</p>
                    <div className='check-box'>
                      <input 
                        type={'checkbox'}
                        defaultChecked
                        onChange={changeAddress} 
                      />
                  </div>
              </label>
            </div>

            <div>
                {!sameAddress && (
                  <form onSubmit={submitOrder} className="new-delivery-address-form">
                    <h3>New Delivery Address: </h3>
                    <div className='new-delivery-address-container'>
                        <div className='label-and-input'>
                          <div className='label'> <label htmlFor="hn"></label>House Number</div>
                          <div> <input type="number" defaultValue={user.info.houseNo} id="hn" name="hn" min={1} /></div>
                        </div>

                        <div className='label-and-input'>
                          <div className='label'> <label htmlFor="stn"></label>Street Name</div>
                          <div> <input defaultValue={user.info.street} type="text" id='btn' name="stn" /> </div>
                        </div>

                        <div className='label-and-input'>
                          <div className='label'> <label htmlFor="zc"></label> Zip Code</div>
                          <div> <input defaultValue={user.info.zipCode} type="number" name="zc" /> </div>
                        </div>

                        <div className='label-and-input'>
                          <div className='label'> <label htmlFor="city"></label> City </div>
                          <div> <input defaultValue={user.info.city} type="text" id='city' name="city" /> </div>
                        </div>

                        <div className='label-and-input'>
                          <div className='label'> <label htmlFor="phone"></label> Phone </div>
                          <div> <input defaultValue={user.info.phone} type="tel" name="phone" /> </div>
                        </div>
                    </div>
                    <button className='new-address-btn' disabled={cart.length < 3}> Continue </button>
                  </form>
                )}
            </div>

            <div>
              {sameAddress && (
                <div>
                  <button onClick={submitOrder} disabled={cart.length < 3} className='new-address-btn'>Continue</button>
                </div>
            )}
            </div>

          </div>
        </section>
      )}
    </section>
  );
};

export default CartPage;
