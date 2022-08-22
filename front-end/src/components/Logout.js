import React,{useContext}  from "react";
import { MyContext } from "../../App";

const { logOut} = useContext(MyContext);
const Logout = () => {
  return (
    <div>
        <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Logout