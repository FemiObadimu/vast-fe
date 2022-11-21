import React, { useReducer } from "react";
import BlogContext from "./blogContext";
import blogReducer from "./blogReducer";
import axios from "axios";

import {
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILED,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILED,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAILED,
} from "../types";
const BlogState = (props) => {
  const initialState = {
    blog: null,
    single: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);

  // RESET PASSWORD

  const createBlog = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.post(
        "https://vastblog.onrender.com/api/v1/blog/post",
        formData,
        config
      );
      dispatch({
        type: CREATE_BLOG_SUCCESS,
        payload: resp.data,
      });
    } catch (errors) {
      dispatch({
        type: CREATE_BLOG_FAILED,
        payload: errors.response,
      });
    }
  };

  const getBlog = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.get(
        `https://vastblog.onrender.com/api/v1/blog/${id}`,
        config
      );
      dispatch({
        type: GET_BLOG_SUCCESS,
        payload: resp.data,
      });
    } catch (errors) {
      dispatch({
        type: GET_BLOG_FAILED,
        payload: errors.response,
      });
    }
  };

  const getAllBlog = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.get(
        "https://vastblog.onrender.com/api/v1/blog/all",
        config
      );
      dispatch({
        type: GET_BLOGS_SUCCESS,
        payload: resp.data,
      });
    } catch (errors) {
      dispatch({
        type: GET_BLOGS_FAILED,
        payload: errors.response,
      });
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blog: state.blog,
        single: state.single,
        getBlog,
        createBlog,
        getAllBlog,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
