import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Auth from "../../Context/Auth";

import axios from "axios";
import {
  faBarsStaggered,
  faUser,
  faEnvelope,
  faAt,
  faUnlock,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "react-icons-kit";
import { youtube } from "react-icons-kit/icomoon/youtube";
import { instagram } from "react-icons-kit/fa/instagram";
import { facebookSquare } from "react-icons-kit/fa/facebookSquare";
import { twitterSquare } from "react-icons-kit/fa/twitterSquare";
import { github } from "react-icons-kit/fa/github";
import { sphere } from "react-icons-kit/icomoon/sphere";
import { quill } from "react-icons-kit/icomoon/quill";

import Bars from "../../Components/Bars";

function Edit_Profile() {
  const { token, userId } = useContext(Auth);

  const [userInfo, setUserInfo] = useState([]);

  const [file, setFile] = useState("");

  useEffect(() => {
    console.log(file.name);
  }, [file]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/user-information/${userId}`
        );

        setUserInfo(response.data.user);
        setBio(response.data.user.bio);
        setFacebook(response.data.user.facebook);
        setGithub(response.data.user.github);
        setSite(response.data.user.website);
        setInstagram(response.data.user.instagram);
        setTwitter(response.data.user.twitter);
        setUserName(response.data.user.userName);
        setYoutube(response.data.user.youtube);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [userId]);

  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [useryoutube, setYoutube] = useState("");
  const [userinstagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [usergithub, setGithub] = useState("");
  const [site, setSite] = useState("");

  const [openBars, setOpenBars] = useState(false);

  const closeBarHandler = () => {
    setOpenBars(false);
  };

  const editProfileHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("bio", bio);
      formData.append("youtube", useryoutube);
      formData.append("instagram", userinstagram);
      formData.append("facebook", facebook);
      formData.append("twitter", twitter);
      formData.append("github", usergithub);
      formData.append("website", site);
      formData.append("newUserImage", file);

      const response = await axios.post(
        "https://blog-api-rsd8.onrender.com/edit-profile",
        formData,
        {
          headers: { authorisation: "Bearer " + token },
        }
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    <React.Fragment>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      {openBars === false && (
        <div className="px-4  md:px-10  md:hidden  lg:px-20 xl:px-28 2xl:px-64 w-full">
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
              <button className="p-4">Edit Profile</button>
              <div className="w-full bg-white absolute bottom-[-1.5px] rounded-sm left-0 h-[3px]"></div>
            </div>
          </div>

          <div>
            <form className="w-full flex items-center justify-center flex-col text-center mb-10">
              <label
                id="file-input-label"
                for="newUserImage"
                className="w-full h-full text-center flex items-center justify-center"
              >
                <img
                  src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
                  alt="profile"
                  className="w-[170px] h-[170px] rounded-full"
                ></img>
              </label>
              <input
                type="file"
                id="newUserImage"
                name="newUserImage"
                className=" hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                disabled
                className="mt-8 px-10 py-3 text-white bg-light-gray rounded-full font-semibold"
              >
                Upload
              </button>
            </form>

            <div>
              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                <input
                  // placeholder="User Name"
                  value={userInfo.name}
                  disabled
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
                <input
                  // placeholder="Email"
                  value={userInfo.email}
                  disabled
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <FontAwesomeIcon icon={faAt} className="mr-4" />
                <input
                  placeholder="User Name"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>

              <p>
                Username will use to search user and will be visible to all
                users
              </p>
            </div>

            <textarea
              placeholder="Bio"
              maxLength={150}
              className="p-4 mt-5 rounded-md w-full bg-light-gray h-64"
            />

            <div>
              <p className="mb-5 mt-5">Add your social handles below</p>
              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <Icon icon={youtube} className="mr-4" />

                <input
                  placeholder="https://"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <Icon icon={instagram} className="mr-4" />
                <input
                  placeholder="https://"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>

              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <Icon icon={facebookSquare} className="mr-4" />
                <input
                  placeholder="https://"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>

              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <Icon icon={twitterSquare} className="mr-4" />
                <input
                  placeholder="https://"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>

              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <Icon icon={github} className="mr-4" />
                <input
                  placeholder="https://"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
              <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                <Icon icon={sphere} className="mr-4" />
                <input
                  placeholder="https://"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>

              <button className=" px-10 py-3 text-black bg-white rounded-full font-semibold mb-8">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {openBars === true && (
        <Bars isOpen={openBars} page="Edit Profile" close={closeBarHandler} />
      )}

      <React.Fragment>
        <div className="hidden md:flex  gap-16 px-16 py-5  lg:px-20 xl:px-[100px] 2xl:px-[300px]">
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

          <div className="w-full lg:flex lg:gap-16  items-start">
            <form className="flex items-center justify-center flex-col text-center mb-10 min-w-[170px]">
              <label
                id="file-input-label"
                htmlFor="file-input"
                className="w-full h-full text-center flex items-center justify-center"
              >
                <img
                  src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
                  alt="profile"
                  className="w-[170px] h-[170px] rounded-full"
                />
              </label>
              <input
                type="file"
                id="file-input"
                name="newUserImage"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                onClick={() => document.getElementById("file-input").click()}
                type="button"
                className="mt-8 px-10 py-3 text-white bg-light-gray rounded-full font-semibold"
              >
                Upload
              </button>
            </form>

            <div className="flex flex-col w-full">
              <React.Fragment>
                <div className="flex gap-7">
                  <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                    <FontAwesomeIcon icon={faUser} className="mr-4" />
                    <input
                      // placeholder="User Name"
                      value={userInfo.name}
                      disabled
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
                    <input
                      // placeholder="Email"
                      value={userInfo.email}
                      disabled
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
                  <FontAwesomeIcon icon={faAt} className="mr-4" />
                  <input
                    placeholder="User Name"
                    value={userName !== "undefined" ? userName : ""}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>

                <p>
                  Username will use to search user and will be visible to all
                  users
                </p>
              </React.Fragment>

              <textarea
                placeholder="Bio"
                value={bio !== "undefined" ? bio : ""}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                maxLength={150}
                className="p-4 mt-5 rounded-md w-full bg-light-gray h-64"
              />

              <React.Fragment>
                <p className="mb-5 mt-5">Add your social handles below</p>
                <div className="flex flex-wrap  w-full flex-row gap-7">
                  <div className="flex w-full gap-7">
                    <div className="bg-light-gray  px-6 py-3 flex items-center rounded-md mb-5 w-full">
                      <Icon icon={youtube} className="mr-4" />

                      <input
                        placeholder="https://"
                        value={useryoutube !== "undefined" ? useryoutube : ""}
                        className="w-full bg-transparent focus:outline-none"
                        onChange={(e) => {
                          setYoutube(e.target.value);
                        }}
                      />
                    </div>

                    <div className="bg-light-gray  px-6 py-3 flex items-center rounded-md mb-5 w-full">
                      <Icon icon={instagram} className="mr-4" />
                      <input
                        placeholder="https://"
                        className="w-full bg-transparent focus:outline-none"
                        onChange={(e) => {
                          setInstagram(e.target.value);
                        }}
                        value={
                          userinstagram !== "undefined" ? userinstagram : ""
                        }
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-7">
                    <div className="bg-light-gray  px-6 py-3 flex items-center rounded-md mb-5 w-full">
                      <Icon icon={facebookSquare} className="mr-4" />
                      <input
                        placeholder="https://"
                        className="w-full bg-transparent focus:outline-none"
                        onChange={(e) => {
                          setFacebook(e.target.value);
                        }}
                        value={facebook !== "undefined" ? facebook : ""}
                      />
                    </div>

                    <div className="bg-light-gray  px-6 py-3 flex items-center rounded-md mb-5 w-full">
                      <Icon icon={twitterSquare} className="mr-4" />
                      <input
                        placeholder="https://"
                        className="w-full bg-transparent focus:outline-none"
                        onChange={(e) => {
                          setTwitter(e.target.value);
                        }}
                        value={twitter !== "undefined" ? twitter : ""}
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-7">
                    <div className="bg-light-gray  px-6 py-3 flex items-center rounded-md mb-5 w-full">
                      <Icon icon={github} className="mr-4" />
                      <input
                        placeholder="https://"
                        className="w-full bg-transparent focus:outline-none"
                        onChange={(e) => {
                          setGithub(e.target.value);
                        }}
                        value={usergithub !== "undefined" ? usergithub : ""}
                      />
                    </div>

                    <div className="bg-light-gray  px-6 py-3 flex items-center rounded-md mb-5 w-full">
                      <Icon icon={sphere} className="mr-4" />
                      <input
                        placeholder="https://"
                        className="w-full bg-transparent focus:outline-none"
                        onChange={(e) => {
                          setSite(e.target.value);
                        }}
                        value={site !== "undefined" ? site : ""}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={editProfileHandler}
                  className=" px-10 py-3 w-fit text-black bg-white rounded-full font-semibold mb-8"
                >
                  Update
                </button>
              </React.Fragment>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}

export default Edit_Profile;
