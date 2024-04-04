import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";

import Auth from "../Context/Auth";

// md:bg-yellow-300 lg:bg-green-400 xl:bg-blue-400 2xl:bg-orange-500 sm:bg-red-600

function Header(props) {
  const isLogged = localStorage.getItem("isLoggedIn");

  const [search, setSearch] = useState("");

  const navigateTo = useNavigate();

  const [userInfo, setUserInfo] = useState([]);

  const { userId } = useContext(Auth);

  const searchHandler = (e) => {
    e.preventDefault();

    navigateTo(`/find/${search}`);
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
    <div className="h-[10vh] flex items-center justify-between w-full border-b border-custom-gray   px-4 py-4  sm:p-8   md:px-10 md:py-8  lg:px-20 lg:py-10 xl:px-28 xl:py-14 2xl:px-64">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold md:mr-10">
            BLOGI
          </Link>

          <form
            onSubmit={searchHandler}
            class="mx-auto w-full hidden md:block "
          >
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
                class="block w-full px-5 py-3 ps-10 font-semibold  rounded-full outline-none appearance-none  bg-light-gray"
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                required
              />
            </div>
          </form>
        </div>

        <div className="space-x-4 flex flex-wrap">
          <Link
            to="/write"
            className="px-6 py-2 text-center flex items-center text-white bg-light-gray rounded-full font-semibold"
          >
            Write <FontAwesomeIcon icon={faFeather} />
          </Link>
          <button className="px-3 py-2 text-white hidden  bg-light-gray rounded-full md:hidden">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {isLogged === null && (
            <React.Fragment>
              <Link
                to="/login"
                className="px-6 py-2 text-black bg-white rounded-3xl"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 text-white hidden md:block bg-light-gray rounded-3xl"
              >
                Sign Up
              </Link>
            </React.Fragment>
          )}

          {isLogged === "true" && (
            <React.Fragment>
              <button
                onClick={() => {
                  props.onLogout();
                  navigateTo(`/`);
                }}
                className="px-6 py-2 text-white bg-light-gray rounded-3xl hidden md:block "
              >
                Logout
              </button>
              <Link to="/dashboard/user-profile">
                <img
                  src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
                  alt="profile"
                  className="w-[40px] h-[40px] rounded-full"
                ></img>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
