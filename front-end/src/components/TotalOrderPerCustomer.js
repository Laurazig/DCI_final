import React, {useContext} from 'react';
import  { MyContext }  from "../App.js";
import './admin.scss'

const TotalOrderPerCustomer = () => {
    const { user, token } = useContext(MyContext);
    const showAllOrderedCountPerUser = async () => {
      
      const settings = {
        headers: {
            "Authorization": "Bearer " + token
        }
      };
  
      const response = await fetch(process.env.REACT_APP_SERVER_URL + `/admin/${user.id}/count`, settings);
      const result = await response.json();
  
      try {
        if (response.ok) {
          alert(`The total number of order per user is ${result.count}.`);
        } else {
          throw new Error(result.message);
        }
      } catch {
        alert(result.message);
      }
    };
  
    return (
      <button onClick={showAllOrderedCountPerUser}>
        Total order customer
      </button>
    );
  };
  
  export default TotalOrderPerCustomer;
  