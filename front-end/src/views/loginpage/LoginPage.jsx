
import React, { useContext, useState } from 'react';
import './loginPage.scss';
import { MyContext } from '../../App';

const LoginPage = (props) => {
  const {setUser}=useContext(MyContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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

        'Content-Type': 'application/json',
      },
      credentials: 'include',

    };
    const response = await fetch(  
      process.env.REACT_APP_SERVER_URL + '/login', settings

    );
    const parsedRes = await response.json();

    try {
      if (response.ok) {

        setUser(parsedRes)
      /*  props.login( parsedRes.token,  parsedRes.id);*/

      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
      setEmail("");
      setPassword("");
    }
  };

 /*  const updateShowLogin = () => {
    props.setShowLogin(false);
  }; */

  return (
    <div className="loginPage">

        <form onSubmit={attemptLogin} className={'loginForm'}>
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
                placeholder={'Password'}
                className="loginFormEmailPassword"
              />
            </div>
          </div>

          <div /* className="buttonDiv" */>
            <button>Log In</button>
          </div>
        </form>
       {/*  <p> Not registered yet? Register for an account!</p>
        <button onClick={updateShowLogin}>
         Register
        </button> */}

      </div>
    </div>
  );
};

export default LoginPage;
