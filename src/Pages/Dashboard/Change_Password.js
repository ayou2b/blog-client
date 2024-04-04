import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  faBarsStaggered,
  faUser,
  faUnlock,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import Auth from "../../Context/Auth";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/icomoon/eye";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import { quill } from "react-icons-kit/icomoon/quill";

import Bars from "../../Components/Bars";

function Change_Password() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordTypeSecond, setPasswordTypeSeond] = useState("password");
  const [openBars, setOpenBars] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigateTo = useNavigate();

  const { token } = useContext(Auth);

  const closeBarHandler = () => {
    setOpenBars(false);
  };

  const changePasswordHandler = async () => {
    try {
      const response = await axios.post(
        "https://blog-api-rsd8.onrender.com/change-password",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: { authorisation: "Bearer " + token },
        }
      );

      console.log(response);
      navigateTo("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      {openBars === false && (
        <div className="px-4  md:px-10 md:hidden w-full">
          <div className="px-4 flex items-center  border-b border-light-gray w-full mb-10">
            <button
              className="mr-5 text-xl"
              onClick={() => {
                setOpenBars(true);
              }}
            >
              <FontAwesomeIcon icon={faBarsStaggered} />
            </button>
            <div className="relative">
              <button className="p-4">Change Password</button>
              <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
            </div>
          </div>

          <div>
            <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
              <FontAwesomeIcon icon={faUnlock} className="mr-4" />
              <input
                placeholder="Currenet Password"
                type={passwordType}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                className="w-full bg-transparent focus:outline-none"
              />
              {passwordType === "text" && (
                <Icon
                  icon={eye}
                  className="mr-4"
                  onClick={() => {
                    setPasswordType("password");
                  }}
                />
              )}

              {passwordType === "password" && (
                <Icon
                  icon={eyeBlocked}
                  className="mr-4"
                  onClick={() => {
                    setPasswordType("text");
                  }}
                />
              )}
            </div>

            <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
              <FontAwesomeIcon icon={faUnlock} className="mr-4" />
              <input
                placeholder="New Password"
                type={passwordTypeSecond}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="w-full bg-transparent focus:outline-none"
              />
              {passwordTypeSecond === "text" && (
                <Icon
                  icon={eye}
                  className="mr-4"
                  onClick={() => {
                    setPasswordTypeSeond("password");
                  }}
                />
              )}

              {passwordTypeSecond === "password" && (
                <Icon
                  icon={eyeBlocked}
                  className="mr-4"
                  onClick={() => {
                    setPasswordTypeSeond("text");
                  }}
                />
              )}
            </div>

            <button
              onClick={changePasswordHandler}
              className=" px-10 py-3 text-black bg-white rounded-full font-semibold mb-8"
            >
              Change Password
            </button>
          </div>
        </div>
      )}

      {openBars === true && (
        <Bars
          isOpen={openBars}
          page="Change Password"
          close={closeBarHandler}
        />
      )}

      <React.Fragment>
        <div className=" gap-16 px-16 py-5  hidden md:flex  lg:px-20 xl:px-[100px] 2xl:px-[300px]">
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

          <div className="w-full">
            <div>
              <div className="bg-light-gray  px-6 py-3 flex items-center w-full md:max-w-[400px] rounded-md mb-5">
                <FontAwesomeIcon icon={faUnlock} className="mr-4" />
                <input
                  placeholder="Currenet Password"
                  type={passwordType}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  className="w-full bg-transparent focus:outline-none"
                />
                {passwordType === "text" && (
                  <Icon
                    icon={eye}
                    className="mr-4"
                    onClick={() => {
                      setPasswordType("password");
                    }}
                  />
                )}

                {passwordType === "password" && (
                  <Icon
                    icon={eyeBlocked}
                    className="mr-4"
                    onClick={() => {
                      setPasswordType("text");
                    }}
                  />
                )}
              </div>

              <div className="bg-light-gray px-6 py-3 flex items-center w-full md:max-w-[400px] rounded-md mb-5">
                <FontAwesomeIcon icon={faUnlock} className="mr-4" />
                <input
                  placeholder="New Password"
                  type={passwordTypeSecond}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="w-full bg-transparent focus:outline-none"
                />
                {passwordTypeSecond === "text" && (
                  <Icon
                    icon={eye}
                    className="mr-4"
                    onClick={() => {
                      setPasswordTypeSeond("password");
                    }}
                  />
                )}

                {passwordTypeSecond === "password" && (
                  <Icon
                    icon={eyeBlocked}
                    className="mr-4"
                    onClick={() => {
                      setPasswordTypeSeond("text");
                    }}
                  />
                )}
              </div>

              <button
                onClick={changePasswordHandler}
                className=" px-10 py-3 text-black bg-white rounded-full font-semibold mb-8"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}

export default Change_Password;
