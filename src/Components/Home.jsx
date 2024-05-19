import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Home(props) {
  const navigate = useNavigate()

  function Card(props){  
        return(
            <div className='card'>
                <h3>{props.name.length > 20 ? props.name.slice(0, 17) + "..." : props.name}</h3>
                <img src={props.img} alt="" />
                <div className='text-card'>
                    <div>${props.price}</div>
                    <div className='rating'>{props.rating}/5</div>
                </div>
                <button onClick={() => navigate(`/item/${props.id}`)}>{'See Item'}</button>
            </div>
        )
    }

    const displayCards = props.data.map((item) => <Card name={item.title} rating={item.rating.rate} price={item.price} key={item.id} id={item.id} img={item.image}/>)

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
