import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { Routes,Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';

const App: React.FC = () => {
  console.log("App renderer");
  return (<div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
    </Routes>   
    </div>

  );
};
export default App;
