import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top'>
      <img src={avatar} alt={`Avatar of ${name}`} />
      <h1>{name}</h1>
      <p className='lead'>{status}</p>
      <p>{location && <span>{location}</span>}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
