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

const App: React.FC = () => {
  console.log("App renderer");
  return (<div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Menu />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/FilterOrders" element={<FilterOrders />} />
    </Routes>   
    </div>

  );
};
export default App;
