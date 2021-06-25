import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education: { credential, field, school, from, to, description } }) => {
  return (
    <div>
      <h3>
        {credential} in {field} - {school}
      </h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - <Moment format='YYYY/MM/DD'>{to}</Moment>
      </p>
      <p>{description}</p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
