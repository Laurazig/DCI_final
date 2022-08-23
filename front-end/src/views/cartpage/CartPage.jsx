
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import './cartPage.scss';

const CartPage = () => {
  const { cart, setCart, user, setOrders, orders, meals } =
    useContext(MyContext);
    const navigate = useNavigate;
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

  useEffect(() => {
    console.log(`userData: ${userData}`)

  }, []);

  // const changeQuantity = (e, meal) => {
  //   const item = cart.find((elem) => elem._id === meal._id);
  //   item.quantity = Number(e.target.value);
  //   setCart([...cart]);
  //   console.log(item);
  // };

  // const getAddress = (e) => {
  //     e.preventDefault();
  //     let userAddress = {
  //       house: e.target.hn.value,
  //       street: e.target.stn.value,
  //       postcode: e.target.pc.value,
  //       city: e.target.city.value,
  //       country: e.target.country.value,
  //     };
  //     console.log(userAddress);
  //     e.target.reset();
  //   };

  //user enters card number, date, 3dig - click confirm order
  //last 4 dig card is stored in database order
  //stripe sandbox to process payment
  // const payment = (e) => {
  //   e.preventDefault()
  //   ??setCardNum =cardNumber.slice(-4)
  // }

  // const placeOrder = () => {
  //   if (!user) {
  //     navigate("/register");
  //   } else if (cart.length !== 0) {

  //     fetch(`http://localhost:3001/users/${user.id}/order`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: user.id,
  //         usersMeals: cart.map((item) => item._id),
  //         //CardNumLast4Dig:
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result.success) {
  //           console.log(result);
  //           fetch(`http://localhost:3001/order/${result.data._id}`)
  //             .then((res) => res.json())
  //             .then((final) => {
  //               console.log(final);
  //               if (final.success) {
  //                 console.log(final);
  //                 setOrders([...orders, ...final.data.usersMeals]);
  //               }
  //             });
  //           setPlacedOrder(true);
  //           setUser(result.data.userId);
  //           setCart([]);
  //         } else {
  //           alert(result.message);
  //         }
  //       })
  //       .catch((err) => console.log(err.message));
  //   } else {
  //     alert("please select any item from our meal list");
  //   }
  // };

  // ! Yohannes and Sameer modify the placeOrder function 
 
  const placeOrder = async () => {
    if(!user){
      navigate("/register");

    } else if(cart.length !== 0) {

      const newOrder = {
        body: JSON.stringify({
          userOrder: cart.map((item) => item._id),
          //userId: user.id
          }), //! needs to be checked
      }

      const settings = {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const response = await fetch(`http://localhost:3001/users/${user.id}/order`, settings)
      const data = await response.json()

      try{
        if(response.ok){
          setOrders([...orders, data.id]); //! needs to be checked 
        } else {
          throw new Error(data.message)
        }
      }catch(err){
        alert(err.message)
      }
    }
  }


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
        /*  setMeals( parsedRes.meals ); */

      } else {
        throw new Error(parsedRes.message);
      }

    } catch (err) {
      alert(err.message);
    }

  };

  return (
    <div>
      {placedOrder ? (
        <h2>Thanks for placing order: </h2>
        // <h3>This is your choice of meals:</h3>
        // <h3>order address:</h3>
        // <h3>last 3 dogits of card used for order:</h3>
        // <button>click here to return to meals</button>
      ) : (
        <div>
          <h3>Your choice this week: </h3>
          {cart.map((meal) => {
            return (
              <div key={meal._id}>
                <img src={meal.img} width="100" alt="" />
                <h4>{meal.mealName}</h4>
                <p>{meal.price}€</p>
                <div className={"deleteCartItems"}> <h3>
                  {/* quantity :   */}
                  {/* <button className={"cartButtons"}onClick={ deleteItem}>-</button> <span> </span> */}
                  {/* <input
                    type="text"
                    defaultValue={meal.quantity}
                    onChange={(e) => changeQuantity(e, meal)}
                  />{" "} */}
                  {/* <button className={"cartButtons"} onClick={ deleteItem}>+</button> */}
                </h3> <button className={"cartButtonsDelete"} onClick={deleteItem}>X</button> </div>

              </div>
            );
          })}
        </div>
      )}

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
              {/* </h3> <button  onClick={ addAddress}>Add Address</button> */}
            </div>
          )
             }
      </div>
      {/* <form onSubmit={getAddress}>
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
      </form> */}
      <h3>Payment: </h3>
      {/* <form onSubmit={payment}> */}
      <form >
        <label>
          card No.
          <input type="number" name="hn" min={12} />
        </label>
        <label>
          Month / year
          <input type="number" name="stn" />
        </label>
        <label>
          3 dig
          <input type="number" name="stn" min={3} />
        </label>
      </form>


      <button onClick={placeOrder}>checkout</button>

    </div>
  );
};

export default CartPage;
