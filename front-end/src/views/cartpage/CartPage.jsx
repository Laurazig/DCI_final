import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";

const CartPage = () => {
  const { cart, setCart, user, setUser, setOrders, orders } =
    useContext(MyContext);
  const [message, setMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    setTotal(sum);
  }, [cart]);

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

  const placeOrder = () => {
    if (!user) {
      setMessage("You need to login first");
    } else if (cart.length !== 0) {
      fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          meals: cart.map((item) => item._id),
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result);
            fetch(`http://localhost:4000/orders/${result.data._id}`)
              .then((res) => res.json())
              .then((final) => {
                console.log(final);
                if (final.success) {
                  console.log(final);
                  setOrders([...orders, ...final.data.meals]);
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
  return (
    <div>
      {placedOrder ? (
        <h2>Thanks for placing order: </h2>
      ) : (
        <div>
          {cart.map((meal) => {
            return (
              <div key={meal._id}>
                <img src={meal.thumbnail} width="100" alt="" />
                <h2>{meal.title}</h2>
                <p>{meal.price}</p>
                <h3>
                  quantity :
                  <input
                    type="text"
                    defaultValue={meal.quantity}
                    onChange={(e) => changeQuantity(e, meal)}
                  />{" "}
                </h3>
              </div>
            );
          })}
        </div>
      )}

      <div className="total">
        {" "}
        {cart.length > 0 && <h2> Total :{total} </h2>}{" "}
      </div>
      <button onClick={placeOrder}>checkout</button>
      <h3>{message}</h3>
      <h3>Address: </h3>
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
    </div>
  );
};

export default CartPage;
