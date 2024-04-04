import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

import Auth from "../Context/Auth";

import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function Blog(props) {
  const { token } = useContext(Auth);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const isLiked = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/is-user-liked-theBlog/${props.id}`,

          {
            headers: {
              authorisation: "Bearer " + token,
            },
          }
        );

        console.log(response.data.like);

        if (response.data.like !== undefined) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    isLiked();
  }, [props.id, token]);

  return (
    <Link
      to={`/blog/${props.id}`}
      className="flex justify-between w-full items-center mb-5 border-b border-custom-gray  py-5"
    >
      <div>
        <div className="flex items-center mb-5">
          <img
            src={`https://blog-api-rsd8.onrender.com/${props.userImage}`}
            alt="profile"
            className="w-[30px] h-[30px] rounded-full mr-3"
          ></img>

          <p className="sm:mr-3">{props.creatorName}</p>
          <p className="hidden sm:mr-3 lg:block">@{props.userName}</p>
          <p className="hidden  lg:block">{props.createdAt}</p>
        </div>

        <h3 className="mb-5 font-semibold">{props.title}</h3>
        <p className="hidden mb-5 lg:block max-w-[550px] md:max-w-[300px]">
          {props.content !== undefined && props.content.split(" ").length > 10
            ? `${props.content.split(" ").slice(0, 10).join(" ")} ...`
            : props.content}
        </p>

        <div>
          <button className="mr-8 bg-light-gray px-4 py-1 rounded-full">
            {props.topic}
          </button>
          <button
            className={`p-2 px-3 w-fit mr-5 rounded-full   ${
              isLiked ? "bg-red-600" : "bg-light-gray"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} className="mr-1" /> {props.likes}
          </button>
        </div>
      </div>

      <div>
        <img
          src={`https://blog-api-rsd8.onrender.com/${props.image}`}
          className="w-[100px] h-[100px] rounded-md"
          alt="test"
        ></img>
      </div>
    </Link>
  );
}

export default Blog;
