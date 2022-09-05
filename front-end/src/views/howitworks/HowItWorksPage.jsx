import React, { useState, useContext } from "react";
import "./howItWorks.scss";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const HowItWorksPage = () => {
  const [hideFAQ, setHideFAQ] = useState(true);

  const handleCliclFAQ = (event) => {
    setHideFAQ((current) => !current);
  };

  return (
    <div className="howItWorksPage">
      <div className="visualHowItWorks">
        <h1>
          How it
          <br /> works
        </h1>
      </div>

      <div className="pWrapper">
        <span>
          <h3>1. Choose 3 meals</h3>
          <p>
            login and select your 3 meals from the long list. On the Cart page
            enter your card details and click to confirm order. Easy peasy!
          </p>
        </span>
        <ArrowForwardIosIcon />
        <span>
          <h3>2. Get your delivery</h3>
          <p>
            Each week, you’ll open simple step-by-step recipes complete with
            nutritional information and fresh, pre-measured ingredients to get
            you whipping up delicious dinners in no time.
          </p>
        </span>
        <ArrowForwardIosIcon />

        <span>
          <h3>3. Cook, eat, enjoy!</h3>
          <p>
            The old “what do you want to eat?” conversation is about to be
            banished from your life. Welcome to a world where dinner is always
            planned, simple, and delicious.
          </p>
        </span>
      </div>

      <span className="FAQtitle" onClick={handleCliclFAQ}>
        <h2>Frequently Asked Questions</h2>
        <KeyboardArrowDownIcon />
      </span>

      <div className={hideFAQ === true ? "hide" : "FAQwrapper"}>
        

        <span>
          <p>
            <strong>Can I select my meals?</strong>
          </p>
          <p>Yes! You can choose your meals every week.</p>
        </span>

        <span>
          <p>
            <strong>How will my food stay cool?</strong>
          </p>
          <p>
            We carefully handpack all ingredients with special ice packs and
            insulation, so your food keeps cool until you get home.
          </p>
        </span>
        <span>
          <p>
            <strong>What if I don't want a delivery every week?</strong>
          </p>
          <p>
            No worries. You can easily skip a week (or several!) when you need
            to. <br/>Just be sure to do so by your cutoff time 5 days prior to your
            delivery.
          </p>
        </span>
      </div>
    </div>
  );
};

export default HowItWorksPage;
