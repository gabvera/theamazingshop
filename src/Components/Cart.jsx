import { useState } from 'react'
import { Link } from "react-router-dom";


export default function Cart(props) {

  const CartItem = (props) => {

    let quantity = 0
    let finalPrice = 0
    props.currentCart.filter(item => item.id === props.id ? (quantity++, finalPrice = finalPrice + item.price) : '')

    function handleButton(e){
      if(e.target.textContent === '+'){
        props.setCurrentCart(prevCart => [
          ...prevCart,
          props.data[props.id-1] 
        ])
      }else if(e.target.textContent === '-'){
        props.setCurrentCart(prevCart => {
          let limit = 0
           // this let will make sure that only 1 item will be removed and not all items with same ID
          let newCart = prevCart
          const updatedCart = newCart.filter(item => {
            if (item.id === props.id && limit == 0) {
              limit = 1;
              // now this  
              return false;
              // excludes the object from list
            }
            return true;
            // include all other objects including the ones with same ID 
          })
          return updatedCart
        })            
      }else if(e.target.textContent === 'X'){
        props.setCurrentCart(prevCart => {
          let newCart = prevCart
          const updatedCart = newCart.filter(item => {
            if (item.id === props.id) {
              return false;
              // excludes the object from list
            }
            return true;
            // include all other objects including the ones with same ID 
          })
          return updatedCart
        })  
      }
    }


    return(
      <div className='cart-item'>
        <img src={props.img} alt='Cart item image' className='cart-image'/>
        <div>{props.name}</div>
        <div className='cart-amount-manager'>
          <button onClick={event => handleButton(event)}>-</button>
          <div>{quantity}</div>
          <button onClick={event => handleButton(event)}>+</button>
        </div>
        <div>{finalPrice}</div>
        <button onClick={event => handleButton(event)} className='delete-item'>X</button>
      </div>
    )
  }

  const filteredCart = props.currentCart.reduce((uniqueList, currentItem) => {
    // Check if an item with the same ID already exists in uniqueList
    const isDuplicate = uniqueList.some(item => item.id === currentItem.id);
    
    // If it's not a duplicate, add it to the uniqueList
    if (!isDuplicate) {
      uniqueList.push(currentItem);
    }
    
    return uniqueList;
  }, []);
  // makes sure duplicated items do not appear in cart row 

  const displayCart = filteredCart.map((item) => <CartItem data={props.data} setCurrentCart={props.setCurrentCart} currentCart={props.currentCart} name={item.title} price={item.price} key={item.id} id={item.id} img={item.image}/>)

  return (
    <>
      <div className='cart-container'>
            <h2>You cart:</h2>
            <h4>The current final price of your cart is 99$</h4>
            {displayCart}
      </div>
    </>
  )
} 
