import React from "react";
import "./trademarkSection.scss"

import BioLogo from "../../../assets/bioLogo.jpg";
import PetaLogo from "../../../assets/petaLogo.jpg";
import HighProteinLogo from "../../../assets/highProteinLogo.jpg";

export default function TrademarkSection() {
  return (
    <div className="trademarkSection">
      <img className="Bio Logo" src={BioLogo} alt="Bio Logo" />
      <img className="Bio Logo" src={PetaLogo} alt="Peta Logo" />
      <img className="Bio Logo" src={HighProteinLogo} alt="high protein Logo" />
    </div>
  );
}
