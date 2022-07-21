import React from "react";
import "./footer.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';


export default function Footer() {
  return (
<div className="footer">
      
<div className="contact footerLeftContainer">
<div className="getInTouch">
<h5>Get in touch</h5>
<p>info@biobites.com</p>
<p>+49 464339920</p>
</div>

<div className="address">
<h5>Address</h5>
<p>Prinzenstraße 89, 10969 Berlin, Deutschland</p>
</div>
</div>

<div className="socialMediaIcons footerCenterContainer">
<FacebookIcon/>
<InstagramIcon/>
<PinterestIcon/>
</div>

<div className="impressum footerRightContainer">
<p>© BioBites 2022</p>
<p>Conditions</p>
<p>Privacy</p>
<p>Imprint</p>
</div>

</div>
 
 );
}
