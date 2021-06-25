import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    genres,
    instrument,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about'>
      {bio && (
        <>
          <h2>{name.split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </>
      )}
      {genres && (
        <>
          <h2>{name.split(' ')[0]}'s Genres</h2>
          {genres.map((genre, index) => (
            <div key={index}>
              <i className='fa fa-music' /> {genre}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
