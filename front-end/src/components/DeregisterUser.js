import React, {useContext} from 'react';
import  { MyContext }  from "../App.js";

const DeregisterUser = () => {
  const { deleteUserAccount } = useContext(MyContext);
  return (
    <div>
      <button onClick={deleteUserAccount}> Delete user Account</button>
    </div>
  )
}

export default DeregisterUser;
