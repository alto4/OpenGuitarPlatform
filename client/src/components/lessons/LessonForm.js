import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLesson } from '../../actions/lesson';

const LessonForm = ({ addLesson }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoURL, setVideoURL] = useState('');

  return (
    <div className='lesson-form section-container'>
      <div>
        <h2>New Lesson</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLesson({ title, description, videoURL });
          setTitle('');
          setDescription('');
          setVideoURL('');
        }}
      >
        <input type='text' placeholder='Lesson title' onChange={(e) => setTitle(e.target.value)} value={title} />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Add lesson description here...'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='text-area'
        />
        <input type='text' placeholder='Video URL' onChange={(e) => setVideoURL(e.target.value)} value={videoURL} />
        <button type='submit' className='btn'>
          Add Lesson
        </button>
      </form>
    </div>
  );
};

LessonForm.propTypes = {
  addLesson: PropTypes.func.isRequired,
};

export default connect(null, { addLesson })(LessonForm);
