import React from "react";
import "./premiumSection.scss";

export default function PremiumSection() {
  return (
    <div className="premiumSection">
      <h2>Premium plan. coming soon!</h2>

      <div className="horizontalCardContainer">
        
        <div className="premiumVisual">

        </div>
        
        <div className="titleAndParagraph">
          <h3>Many more advantages with BioBites Premium</h3>
          <p>
          BioBites will always provide a vast range of dishes to choose from and everything you need, already dosed according to the recipes you choose to cook.
          But With the premium membership you will always have <span>free dessert</span> and many more advantages like:
          </p>
          <ul>
          <li>Extra meal choices.</li>
            <li>Faster delivery.</li>
            <li>Choosing the time you will receive your box.</li>
            <li>10% discount on orders Monday to Friday </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
