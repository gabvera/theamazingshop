import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage'

export default function Item(props) {
    const {data, setCurrentCart, currentCart} = props

    const { id } = useParams();
    const currentData = props.data[id-1]
    // item page values

    const [clickValue, setClickValue] = useState(false)
    // this is the boolean value that will define if it will show the buttons to change the amount of same items in cart or show the button to add for the first time
    
    useEffect(() => {
        const itemInCartCheck = currentCart.some(item => item.id === currentData.id)
        if(itemInCartCheck){
            setClickValue(prevClick => !prevClick)
        }
        // it means that if item was already added to your cart and you go back to the item page, it won't show the "add item to cart" button 
    }, [currentCart])

    const AmountManager = () => {
        let quantity = currentCart.filter(item => item.id === currentData.id).length;

        function buttonManagers(e){
            if(e.target.textContent === '+'){
                setCurrentCart(prevCart => [
                  ...prevCart,
                  data[currentData.id-1] 
                ])
              }else if(e.target.textContent === '-'){
                setCurrentCart(prevCart => {
                    let limit = 0
                     // this let will make sure that only 1 item will be removed and not all items with same ID
                    let newCart = prevCart
                    const updatedCart = newCart.filter(item => {
                      if (item.id === currentData.id && limit == 0) {
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
              }
        }

        return(
            <div className='cart-amount-manager'>
                <button onClick={event => buttonManagers(event)}>-</button>
                <div>{quantity}</div>    
                <button onClick={event => buttonManagers(event)}>+</button>
            </div>
        )
    }

    function addItemHandler(id){
        setClickValue(prevValue => !prevValue)
        setCurrentCart(prevCart => [
            ...prevCart,
            data[id-1] 
        ])
    }

    const ItemComponent = () => {
        return(
            <div className='item-component'>
                <img src={currentData.image} className='item-image' alt="" />
                <div className='item-texts'>
                    <h2>{currentData.title}</h2>
                    <div className='item-inner-texts'>
                        <div>${currentData.price}</div>
                        <div>{currentData.rating.count}</div>
                    </div>
                    {clickValue ? <AmountManager /> : <button className='item-button' onClick={() => addItemHandler(currentData.id)}>Add Item to Cart</button>}
                    <div>{currentData.description}</div>
                </div>
            </div>
        )
    }
    
    return(
        currentData ? <ItemComponent /> : <ErrorPage />
    )
} 
