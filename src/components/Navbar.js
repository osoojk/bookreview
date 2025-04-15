import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{maxWidth: "100", padding: "1rem", margin:"0"}}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Book List</Link></li>
        <li><Link to="/AddReview">Add Review</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
