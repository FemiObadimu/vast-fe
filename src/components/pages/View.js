import React, { useContext, useLayoutEffect } from "react";
import BlogContext from "../context/Blog/blogContext";
import { useParams, Link } from "react-router-dom";

const View = () => {
  const params = useParams();
  const blogContext = useContext(BlogContext);
  const { getBlog, single } = blogContext;
  //   console.log(params.id);

  useLayoutEffect(() => {
    getBlog(params.id);
    // eslint-disable-next-line
  }, [params.id]);
  return (
    <div className="justify-center items-center flex flex-col">
      {single !== null ? (
        <div>
          {/* image */}
          <div className="text-center">
            <img
              src={single.image_url}
              className="h-50 w-50 rounded-md"
              alt="Vastio"
            />
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">Title</span>
            </div>
          </div>
          {/* Title */}
          <div className="text-center">
            <h1 className="font-bolder text-4xl  text-pink-600">
              {single.title}
            </h1>
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-lg bg-white text-sm text-gray-500">
                {single.desc}
              </span>
            </div>
          </div>
          {/* Body */}
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h1>Ooops !!No blogs Found</h1>
          </div>
        </div>
      )}

      <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
        <Link
          to="/"
          className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default View;
