import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>
        <i className='fa fa-guitar fa-lg'></i> OpenGuitar{' '}
      </Link>

      <ul className='nav-links'>
        <li className='nav-item'>
          <Link to='/'>Lessons</Link>
        </li>
        <li className='nav-item'>
          <Link to='/register'>Register</Link>
        </li>
        <li className='nav-item btn-login'>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
