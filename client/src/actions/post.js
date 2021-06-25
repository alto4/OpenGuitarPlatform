import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, UPDATE_LIKES, POST_ERROR } from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Add likes
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
