import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { Routes,Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import FilterOrders from './components/Order/FilterOrders';
import { Container } from '@mui/material';

const App: React.FC = () => {
  console.log("App renderer");
  return (
    <Container sx={{ backgroundColor: '#f9f9f9',
      marginTop: '2rem',
      padding: '2rem',
      borderRadius: '15px', // Kenarları yuvarlak hale getirdik
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Hafif bir gölge ekledik

    }} >
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/FilterOrders" element={<FilterOrders />} />
      <Route path="/" element={<Menu />} />
    </Routes>   
    </Container>
  );
};
export default App;
