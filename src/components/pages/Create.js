import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogContext from "../context/Blog/blogContext";
import { useSnackbar } from "react-simple-snackbar";

const Create = () => {
  const history = useNavigate();
  const blogContext = useContext(BlogContext);
  const { createBlog } = blogContext;
  const options = {
    position: "top-center",
    style: {
      backgroundColor: "white",
      border: "2px solid white",
      color: "green",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "5px",
      textAlign: "center",
    },
    closeStyle: {
      color: "green",
      fontSize: "16px",
    },
  };

  const [image, setImage] = useState();
  const [page, setPage] = useState(false);
  const [pages, setPages] = useState(true);

  const [imageUrl, setImageUrl] = useState(null);
  const [openSnackbar] = useSnackbar(options);

  const [products, setProducts] = useState({
    title: "",
    desc: "",
    image_url: `${imageUrl}`,
  });

  const onRemove = (e) => {
    e.preventDefault();

    setImage(null);
  };

  const onCloudinary = (e) => {
    e.preventDefault();

    if (!image) {
      return openSnackbar("Select An Image, with png,jpg format", 2000);
    }

    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_KEY}`);
    formData.append("cloud_name", "devscripts");
    fetch("https://api.cloudinary.com/v1_1/devscripts/image/upload", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setImageUrl(result.url);
        setPage(true);
        setPages(false);

        return openSnackbar("Image Upload Successful", 2000);
      })
      .catch((err) => {
        return openSnackbar(`${err.response}`, 2000);
      });
  };

  const { title, desc } = products;

  const onChange = (e) =>
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });

  const onDatabase = (e) => {
    e.preventDefault();

    const finalProducts = {
      ...products,
      image_url: imageUrl,
    };

    if (title === "" || desc === "") {
      return openSnackbar("Kindly Fill All Fields!", 2000);
    } else {
      console.log(finalProducts);

      createBlog(finalProducts);

      openSnackbar("Blog Created", 2000);
      history("/");
      setPage(false);
      setPages(true);

      setImage(null);
      setProducts({
        title: "",
        desc: "",
        image_url: `${imageUrl}`,
      });
    }
  };

  return (
    <div>
      <>
        <div className="px-2 py-4">
          <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="md:col-span-1 py-4">
              <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                <Link
                  to="/"
                  className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
                >
                  Back
                </Link>
              </div>
              <div className="px-4 py-4 sm:px-0">
                <h3 className="text-xl font-bold leading-6 text-gray-900">
                  Create Your Blog with Vastio
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  {pages && (
                    <div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex  items-center">
                          <span className="inline-block h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                            {image ? (
                              <img src={image.blog} alt="Vastio" />
                            ) : (
                              <svg
                                className="mx-auto h-20 w-20 text-gray-300"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={onRemove}
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cover photo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <div>
                              <div>
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span className="font-bold text-lg">
                                      Pick a Cover Photo
                                    </span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        setImage({
                                          file: e.target.files[0],
                                          blog: URL.createObjectURL(
                                            e.target.files[0]
                                          ),
                                        });

                                        console.log(e.target.files[0]);
                                      }}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="submit"
                              onClick={onCloudinary}
                              className="w-full bg-indigo-600 -ml-3 px-2 py-1 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
                            >
                              Upload Image
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {page && (
                    <div>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              value={title}
                              onChange={onChange}
                              type="text"
                              name="title"
                              className="focus:ring-indigo-500 outline-none p-3 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                              placeholder="Blog Title"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="body"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Blog Body
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="body"
                            name="desc"
                            value={desc}
                            onChange={onChange}
                            rows={3}
                            className="shadow-sm outline-none px-2 py-3 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Tell the world something, We are Listening...."
                            defaultValue={""}
                          />
                        </div>
                      </div>

                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          onClick={onDatabase}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </>
    </div>
  );
};

export default Create;
