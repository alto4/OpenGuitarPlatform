import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LESSON_ERROR,
  ADD_LESSON,
  DELETE_LESSON,
} from './types';

// Get lessons
export const getLessons = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/lessons');

    dispatch({
      type: GET_LESSONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Get lesson
export const getLesson = (lessonId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/lessons/${lessonId}`);

    dispatch({
      type: GET_LESSON,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Add like
export const addLike = (lessonId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/lessons/like/${lessonId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { lessonId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Remove like
export const removeLike = (lessonId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/lessons/unlike/${lessonId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { lessonId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Delete lesson
export const deleteLesson = (lessonId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/lessons/${lessonId}`);

    dispatch({
      type: DELETE_LESSON,
      payload: lessonId,
    });

    dispatch(setAlert('Lesson successfully removed.', 'success'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Add lesson
export const addLesson = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/lessons', formData, config);

    dispatch({
      type: ADD_LESSON,
      payload: res.data,
    });

    dispatch(setAlert('Lesson successfully added.', 'success'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Add comment
export const addComment = (lessonId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/lessons/comment/${lessonId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment successfully added.', 'success'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (lessonId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/lessons/comment/${lessonId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment successfully removed.', 'success'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
