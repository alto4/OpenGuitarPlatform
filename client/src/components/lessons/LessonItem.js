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
  lesson: { _id, title, description, videoURL, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className='lesson'>
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt={name} className='round' />
        </Link>
        <h4>{name}</h4>
      </div>
      <div>
        <h2>{title}</h2>
        <ReactPlayer url={videoURL} title={`Lesson #${_id}`} />
        <p>{description}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD' />
        </p>
        <Link to={`/lessons/${_id}`}>View Lesson </Link>
      </div>
    </div>
  );
};

LessonItem.defaultProps = {
  showActions: true,
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
