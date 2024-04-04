import React from "react";

import { Link } from "react-router-dom";

function Trending_Blog(props) {
  return (
    <Link
      to={`/blog/${props.id}`}
      className="flex items-start gap-5 mb-5 w-fit"
    >
      <h1 className="text-[40px] font-bold text-custom-gray ">{`0${
        props.num + 1
      }`}</h1>
      <div>
        <div className="flex items-center mb-5">
          <img
            src={`https://blog-api-rsd8.onrender.com/${props.userImage}`}
            alt="profile"
            className="w-[30px] h-[30px] rounded-full mr-3"
          ></img>

          <p className="sm:mr-3">{props.creatorName}</p>
        </div>
        <h3 className="mb-5 font-medium">
          {props.content !== undefined && props.content.split(" ").length > 10
            ? `${props.content.split(" ").slice(0, 10).join(" ")} ...`
            : props.content}
        </h3>
      </div>
    </Link>
  );
}

export default Trending_Blog;
