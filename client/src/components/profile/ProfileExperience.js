import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience: { position, organization, from, to, description } }) => {
  return (
    <div>
      <h3>
        {position} - {organization}
      </h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - <Moment format='YYYY/MM/DD'>{to}</Moment>
      </p>
      <p>{description}</p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
