import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="container">
        <div className="nav-brand-wrap">
          <Link className="nav-brand" to="/">BookStore</Link>
          <span className="nav-credit">Veda Naik 38</span>
        </div>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/catalogue">Catalogue</Link>
          <Link className="nav-link" to="/cart">Cart</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link nav-register" to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;