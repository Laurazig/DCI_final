import React,{useContext} from 'react'
import {MyContext} from "../App"

const Orders = () => {
  const {orders}=useContext(MyContext)
  return (
    <div><h1>Orders</h1>
    
    {orders.map(order=>{
      return(
        <div>
          <h1>{order.title}</h1>
        </div>
      )
    })}
    </div>
  )
}
export default Orders