import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Go to Login</Link>
      <a href="/login"> aa</a>
    </div>
  );
};

export default Home;
