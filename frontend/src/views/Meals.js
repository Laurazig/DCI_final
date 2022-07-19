import React, { useContext } from "react";
import { MyContext } from "../App";
import ReactStars from "react-rating-stars-component";

const Meals=()=> {
  const { meals,cart,setCart } = useContext(MyContext);
  console.log(meals);

  const addToCart=(meal)=>{
    let item =cart.find(elem=>elem._id===meal._id)
      if(item){
        item.quantity+=1;
        setCart(cart)
      }else{
        setCart([...cart,{...meal,quantity:1}])
      }
  }

  return (
    <div style={{display:"flex",flexWrap:"wrap"}}>
      {meals.map((meal) => {
        return <div key={meal._id} style={{width:"300px",padding:"20px"}}>
            <h2>{meal.title}</h2>
            <p>{meal.description}</p>
            <h3><strong>$ {meal.price}</strong></h3>
            <img src={meal.thumbnail} width="300" alt="" />
            <ReactStars 
            count={5}
            value={meal.rating}
            size={24}
            half={true}
            activeColor="yellow"
            />
            <div>
                <button onClick={()=>addToCart(meal)}>Add To Cart</button>
            </div>
        </div>;
      })}
    </div>
  );
}

export default Meals;