import React, {useContext} from 'react';
import  { MyContext }  from "../App.js";

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
      <button className="logout-btn" onClick={showTotalCustomers}>
        View User Data
      </button>
    );
  };
  
  export default UsersData;
  