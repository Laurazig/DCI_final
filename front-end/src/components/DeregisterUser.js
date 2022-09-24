import React, {useContext} from 'react';
import  { MyContext }  from "../App.js";
import './admin.scss'

const DeregisterUser = () => {
  const { deleteUserAccount } = useContext(MyContext);
  return (
    <div>
      <button onClick={deleteUserAccount} > Delete user account</button>
    </div>
  )
}

export default DeregisterUser;
