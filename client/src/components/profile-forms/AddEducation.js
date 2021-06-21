import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    credential: '',
    field: '',
    from: '',
    to: '',
    description: '',
  });

  const { school, credential, field, from, to, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <>
      <h1>Add Education</h1>
      <p>Please add your education details below.</p>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className='form-group'>
          <input type='text' placeholder='School' name='school' value={school} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Credential'
            name='credential'
            value={credential}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Field of Study' name='field' value={field} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input type='date' placeholder='From' name='from' value={from} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input type='date' placeholder='To' name='to' value={to} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className='btn' type='submit'>
          Add
        </button>
        <Link to='/dashboard' className='btn'>
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
