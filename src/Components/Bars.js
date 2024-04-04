import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faUser,
  faUnlock,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "react-icons-kit";

import { quill } from "react-icons-kit/icomoon/quill";

function Bars(props) {
  return (
    <div
      className={`px-4   md:hidden w-full h-[90vh] ${
        props.isOpen ? "block" : "hidden"
      }`}
    >
      {/* <div className="px-4 flex items-center  border-b border-light-gray w-full">
        <div className="relative">
          <button className=" p-4 text-xl">
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
          <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
        </div>
      </div> */}

      <div className="px-4 flex items-center  border-b border-light-gray w-full mb-10">
        <button className="mr-5 text-xl">
          <FontAwesomeIcon icon={faBarsStaggered} />
        </button>
        <div className="relative">
          <button
            className="p-4"
            onClick={() => {
              props.close();
            }}
          >
            {props.page}
          </button>
          <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
        </div>
      </div>

      <div className="mb-14 flex flex-col">
        <Link to="/dashboard/user-profile" className="p-4">
          <FontAwesomeIcon icon={faUser} className="mr-4" />
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="p-4">
          <FontAwesomeIcon icon={faFile} className="mr-4" />
          {/* <Icon icon={fileText2} className="mr-4" /> */}
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
  );
}

export default Bars;
