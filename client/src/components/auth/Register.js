import React, { Fragment, useState } from 'react';

const Register = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <h1>Register</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Create Your Account
      </p>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => onChange(e)} required />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password Confirm'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button className='btn btn-submit'>Register</button>
      </form>
    </Fragment>
  );
};

export default Register;
