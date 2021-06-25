import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
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
      <div className='icons'>
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
