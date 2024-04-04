import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  faBarsStaggered,
  faUser,
  faUnlock,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import Auth from "../../Context/Auth";

import { Icon } from "react-icons-kit";

import { quill } from "react-icons-kit/icomoon/quill";

import Bars from "../../Components/Bars";

import Blog from "../../Components/Blog";

function Blogs() {
  const [openBars, setOpenBars] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const { token } = useContext(Auth);

  const [draft, setDraft] = useState([]);

  const [isBlogsOpen, setIsBlogsOpen] = useState(true);

  const [isDraftOpen, setIsDraftOpen] = useState(false);

  const closeBarHandler = () => {
    setOpenBars(false);
  };

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const response = await axios.get("https://blog-api-rsd8.onrender.com/user-blogs", {
          headers: { authorisation: "Bearer " + token },
        });

        setUserBlogs(response.data.blogs);
      } catch (err) {
        console.log("error geting the user blogs", err);
      }
    };

    getUserBlogs();
  }, [token]);

  useEffect(() => {
    const getUserDraftBlogs = async () => {
      try {
        const response = await axios.get("https://blog-api-rsd8.onrender.com/all-draft", {
          headers: { authorisation: "Bearer " + token },
        });

        setDraft(response.data.blogs);
      } catch (err) {
        console.log("error geting the user blogs", err);
      }
    };

    getUserDraftBlogs();
  }, [token]);

  const deleteDraftHandler = async (id) => {
    try {
      const response = await axios.post(
        `https://blog-api-rsd8.onrender.com/delete-draft/${id}`,
        {},
        { headers: { authorisation: "Bearer " + token } }
      );

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      {openBars === false && (
        <div className="px-4  md:hidden w-full">
          <div className="px-4 flex items-center  border-b border-light-gray w-full mb-5">
            <button
              className="mr-5 text-xl"
              onClick={() => {
                setOpenBars(true);
              }}
            >
              <FontAwesomeIcon icon={faBarsStaggered} />
            </button>
            <div className="relative">
              <button className="p-4">Blogs</button>
              <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
            </div>
          </div>

          <form class="mx-auto mb-5 w-full ">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                // type="search"
                id="default-search"
                class="block w-full px-5 py-3 ps-10 font-semibold focus:outline-white focus:outline-1 rounded-full  bg-light-gray"
                placeholder="Search"
                required
              />
            </div>
          </form>

          <div className="px-4 flex items-center  border-b border-light-gray w-full mb-5">
            <div className="relative">
              <button
                className="p-4"
                onClick={() => {
                  setIsBlogsOpen(true);
                  setIsDraftOpen(false);
                }}
              >
                Published Blogs
              </button>
              <div
                className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px] ${
                  isBlogsOpen ? "block" : "hidden"
                }`}
              ></div>
            </div>

            <div className="relative">
              <button
                className="p-4"
                onClick={() => {
                  setIsBlogsOpen(false);
                  setIsDraftOpen(true);
                }}
              >
                Drafts Blogs
              </button>
              <div
                className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px] ${
                  isDraftOpen ? "block" : "hidden"
                }`}
              ></div>
            </div>
          </div>

          {isBlogsOpen === true && (
            <div className="max-w-[600px]">
              {userBlogs !== undefined &&
                userBlogs.map((blog) => {
                  return (
                    <Blog
                      title={blog.title}
                      content={blog.content}
                      image={blog.image}
                      id={blog._id}
                      topic={blog.topic}
                      likes={blog.likes}
                      userImage={blog.userImage}
                      userName={blog.userName}
                      creatorName={blog.creatorName}
                      createdAt={blog.createdAt}
                    />
                  );
                })}
            </div>
          )}

          {isDraftOpen === true && (
            <div className="max-w-[600px]">
              {draft.map((draft, index) => {
                return (
                  <div className="flex gap-8 justify-start items-start border-b border-light-gray py-5">
                    <h1 className="text-[40px] text-light-gray text-center font-semibold flex-none items-start">
                      {index < 10 ? `0${index + 1}` : index + 1}
                    </h1>

                    <div>
                      <h3 className="mb-3 font-medium">{draft.title}</h3>
                      <p className="mb-3">{draft.content}</p>

                      <div>
                        <button className=" underline">Edit</button>
                        <button className="ml-5 text-red-600 underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {openBars === true && (
        <Bars isOpen={openBars} page="Blogs" close={closeBarHandler} />
      )}

      <React.Fragment>
        <div className=" gap-16 px-16 py-5 hidden md:flex  lg:px-20 xl:px-[100px] 2xl:px-[300px]">
          <div className="min-w-[200px]">
            <div className=" border-b border-light-gray w-full p-4 mb-6">
              <p>Dashboard</p>
            </div>

            <div className="mb-14 flex flex-col">
              <Link to="/dashboard/user-profile" className="p-4">
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                Profile
              </Link>
              <Link to="/dashboard/blogs" className="p-4">
                <FontAwesomeIcon icon={faFile} className="mr-4" />
                Blogs
              </Link>
              <Link to="/write" className="p-4">
                <Icon icon={quill} className="mr-4" />
                Write
              </Link>
            </div>

            <div className=" border-b border-light-gray w-full p-4 mb-6">
              <p>Setting</p>
            </div>

            <div className="flex flex-col">
              <Link to="/dashboard/edit-profile" className="p-4">
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                Edit Profile
              </Link>
              <Link to="/dashboard/change-password" className="p-4">
                <FontAwesomeIcon icon={faUnlock} className="mr-4" />
                Change Password
              </Link>
            </div>
          </div>

          <div className="w-full">
            <form class="mx-auto mb-5 w-full ">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-white "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  id="default-search"
                  class="block w-full px-5 py-3 ps-10 font-semibold  rounded-full  bg-light-gray"
                  placeholder="Search"
                  required
                />
              </div>
            </form>

            <div>
              <div className="px-4 flex items-center  border-b border-light-gray w-full mb-5">
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsBlogsOpen(true);
                      setIsDraftOpen(false);
                    }}
                    className="p-4"
                  >
                    Published Blogs
                  </button>
                  <div
                    className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px] ${
                      isBlogsOpen ? "block" : "hidden"
                    }`}
                  ></div>
                </div>

                <div className="relative">
                  <button
                    className="p-4"
                    onClick={() => {
                      setIsBlogsOpen(false);
                      setIsDraftOpen(true);
                    }}
                  >
                    Drafts Blogs
                  </button>
                  <div
                    className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px] ${
                      isDraftOpen ? "block" : "hidden"
                    }`}
                  ></div>
                </div>
              </div>

              {isBlogsOpen === true && (
                <div className="w-full">
                  {userBlogs.length === 0 && (
                    <div className="w-full p-4 rounded-xl bg-light-gray text-center">
                      Ther is no blogs
                    </div>
                  )}
                  {userBlogs !== undefined &&
                    userBlogs.map((blog) => {
                      return (
                        <Blog
                          title={blog.title}
                          content={blog.content}
                          image={blog.image}
                          id={blog._id}
                          topic={blog.topic}
                          likes={blog.likes}
                          userImage={blog.userImage}
                          userName={blog.userName}
                          creatorName={blog.creatorName}
                          createdAt={blog.createdAt}
                        />
                      );
                    })}
                </div>
              )}

              {isDraftOpen === true && (
                <div className="w-full">
                  {draft.length === 0 && (
                    <div className="w-full p-4 rounded-xl bg-light-gray text-center">
                      Ther is no draft blogs
                    </div>
                  )}

                  {draft.map((draft, index) => {
                    return (
                      <div className="flex gap-8 justify-start items-start border-b border-custom-gray py-5">
                        <h1 className="text-[40px] text-center font-semibold flex-none items-start text-custom-gray">
                          {index < 10 ? `0${index + 1}` : index + 1}
                        </h1>

                        <div>
                          <h3 className="mb-3 font-medium">{draft.title}</h3>
                          <p className="mb-3">{draft.content}</p>

                          <div>
                            <Link
                              to={`/draft-edit/${draft._id}`}
                              className=" underline"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => {
                                deleteDraftHandler(draft._id);
                              }}
                              className="ml-5 text-red-600 underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}

export default Blogs;
