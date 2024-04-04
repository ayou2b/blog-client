import React, { useState, useEffect, useCallback } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "./Context/Auth";

import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Write from "./Pages/Write";
import Blog from "./Pages/Blog";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import Blogs from "./Pages/Dashboard/Blogs";
import ChangePassword from "./Pages/Dashboard/Change_Password";
import EditProfile from "./Pages/Dashboard/Edit_Profile";
import UserProfile from "./Pages/Dashboard/Profile";

import EditDraft from "./Pages/Draft_edit";

import BlogByTopic from "./Pages/Blog_By_Topic";

import EditBlog from "./Pages/Edit_Blog";

import Dashboard from "./Components/Dashboard";

import BlogerProfile from "./Pages/Bloger_Profile";

import Search from "./Pages/Search";

import "./App.css";

import Header from "./Components/Header";

let logoutTimer;

function App() {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [expirationTime, setExpirationTime] = useState(null);
  const [theUserId, setTheUserId] = useState("");

  const loginHandLer = useCallback((tkn, logged, expiration, userId) => {
    setToken(tkn);
    setIsLogged(logged);
    setTheUserId(userId);

    const expirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

    setExpirationTime(expirationDate);

    localStorage.setItem("token", tkn);
    localStorage.setItem("isLoggedIn", logged);
    localStorage.setItem("expiration", expirationDate);
    localStorage.setItem("userId", userId);
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLogged(false);
    setToken("");
    setExpirationTime("");

    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }, []);

  // auto logout

  useEffect(() => {
    if (token && expirationTime) {
      const remainingTime = expirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expirationTime, logoutHandler]);

  // auto login

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedExpirationTime = localStorage.getItem("expiration");
    const storedUserId = localStorage.getItem("userId");

    if (
      storedToken &&
      storedIsLoggedIn &&
      new Date(storedExpirationTime) > new Date()
    ) {
      loginHandLer(
        storedToken,
        storedIsLoggedIn,
        new Date(storedExpirationTime),
        storedUserId
      );
    }
  }, [loginHandLer]);

  return (
    <React.Fragment>
      <Auth.Provider
        value={{
          token: token,
          isLoggedIn: isLogged,
          expirationTime: expirationTime,
          userId: theUserId,
        }}
      >
        <Router>
          <Header onLogout={logoutHandler} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/write" element={<Write />} />
            <Route path="/blog/:blogId" element={<Blog />} />
            <Route path="/edite-blog/:blogId" element={<EditBlog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={loginHandLer} />} />
            <Route path="/dashboard/blogs" element={<Blogs />} />
            <Route path="/dashboard/edit-profile" element={<EditProfile />} />
            <Route path="/dashboard/user-profile" element={<UserProfile />} />
            <Route
              path="/dashboard/change-password"
              element={<ChangePassword />}
            />

            <Route path="/user/:userId" element={<BlogerProfile />} />

            <Route path="/draft-edit/:draftId" element={<EditDraft />} />

            <Route path="/find/:search" element={<Search />} />
            <Route path="/blogs-by-topic/:topic" element={<BlogByTopic />} />
          </Routes>
        </Router>
      </Auth.Provider>
    </React.Fragment>
  );
}

export default App;
