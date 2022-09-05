import React, { useContext, useState } from "react";
import "./loginPage.scss";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const { setUser, token, setIsLoggedIn } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const updateData = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const attemptLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    const settings = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    /*  credentials: 'include',  */
    };

    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/login",
      settings
    );
    const parsedRes = await response.json();

    try {
      if (response.ok) {
        const now = new Date();
        const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60); 
        // localStorage.setItem("data", JSON.stringify({token: parsedRes.token, id: parsedRes.id, expiry: tokenExpiry.toISOString()}));
        
        setIsLoggedIn(true);
        setUser({id:parsedRes.data._id, info:parsedRes.data, expiry: tokenExpiry.toISOString(), token:parsedRes.token })

        /* setUser({token: parsedRes.token, id: parsedRes.id, firstName: parsedRes.firstName, expiry: tokenExpiry.toISOString()}) */
        navigate("/meals");
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="loginPage">
      <div className="formWrapper">
        <h1>Login-In to your account</h1>

        <form onSubmit={attemptLogin} className={"loginForm"}>
          <div className="loginFormInput">
            <div className="emailFormSection">
              <input
                name="email"
                onChange={updateData}
                value={email}
                placeholder={"Email"}
                className="loginFormEmailPassword"
              />
            </div>
            <div className="passwordlFormSection">
              <input
                name="password"
                onChange={updateData}
                value={password}
                placeholder={"Password"}
                className="loginFormEmailPassword"
                type={password}
              />
            </div>
          </div>
          <button>Log In</button>
        </form>

        <p className="loginParagraph">
        Every Weekend we update our menu! Don't forget to visit our <br></br>
        <span><NavLink to="/meals"> Meals Page</NavLink></span> to discover new dishes from all around the world.
      </p>

      <div> Not registered yet? <NavLink className="registerLink" to="/register"> Click here </NavLink></div>

      </div>

     
    </div>
  );
};

export default LoginPage;
