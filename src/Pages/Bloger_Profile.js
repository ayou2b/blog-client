import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";

import Blog from "../Components/Blog";

function Bloger_Profile() {
  const { userId } = useParams();
  const [userBlogs, setUserBlogs] = useState([]);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/user-blogs/${userId}`
        );

        setUserBlogs(response.data.blogs);
      } catch (err) {
        console.log(err);
      }
    };

    getUserBlogs();
  }, [userId]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/user-information/${userId}`
        );

        setUserInfo(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [userId]);

  return (
    <div className="w-full flex  justify-between gap-24 flex-col-reverse items-center md:flex-row md:items-start  px-4   sm:p-8   md:px-10   lg:px-20  xl:px-28  2xl:px-64">
      <Helmet>
        <title>{userInfo && `@${userInfo.userName}`}</title>
      </Helmet>
      <div className="w-full md:w-[60%]">
        {userBlogs.map((blog) => {
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
      </div>

      <div className="w-full flex flex-col items-center justify-center md:items-start md:justify-start md:w-[30%]">
        <img
          src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
          alt="user"
          className="w-[150px] h-[150px] rounded-full"
        ></img>

        <h3 className="mt-4 capitalize font-medium">{userInfo.name}</h3>
        <p className="mt-4">{userBlogs.length} Blogs</p>
        <p className="mt-4">Joined on {userInfo.joinedAt}</p>
      </div>
    </div>
  );
}

export default Bloger_Profile;
