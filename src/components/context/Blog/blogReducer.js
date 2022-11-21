import {
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILED,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILED,
} from "../types";

const blogReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        blog: payload,
      };
    case GET_BLOGS_FAILED:
      return {
        ...state,
        blog: null,
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        single: payload,
      };
    case GET_BLOG_FAILED:
      return {
        ...state,
        single: null,
      };

    default:
      return state;
  }
};

export default blogReducer;
