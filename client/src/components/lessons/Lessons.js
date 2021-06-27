import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LessonForm from './LessonForm';
import LessonItem from './LessonItem';
import Spinner from '../layout/Spinner';
import { getLessons } from '../../actions/lesson';

const Lessons = ({ getLessons, lesson: { lessons, loading }, auth }) => {
  useEffect(() => {
    getLessons();
  }, [getLessons]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1>Lessons</h1>
      <p className='lead'>Check out a few of our most popular courses.</p>
      {auth.isAuthenticated && auth.user.email === 'scottaltonmusic@gmail.com' && <LessonForm />}
      <div className='lessons section-container'>
        {lessons.map((lesson) => (
          <LessonItem key={lesson._id} id={lesson._id} lesson={lesson} />
        ))}
      </div>
    </>
  );
};

Lessons.propTypes = {
  getLessons: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lesson: state.lesson,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLessons })(Lessons);
