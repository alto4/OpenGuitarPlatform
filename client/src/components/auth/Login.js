import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert('Email is required.', 'danger');
    }

    if (password === '') {
      setAlert('Password is required.', 'danger');
    }
    if (email !== '' && password !== '') {
      login(email, password);
    }
  };

  // Redirect upon successful login
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='login-section'>
      <h1>Sign In</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Sign Into Your Account
      </p>

      <form className='form' onSubmit={(e) => onSubmit(e)} autoComplete='false'>
        <div className='form-group'>
          <input type='text' placeholder='Email Address' name='email' value={email} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className='btn btn-submit'>Sign In</button>
      </form>
      <p>
        Not registered yet?{' '}
        <span className='text-gold'>
          <Link to='/register'>Come join us!</Link>
        </span>
      </p>
    </section>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
