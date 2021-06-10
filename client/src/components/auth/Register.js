import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  return (
    <Fragment>
      <h1>Register</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Create Your Account
      </p>

      <form className='form'>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Email Address' name='email' required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' name='password' required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password Confirm' name='passwordConfirm' required />
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
