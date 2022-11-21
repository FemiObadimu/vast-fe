import React, { useContext, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../context/Blog/blogContext";

const Home = () => {
  const blogContext = useContext(BlogContext);
  const { getAllBlog, blog, getBlog } = blogContext;

  useLayoutEffect(() => {
    getAllBlog();

    // eslint-disable-next-line
  }, []);

  const onCallSingleBlog = (post_id) => {
    getBlog(post_id);
  };
  return (
    <div>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Welcome to the Vastio Blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Where the world meets with to create opportunities unimaginable
              with brilliant minds.
            </p>
          </div>

          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500">
              Get the Best articles around your the World today.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
              <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                <Link
                  to="/create"
                  className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
                >
                  Create Blog
                </Link>
              </div>
            </form>
          </div>
          <div className="mt-12 flex flex-row justify-center items-center">
            {blog !== null ? (
              <div>
                {blog.blog.map((post) => (
                  <Link
                    to={`/view/${post._id}`}
                    onClick={() => onCallSingleBlog(post._id)}
                    key={post.title}
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover"
                        src={post.image_url}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <span className="block mt-2">
                          <p className="text-3xl  font-bold text-pink-500 ">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.desc}
                          </p>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <h1>Ooops !!No blogs Found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
