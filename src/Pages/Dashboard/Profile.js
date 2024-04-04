import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Helmet } from "react-helmet";
import Blog from "../../Components/Blog";

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

function Profile() {
  const [openBars, setOpenBars] = useState(false);

  const [userBlogs, setUserBlogs] = useState([]);

  const [userInfo, setUserInfo] = useState([]);

  const { userId } = useContext(Auth);

  const closeBarHandler = () => {
    setOpenBars(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/user-information/${userId}`
        );

        setUserBlogs(response.data.user.blogs);
        setUserInfo(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [userId]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{userInfo && userInfo.name}</title>
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
              <button className="p-4">Profile</button>
              <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
            </div>
          </div>

          <div className="w-full h-full px-6 mb-8 flex items-center flex-col justify-center">
            <img
              src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
              alt="user"
              className="w-[120px] h-[120px] rounded-full mb-3"
            />

            <h1 className="font-bold text-2xl">
              @
              {userInfo && userInfo.userName !== undefined
                ? userInfo.userName
                : userInfo && userInfo.email
                ? `${userInfo.email.split("@")[0]}`
                : ""}
            </h1>

            <p className="mt-3">{userInfo.name}</p>

            <p className="mt-3">{userBlogs.length} Blogs</p>
          </div>

          <div>
            <React.Fragment>
              {userBlogs !== undefined &&
                userBlogs.map((blog) => {
                  return (
                    <Blog
                      title={blog.title}
                      content={blog.contant}
                      image={blog.image}
                      id={blog.id}
                      topic={blog.topic}
                      likes={blog.likes}
                      userImage={userInfo.profileImage}
                      userName={blog.userName}
                      creatorName={blog.creatorName}
                      createdAt={blog.createdAt}
                    />
                  );
                })}
            </React.Fragment>
          </div>
        </div>
      )}

      {openBars === true && (
        <Bars isOpen={openBars} page="Blogs" close={closeBarHandler} />
      )}

      <div className=" gap-16 px-16 py-5 w-full  hidden md:flex  lg:px-20 xl:px-[100px] 2xl:px-[300px]">
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

        <div className="w-full flex md:flex-col-reverse xl:flex-row items-start gap-20">
          <div className="w-full">
            <div className="px-4 flex items-center  border-b border-light-gray w-full mb-5">
              <div className="relative">
                <button className="p-4">Published Blogs</button>
                <div
                  className={`w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]`}
                ></div>
              </div>
            </div>

            {userBlogs.length === 0 && (
              <div className="w-full p-4 rounded-xl bg-light-gray text-center">
                Ther is no blogs
              </div>
            )}

            <div>
              {userBlogs !== undefined &&
                userBlogs.map((blog) => {
                  return (
                    <Blog
                      title={blog.title}
                      content={blog.content}
                      image={blog.image}
                      id={blog.id}
                      topic={blog.topic}
                      likes={blog.likes}
                      userImage={userInfo.profileImage}
                      userName={blog.userName}
                      creatorName={blog.creatorName}
                      createdAt={blog.createdAt}
                    />
                  );
                })}
            </div>
          </div>

          <div className="w-full max-w-[300px] xl:max-w-[300px] xl:block md:flex md:flex-col md:items-center md:justify-center md:w-full md:max-w-full md:border-none xl:border xl:border-l xl:border-light-gray h-full px-6">
            <img
              src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
              alt="user"
              className="w-[120px] h-[120px] rounded-full mb-3"
            />

            <h1 className="font-bold text-2xl">
              @
              {userInfo && userInfo.userName !== undefined
                ? userInfo.userName
                : userInfo && userInfo.email
                ? `${userInfo.email.split("@")[0]}`
                : ""}
            </h1>

            <p className="mt-3">{userInfo.name}</p>

            <p className="mt-3">{userBlogs.length} Blogs</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
