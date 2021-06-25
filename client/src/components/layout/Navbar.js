import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
      <li className='nav-item'>
        <Link to='/dashboard'>Home</Link>
      </li>
      <li className='nav-item'>
        <Link to='/'>Lessons</Link>
      </li>
      <li className='nav-item'>
        <Link to='/profiles'>Profiles</Link>
      </li>
      <li className='nav-item'>
        <Link to='/posts'>Posts</Link>
      </li>
      <li className='nav-item btn-logout'>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className='nav-item'>
        <Link to='/'>Lessons</Link>
      </li>
      <li className='nav-item'>
        <Link to='/profiles'>Profiles</Link>
      </li>
      <li className='nav-item'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='nav-item btn-login'>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>
        <i className='fa fa-guitar fa-lg'></i> OpenGuitar{' '}
      </Link>
      <ul className='nav-links'>{!loading && <>{isAuthenticated ? authLinks : guestLinks} </>}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
