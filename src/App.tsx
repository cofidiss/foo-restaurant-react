import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/a" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
