import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <i className='fa fa-guitar'></i> OpenGuitar
      </h1>
      <ul className='nav-links'>
        <li>
          <Link to='/'>Lessons</Link>
        </li>
        <li>
          <Link href='/register'>Register</Link>
        </li>
        <li>
          <Link href='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
