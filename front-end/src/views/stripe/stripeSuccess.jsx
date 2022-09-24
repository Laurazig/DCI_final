import React, { useEffect } from 'react';
import "./stripe.scss";
import { useNavigate } from 'react-router-dom';



const StripeSuccess = () => {
  const navigate = useNavigate();
  useEffect(()=>{
     navigate("/")
  },5000)
 

    return (
        <div className='boxAlignment'>
            <div className='paymentBox'>
                <h2>Payment Success! </h2>
                <h3>We are now processing your order</h3>
            </div>
      </div> 
   
    )
   
}

export default StripeSuccess