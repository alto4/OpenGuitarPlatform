import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteLesson } from '../../actions/lesson';

const LessonItem = ({
  addLike,
  removeLike,
  deleteLesson,
  auth,
  lesson,
  lesson: { _id, title, description, videoURL, name, avatar, user, likes, comments, date },
  showActions,
  showVideo,
}) => {
  return (
    <div className='lesson-card'>
      <div className='lesson-card-header'>
        <h4>{name}</h4>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt={name} className='round avatar-sm' />
        </Link>
      </div>
      <div>
        <h2>{title}</h2>
        {showVideo && <ReactPlayer url={videoURL} title={`Lesson #${_id}`} />}
        <p>{description}</p>
        <p className='lesson-date'>
          Posted on <Moment className='lesson-date' format='YYYY/MM/DD' />
        </p>
      </div>
      <Link to={`/lessons/${_id}`} className='btn'>
        View Lesson{' '}
      </Link>
    </div>
  );
};

LessonItem.defaultProps = {
  showActions: true,
  showVideo: false,
};

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deleteLesson })(LessonItem);
