import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link href='#' target='_blank'>
            <i className='fab fa-linkedin fa-2x'></i>
          </Link>
        )}
        {social && social.youtube && (
          <Link href='#' target='_blank'>
            <i className='fab fa-youtube fa-2x'></i>
          </Link>
        )}
        {social && social.facebook && (
          <Link href='#' target='_blank'>
            <i className='fab fa-facebook fa-2x'></i>
          </Link>
        )}
        {social && social.instagram && (
          <Link href='#' target='_blank'>
            <i className='fab fa-instagram fa-2x'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
