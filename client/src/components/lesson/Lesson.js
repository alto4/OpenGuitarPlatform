import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import LessonItem from '../lessons/LessonItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getLesson } from '../../actions/lesson';

const Lesson = ({ getLesson, auth, lesson: { lesson, loading }, match }) => {
  useEffect(() => {
    getLesson(match.params.id);
  }, [getLesson, match.params.id]);

  return loading || lesson === null ? (
    <Spinner />
  ) : (
    <>
      <Link to='/lessons'>Back to Lessons</Link>
      <LessonItem lesson={lesson} showActions={false} />
      {auth.isAuthenticated && (
        <>
          <CommentForm lessonId={lesson._id} />
          <div className='comments'>
            {lesson.comments.map((comment) => (
              <CommentItem key={comment._id} lessonId={lesson._id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

Lesson.propTypes = {
  getLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lesson: state.lesson,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLesson })(Lesson);
