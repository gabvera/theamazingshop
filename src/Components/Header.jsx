import { useState } from 'react'
import { Link } from "react-router-dom";

export default function Header(props) {

  return (
    <>
      <div className='header-container'>
            <h1>The Amazing Shop</h1>
            <div className='header-buttons'>
                <Link className='header-button' to='/'>Home</Link>    
                <Link className='header-button' to='/cart'>Cart: {props.currentCart.length}</Link>
            </div> 
      </div>
    </>
  )
} 
