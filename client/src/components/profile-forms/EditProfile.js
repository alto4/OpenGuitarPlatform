import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  const [formData, setFormData] = useState({
    instrument: '',
    level: '',
    location: '',
    status: '',
    bio: '',
    genres: [],
    years: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      instrument: loading || !profile.instrument ? '' : profile.instrument,
      level: loading || !profile.level ? '' : profile.level,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      bio: loading || !profile.bio ? '' : profile.bio,
      genres: loading || !profile.genres ? '' : profile.genres.join(', '),
      years: loading || !profile.years ? '' : profile.years,
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
      instagram: loading || !profile.instagram ? '' : profile.instagram,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentProfile]);

  const { instrument, level, location, status, bio, genres, years, youtube, twitter, facebook, linkedin, instagram } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <>
      <h1>Create Your Profile</h1>
      <p className='lead'>Add information to your profile using the form below.</p>
      <form action='' className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='instrument' value={instrument} onChange={(e) => onChange(e)}>
            <option value='0'>Select Primary Instrument</option>
            <option value='guitar'>Guitar</option>
            <option value='bass'>Bass Guitar</option>
            <option value='ukulele'>Ukulele</option>
            <option value='piano'>Piano</option>
          </select>
        </div>
        <div className='form-group'>
          <select name='level' value={level} onChange={(e) => onChange(e)}>
            <option value='0'>Select Skill Level</option>
            <option value='beginner'>Beginner</option>
            <option value='early-intermediate'>Early Intermediate</option>
            <option value='late-intermediate'>Late Intermediate</option>
            <option value='advanced'>Advanced</option>
            <option value='professional'>Professional</option>
          </select>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Location' name='location' value={location} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Status' name='status' value={status} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <textarea placeholder='Biography' name='bio' value={bio} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Favourite Genres'
            name='genres'
            value={genres}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Years of playing experience'
            name='years'
            value={years}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSocialInputs(!displaySocialInputs);
            }}
            className='btn'
          >
            Add Social Links
          </button>
        </div>

        {displaySocialInputs && (
          <>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Youtube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </>
        )}

        <button className='btn' type='submit'>
          Add
        </button>
        <Link to='/dashboard' className='btn'>
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
