import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/icomoon/eye";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";

function Signup() {
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  const signUpHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("https://blog-api-rsd8.onrender.com/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      navigateTo("/login");
    } catch (err) {
      console.log(
        "Error from signup  handler in the signup page from the front-end",
        err
      );

      setError(err.response.data.errorMessage);
    }
  };

  return (
    <div className="h-[90vh] w-full px-4  md:px-10  lg:px-20 xl:px-28 2xl:px-64 flex text-center items-center justify-center">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div>
        <h1 className="font-bold text-3xl mb-10">Join Us Today</h1>

        {error !== "" && (
          <div className="bg-light-gray w-full mb-4 p-4 rounded-lg">
            {error}
          </div>
        )}

        <form className="mb-5">
          <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
            <FontAwesomeIcon icon={faUser} className="mr-4" />
            <input
              placeholder="User Name"
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
            <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
            <input
              placeholder="Email"
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="bg-light-gray w-full px-6 py-3 flex items-center rounded-md mb-5">
            <FontAwesomeIcon icon={faKey} className="mr-4" />
            <input
              placeholder="Password"
              type={passwordType}
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
          <button
            onClick={signUpHandler}
            className=" px-10 py-3 text-black bg-white rounded-full font-semibold mb-8"
          >
            Sign Up
          </button>
        </form>

        <p className="underline font-medium">
          <Link to="/login">Already a member ? Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
