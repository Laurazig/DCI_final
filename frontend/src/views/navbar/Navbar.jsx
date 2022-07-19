import React from 'react'
// import "navbar.css"

const Navbar = () => {
  return (
    <div>

      <div>
        <img>Logo</img>
        <h1>BioBites</h1>
      </div>

      <ul>
        <li>How it works</li>
        <li>Meals</li>
        <li>Community</li>
        <li>Support</li>
      </ul>
      <div className='navButtons'>
        <button className='logInButton'>Login</button>
        <button className='regButton'>Register</button>
        <button>Cart</button>
      </div>
    </div>
  )
}

export default Navbar