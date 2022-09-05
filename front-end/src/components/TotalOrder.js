import React, {useContext} from 'react';
import  { MyContext }  from "../App.js";
import './admin.scss'

const TotalOrder = () => {
    const { user, token } = useContext(MyContext);
    const showAllOrderedCount = async () => {
      
      const settings = {
        headers: {
            "Authorization": "Bearer " + token
        }
      };
  
      const response = await fetch(process.env.REACT_APP_SERVER_URL + `/admin/${user.id}/count`, settings);
      const result = await response.json();
  
      try {
        if (response.ok) {
          alert(`The total number of order is ${result.count}.`);
        } else {
          throw new Error(result.message);
        }
      } catch {
        alert(result.message);
      }
    };
  
    return (
      <button  onClick={showAllOrderedCount}>
        Total order
      </button>
    );
  };
  
  export default TotalOrder;
  