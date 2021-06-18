import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Welcome {user && user.name}
      </p>

      {profile && !loading ? (
        <>Has</>
      ) : (
        <>
          <p>You don't have a profile setup yet. Please add your information below.</p>
          <Link to='/create-profile' className='btn'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
