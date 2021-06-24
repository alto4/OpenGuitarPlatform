import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user, status, location, instrument, level, genres } }) => {
  return (
    <div className='profile'>
      <img src={user.avatar} alt='' />
      <div>{user.name}</div>
      <p>{status}</p>
      <p>{location && <span>{location}</span>}</p>
      <Link to={`/profile/${user._id}`} className='btn btn-submit'>
        View Profile
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
