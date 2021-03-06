import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>User Profiles</h1>
          <p className='lead'>Browse and connect with fellow guitar-lovers from around the world.</p>

          <div className='profiles section-container'>
            {profiles.length > 0 ? (
              profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              // profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
              <h4>No profiles were found.</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
