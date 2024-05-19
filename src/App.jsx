import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Header from './Components/Header'
import Home from  './Components/Home'
import Cart from './Components/Cart';
import ErrorPage from './Components/ErrorPage';
import Item from './Components/Item'

function App() {
  const [data, setData] = useState('')
  const [currentCart, setCurrentCart] = useState([])

  console.log("The current state of the cart is:", currentCart)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const MyComponent = ({ data, currentCart, setCurrentCart }) => {
    if (!data) {
      return null;
    }
    return (
      <>
        <Header currentCart={currentCart} />
        <Routes>
          <Route path="/" element={<Home data={data}/>} />
          <Route path="cart" element={<Cart data={data} currentCart={currentCart} setCurrentCart={setCurrentCart} />} />
          <Route path="/item/:id" element={<Item data={data} setCurrentCart={setCurrentCart} currentCart={currentCart} />} />
          <Route path="*" element={<ErrorPage data={data}/>} />
        </Routes>
      </>
    );
  };

  return (
    <>
      <MyComponent data={data} currentCart={currentCart} setCurrentCart={setCurrentCart}/>
    </>
  )
} 

export default App
