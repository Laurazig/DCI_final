import React from 'react'
import { NavLink } from "react-router-dom";
import "./mainVisual.scss"
//import mainVisualPhoto from '../../../assets/mainVisualAlternative.jpg'

export default function MainVisual() {
  return (
    <div className='mainVisual'>
      <div className='titleAndButton'>
        <h1><span className='h1Top'>bio cooking</span> <br />Made easy</h1>
        <NavLink to="howitworks">
          <button>Get started</button>
        </NavLink>
      </div>
    </div>
  )
}
