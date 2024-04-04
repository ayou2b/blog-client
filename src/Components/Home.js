import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Blog from "./Blog";
import TrendingBlog from "./Trending_Blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [isBlogsOpen, setIsBlogsOpen] = useState(true);
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  const blogTopics = [
    "technology",
    "travel",
    "health",
    "food",
    "fashion",
    "business",
    "education",
    "sports",
    "books",
    "arts-culture",
    "science",
    "parenting",
    "lifestyle",
    "personal-development",
    "entertainment",
  ];

  const [search, setSearch] = useState("");

  const navigateTo = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    navigateTo(`/find/${search}`);
  };

  const openBlogsHandler = () => {
    setIsBlogsOpen(true);
    setIsTrendingOpen(false);
  };

  const openTrendingHandler = () => {
    setIsBlogsOpen(false);
    setIsTrendingOpen(true);
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("https://blog-api-rsd8.onrender.com/get-all-blogs");

        setBlogs(response.data.blogs);
      } catch (err) {
        console.log(
          "error geting the blogs from front-end in the home page",
          err
        );
      }
    };

    getBlogs();
  }, []);

  useEffect(() => {
    const getTrendingBlogs = async () => {
      try {
        const response = await axios.get(
          "https://blog-api-rsd8.onrender.com/trending-blogs"
        );

        setTrendingBlogs(response.data.blogs);
      } catch (err) {
        console.log(
          "error geting the blogs from front-end in the home page",
          err
        );
      }
    };

    getTrendingBlogs();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>BLOGI</title>
      </Helmet>
      <div className="md:hidden">
        <form onSubmit={searchHandler} class="mx-auto w-full mt-4 px-4">
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
              class="block w-full px-5 py-3 ps-10 font-semibold outline-none  rounded-full appearance-none  bg-light-gray"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              required
            />
          </div>
        </form>
        <div className="px-4 mb-5 ">
          <div className="flex w-full flex-wrap border-b border-light-gray">
            <div className="relative">
              <button className="p-4" onClick={openBlogsHandler}>
                Home
              </button>
              <div
                className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px] ${
                  isBlogsOpen ? "block" : "hidden"
                }`}
              ></div>
            </div>
            <div className="relative">
              <button className="p-4" onClick={openTrendingHandler}>
                Trending Blog
              </button>
              <div
                className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px] ${
                  isTrendingOpen ? "block" : "hidden"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="px-4">
          {isBlogsOpen && (
            <React.Fragment>
              {blogs.map((blog) => {
                return (
                  <Blog
                    title={blog.title}
                    content={blog.contant}
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
            </React.Fragment>
          )}

          {isTrendingOpen && (
            <React.Fragment>
              {trendingBlogs.map((blog, index) => {
                return (
                  <TrendingBlog
                    id={blog._id}
                    content={blog.content}
                    num={index}
                    userImage={blog.userImage}
                    userName={blog.userName}
                    creatorName={blog.creatorName}
                  />
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>

      <div className="hidden md:flex px-8 py-8 w-full items-start justify-between gap-16  md:px-10  lg:px-20 xl:px-28 2xl:px-64">
        <div className="w-full">
          <div className="flex w-full flex-wrap border-b border-custom-gray  mb-5">
            <div className="relative">
              <button className="p-4">Home</button>
              <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
            </div>
          </div>

          <div>
            {blogs.map((blog) => {
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
        </div>

        <div className="w-full max-w-[400px] pl-4">
          <React.Fragment>
            <div className="mb-10">
              <h3 className="mb-5 font-semibold">Stories from all interest</h3>
              <div className="flex flex-wrap w-full gap-3">
                {blogTopics.map((item) => {
                  return (
                    <Link
                      to={`/blogs-by-topic/${item}`}
                      className="px-6 py-2 text-white hidden md:block bg-light-gray rounded-3xl"
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>

            <h3 className="mb-5 font-semibold">
              Trending <FontAwesomeIcon icon={faArrowTrendUp} />
            </h3>
            {trendingBlogs.map((blog, index) => {
              return (
                <TrendingBlog
                  id={blog._id}
                  content={blog.content}
                  num={index}
                  userImage={blog.userImage}
                  userName={blog.userName}
                  creatorName={blog.creatorName}
                />
              );
            })}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
