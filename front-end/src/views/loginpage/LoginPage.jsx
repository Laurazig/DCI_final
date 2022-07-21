import React, { useState } from "react";
import "./loginPage.scss";

const LoginPage = (props) => {
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
      },
      Credential: "include",
    };
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/login",
      settings
    );
    const parsedRes = await response.json();

    try {
      if (response.ok) {
        props.login(parsedRes.token, parsedRes.id);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
      setEmail("");
      setPassword("");
    }
  };
  const updateShowLogin = () => {
    props.setShowLogin(false);
  };

  return (
    <div className="loginPage">

      <div className="loginSectionDiv">
        <h1>Login-In to your account</h1>
        <form onSubmit={attemptLogin} className={"loginForm"}>
          <input
            name="email"
            onChange={updateData}
            value={email}
            placeholder={"Email"}
            className="loginFormEmailPassword"
          />
          <input
            name="password"
            onChange={updateData}
            value={password}
            placeholder={"Password"}
            className="loginFormEmailPassword"
          />
        
        </form>
        <button>Log In</button>{" "}
      </div>

      <div className="notRegisteredSection">
      
        <h2> Not registered yet? <br/> click here!</h2>
        <p>
          Every Weekends We Update Our Meals, So Please Kindly Don't Forget To
          Visit <span>Meals Page </span>To Experience Different Cuisine From All
          Around The World
        </p>
        
        <button onClick={updateShowLogin}>Register</button>
      </div>


    </div>
  );
};

export default LoginPage;
