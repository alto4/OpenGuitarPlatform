import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect to dashboard if user is successfully registered and authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='register-section'>
      <h1>Register</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Create Your Account
      </p>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => onChange(e)} />
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password Confirm'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className='btn'>Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <span className='text-gold'>
          <Link to='/login'>Sign In</Link>.
        </span>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
