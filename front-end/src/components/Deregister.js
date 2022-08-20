import React,{useContext}  from "react";

import { MyContext } from "../../App";

const { deregister } = useContext(MyContext);
const Deregister = props => {
  return (
    <div>
        <button className='logout-btn' onClick={deregister}>Deregister</button>
    </div>
  )
}

export default Deregister