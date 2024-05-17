import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Header from './Components/Header'
import Home from  './Components/Home'
import Cart from './Components/Cart';
import ErrorPage from './Components/ErrorPage';

function App() {
  const [data, setData] = useState('')
  const [currentCart, setCurrentCart] = useState([])

  console.log(currentCart)

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
          <Route path="/" element={<Home data={data} currentCart={currentCart} setCurrentCart={setCurrentCart} />} />
          <Route path="cart" element={<Cart data={data} currentCart={currentCart} setCurrentCart={setCurrentCart} />} />
          <Route path="*" element={<ErrorPage />} />
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
