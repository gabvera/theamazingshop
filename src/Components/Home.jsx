import { useState, useEffect } from 'react'

export default function Home(props) {
  
  function addToCart(id){
    props.setCurrentCart(prevCart => [
      ...prevCart,
      props.data[id-1] 
    ])
  }
  
  
  function Card(props){  
      const [clicked, setClicked] = useState(props.currentCart.some(item => item.id === props.id))
      // checks if the item is in the current cart

      function AmountManager(props){
        const amountOfItems = props.currentCart.filter(item => item.id === props.id)
        // checks the amount of items with same ID

        useEffect(() => {
          if(amountOfItems == 0){
            setClicked(false)
          }
        },[amountOfItems])

        function handleButton(e){
          if(e.target.textContent === '+'){
            addToCart(props.id)
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
          }
        }

        return(
          <div className='amount-manager'>
            <button onClick={event => handleButton(event, props.setCurrentCart)}>-</button>
            <div>{amountOfItems.length}</div>
            <button onClick={event => handleButton(event, props.setCurrentCart)}>+</button>
          </div>
        )
      }

        return(
            <div className='card'>
                <h3>{props.name.length > 20 ? props.name.slice(0, 17) + "..." : props.name}</h3>
                <img src={props.img} alt="" />
                <div className='text-card'>
                    <div>${props.price}</div>
                    <div className='rating'>{props.rating}/5</div>
                </div>
                {clicked ? <AmountManager setCurrentCart={props.setCurrentCart} currentCart={props.currentCart} id={props.id}/> : <button onClick={() => addToCart(props.id)}>{'Add to Cart'}</button>}
            </div>
        )
    }

    const displayCards = props.data.map((item) => <Card setCurrentCart={props.setCurrentCart} currentCart={props.currentCart} name={item.title} rating={item.rating.rate} price={item.price} key={item.id} id={item.id} img={item.image}/>)

  return (
    <>
      <div className='home-container'>
            <div className='cards-container'>
                {displayCards}
            </div>
      </div>
    </>
  )
} 
