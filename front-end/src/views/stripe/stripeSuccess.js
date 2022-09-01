import React from 'react';
import "./stripe.scss";


const StripeSuccess = () => {
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