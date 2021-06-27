import {
  GET_LESSONS,
  GET_LESSON,
  LESSON_ERROR,
  UPDATE_LIKES,
  ADD_LESSON,
  DELETE_LESSON,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
  error: {},
};

export default function lesson(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: payload,
        loading: false,
      };
    case GET_LESSON:
      return {
        ...state,
        lesson: payload,
        loading: false,
      };
    case ADD_LESSON:
      return {
        ...state,
        lessons: [...state.lessons, payload],
        loading: false,
      };
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => lesson._id !== payload),
        loading: false,
      };
    case LESSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        lessons: state.lessons.map((lesson) =>
          lesson._id === payload.lessonId ? { ...lesson, likes: payload.likes } : lesson
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        lesson: { ...state.lesson, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        lesson: {
          ...state.lesson,
          comments: state.lesson.comments.filter((comment) => comment._id !== payload),
        },
        loading: false,
      };
    default:
      return { ...state };
  }
}
