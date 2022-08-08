import React, { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";

const Register = props =>
{
  const {setUser}=useContext(MyContext)

const [userData, setUserdata]=useState({
firstName:"",
lastName:"",
email:"",
password:"",
confirmPassword:"",
year:"",
month:"",
day:"",
street: "" ,
houseNo:"",
zipCode:"",
city:""
});

const {firstName,lastName,email,password,confirmPassword,year,month,day,street,houseNo,zipCode,city}= userData;

  const updateData = event =>{
setUserdata({...userData, [event.target.name]:event.target.value})
    /* switch ( event.target.name )
    {
      case "confirmPassword":
        setConfirmPassword( event.target.value );
        break;
      case "password":
        setPassword( event.target.value );
        break;
      case "firstName":
        setFirstName( event.target.value );
        break;
      case "lastName":
        setLastName( event.target.value );
        break;
      case "email":
        setEmail( event.target.value );
        break;
      case "year":
        setYear( event.target.value );
        break; 
        case "month":
        setMonth( event.target.value );
        break; 
        case "day":
        setDay( event.target.value );
        break; 
        case "street":
        setStreet( event.target.value );
        break; 
        case "houseNo":
        setHouseNo( event.target.value );
        break; 
        case " zipCode":
        setZipCode( event.target.value );
        break; 
        case "city":
        setCity( event.target.value );
        break;
      default:
        break;
    } */
  };

  const registerUser = async event =>
  {
    event.preventDefault();


   /*  const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      year: year,
      month: month,
      day: day,
      street: street,
      houseNo: houseNo,
      zipCode: zipCode,
      city: city,
    }; */


    const settings = {
      method: "POST",
      body: JSON.stringify( userData ),
      headers: {
        "Content-Type": "application/json"
      }
    };
  console.log(process.env.REACT_APP_SERVER_URL);
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/register", settings );
    const parsedRes = await response.json();
    try
    {
      if ( response.ok )
      {
        /* const now = new Date();
        const tokenExpiry = new Date( now.getTime() + 1000 * 60 * 60 );//1 hour Expiry Time of server calculation 
        localStorage.setItem( "data", JSON.stringify( { token: parsedRes.token, id: parsedRes.id, expiry: tokenExpiry.toISOString() } ) ); */
       /* props.login( parsedRes.token , parsedRes.id );*/
setUser(parsedRes)
      } else
      {
        throw new Error( parsedRes.message );
      }
    } catch ( err )
    {
      alert( err.message );
    }
  };
  const updateShowLogin = () =>
  {
    props.setShowLogin( true );
  };

  return (
    <div>
      <h1>New Users gets 50% off !</h1>
      <p>We proudly like to welcome you to our prestigious family. As our appreciation please accept 50% off on your First ORDER!</p>

      <form onSubmit={ registerUser } className={'registerForm'}>
      <h4>Sign-up for free account</h4>

        <div className="feRegister firstLastName">
          <input name="firstName" onChange={ updateData } value={ firstName } placeholder={ "First Name" } />
          <input name="lastName" onChange={ updateData } value={ lastName } placeholder={ "Last Name" } />
        </div>

        <div className="feRegister emailPassword">
          <div>
            <input name="email" onChange={ updateData } value={ email } placeholder={ "Email address" } />
          </div>
          <div>
            <input name="password" onChange={ updateData } value={ password } placeholder={ "Create Password" } />
          </div>
          <div>
            {/* to check the match Create Password and Confirm password */ }
            <input name="confirmPassword" onChange={ updateData } value={ confirmPassword } placeholder={ "Confirm Password" } />
          </div>
        </div>

        <div>
          <div>
            <label>Date of Birth:</label>
            <input name="year" onChange={ updateData } value={ year } placeholder={ "Year" } />
            <input name="month" onChange={ updateData } value={ month } placeholder={ "Month" } />
            <input name="day" onChange={ updateData } value={ day } placeholder={ "Day" } />
          </div>
        </div>


        <div>
          <div>
            <label>Physical Address:</label>
            <input name="street" onChange={ updateData } value={ street } placeholder={ "Street" } />
            <input name="houseNo" onChange={ updateData } value={ houseNo } placeholder={ "House No." } />
            <input name="zipCode" onChange={ updateData } value={ zipCode } placeholder={ "Zip Code" } />
            <input name="city" onChange={ updateData } value={ city } placeholder={ "City" } />
          </div>
        </div>
        <button className="Register feButton">Register</button>
      </form>

      <button onClick={ updateShowLogin }>Already registered? Log in to your account!</button>
    </div>

  );
};

export default Register;