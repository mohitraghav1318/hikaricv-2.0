import React from 'react';
import '../style/ui/navbar.scss';
import { Link } from 'react-router';

const Navbar = () => {  
  return (  
    <nav className="navbar">
      <div className="navbar-container">  
        <div className="navbar-logo">
          <h1 className='logo'><a href="/">HikariCV</a></h1>
        </div>
        <ul className="navbar-links ">
          <li><a href="/login">Login</a></li>
          <li><a href="/register" className='button primary-button'>Register</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

{/* <Link to={"/register"} >Register</Link> */}