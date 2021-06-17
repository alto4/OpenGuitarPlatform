import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get authenticated users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // Will use token to get current user's profile
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { message: error.response.statusText, state: error.response.status },
    });
  }
};
