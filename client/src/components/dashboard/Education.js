import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = ({ education }) => {
  const educationEntries = education.map((entry) => (
    <tr key={entry._id}>
      <td>{entry.school}</td>
      <td>{entry.credential}</td>
      <td>{entry.field}</td>
      <td>
        <Moment format='YYYY'>{entry.from}</Moment> - <Moment format='YYYY'>{entry.to}</Moment>
      </td>
      <td>
        <button className='btn'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2>Education</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th>Credential</th>
            <th>Field of Study</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educationEntries}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
