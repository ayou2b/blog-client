import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Blog from "../Components/Blog";
import TrendingBlog from "../Components/Trending_Blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

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

function Blog_By_Topic() {
  const [isBlogsOpen, setIsBlogsOpen] = useState(true);
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  const { topic } = useParams();

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
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/blogs-by-topic/${topic}`
        );

        setBlogs(response.data.blogs);
      } catch (err) {
        console.log(
          "error geting the blogs from front-end in the home page",
          err
        );
      }
    };

    getBlogs();
  }, [topic]);

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
        <title>{topic}</title>
      </Helmet>
      <div className="md:hidden">
        <div className="px-4 mb-5">
          <div className="flex w-full flex-wrap border-b border-light-gray">
            <div className="relative">
              <button className="p-4" onClick={openBlogsHandler}>
                {topic}
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
              {blogs.length === 0 && (
                <div className="w-full p-4 rounded-xl bg-light-gray text-center">
                  Ther is no blogs found
                </div>
              )}

              {blogs.map((blog) => {
                return (
                  <Blog
                    title={blog.title}
                    content={blog.contant}
                    image={blog.image}
                    id={blog._id}
                    topic={topic}
                    likes={blog.likes}
                    userName={blog.userName}
                    creatorName={blog.creatorName}
                    createdAt={blog.createdAt}
                    userImage={blog.userImage}
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
          <div className="flex w-full flex-wrap border-b border-light-gray mb-5">
            <div className="relative">
              <button className="p-4"> {topic}</button>
              <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
            </div>
          </div>

          <div>
            {blogs.length === 0 && (
              <div className="w-full p-4 rounded-xl bg-light-gray text-center">
                Ther is no blogs found
              </div>
            )}
            {blogs.map((blog) => {
              return (
                <Blog
                  title={blog.title}
                  content={blog.contant}
                  image={blog.image}
                  id={blog._id}
                  topic={topic}
                  likes={blog.likes}
                  userName={blog.userName}
                  creatorName={blog.creatorName}
                  createdAt={blog.createdAt}
                  userImage={blog.userImage}
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

export default Blog_By_Topic;
