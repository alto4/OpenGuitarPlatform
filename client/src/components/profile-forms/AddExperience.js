import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    position: '',
    organization: '',
    from: '',
    to: '',
    description: '',
  });

  const { position, organization, from, to, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <>
      <h1>Add Musical Experience</h1>
      <p>Please add any relevant experience working as a performer, instructor, arranger, or adjudicator.</p>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className='form-group'>
          <input type='text' placeholder='Position' name='position' value={position} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Organization'
            name='organization'
            value={organization}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='From' name='from' value={from} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='To' name='to' value={to} onChange={(e) => onChange(e)} />
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
