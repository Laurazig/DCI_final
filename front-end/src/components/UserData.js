import React, {useContext} from 'react';
import  { MyContext }  from "../App.js";
import './admin.scss'

const UsersData = () => {
    const { user, token } = useContext(MyContext);

    // Function to show all the customers of BioBites
    const showTotalCustomers = async () => {
      
      const settings = {
        headers: {
            "Authorization": "Bearer " + token
        }
      };
  
      const response = await fetch(process.env.REACT_APP_SERVER_URL + `/admin/${user.id}/count`, settings);
      const result = await response.json();
  
      try {
        if (response.ok) {
          alert(`Current number of customers is ${result.count}.`);
        } else {
          throw new Error(result.message);
        }
      } catch {
        alert(result.message);
      }
    };
  
    return (
      <button  onClick={showTotalCustomers}>
        View user data
      </button>
    );
  };
  
  export default UsersData;
  