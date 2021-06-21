import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {
  const experiences = experience.map((experience) => (
    <tr key={experience._id}>
      <td>{experience.position}</td>
      <td>{experience.organization}</td>
      <td>
        <Moment format='YYYY'>{experience.from}</Moment> - <Moment format='YYYY'>{experience.to}</Moment>
      </td>
      <td>
        <button className='btn'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
