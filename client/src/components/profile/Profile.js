import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn'>
              Edit Profile
            </Link>
          )}
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />

          <div className='profile-experiences'>
            <h2>Experience</h2>
            {profile.experience.length > 0 ? (
              <>
                {profile.experience.map((experience) => (
                  <ProfileExperience key={experience._id} experience={experience} />
                ))}{' '}
              </>
            ) : (
              <h4>No Experiences Added</h4>
            )}
          </div>

          <div className='profile-education'>
            <h2>Education</h2>
            {profile.education.length > 0 ? (
              <>
                {profile.education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))}{' '}
              </>
            ) : (
              <h4>No Experiences Added</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
