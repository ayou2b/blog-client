import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import {
  faXmark,
  faTrash,
  faPenToSquare,
  faComment,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import pr from "../Images/profile.jpg";

import Auth from "../Context/Auth";

import "../App.css";

function Blog() {
  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);

  const [comment, setComment] = useState("");

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const { token } = useContext(Auth);

  const [comments, setComments] = useState([]);

  const [replay, setReplay] = useState("");

  const [commentId, setCommentId] = useState(null);

  const [replayId, setReplayId] = useState(null);

  const [isLiked, setIsLiked] = useState(false);

  const [replayStates, setReplayStates] = useState(
    Array(comments.length).fill(false)
  );

  const handleReplayToggle = (index) => {
    const newReplayStates = [...replayStates];
    newReplayStates[index] = !newReplayStates[index];
    setReplayStates(newReplayStates);

    const theComment = comments[index];

    if (theComment && theComment.id) {
      setCommentId(theComment);
    }
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/blog/${blogId}`
        );
        await setBlog(response.data.blog);

        console.log(response);
      } catch (err) {
        console.log("error getting the blog in blog page front-end", err);
      }
    };
    getBlog();
  }, [blogId]);

  useEffect(() => {
    if (blog && blog.createdBy !== null) {
      // Add a check for blog before accessing createdBy
      const getUserInfo = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/user-information/${blog.createdBy}`
          );
          setUserInfo(response.data.user);
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
  }, [blog && blog.createdBy]);

  const deleteHandler = async () => {
    try {
      const response = await axios.post(
        `https://blog-api-rsd8.onrender.com/delete-blog/${blogId}`,
        {},
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      navigateTo("/");
    } catch (err) {
      console.log("Error deleting the blog from the blog page front-end", err);
    }
  };

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/all-comments/${blogId}`
        );

        setComments(response.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    getAllComments();
  }, [blogId]);

  const addCommentHandler = async () => {
    try {
      await axios.post(
        `https://blog-api-rsd8.onrender.com/add-comment/${blogId}`,
        { comment: comment },
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      const getAllComments = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/all-comments/${blogId}`
          );

          setComments(response.data.comments);
        } catch (err) {
          console.log(err);
        }
      };

      getAllComments();
    } catch (err) {
      console.log(err);
    }
  };

  const addReplayHandler = async (idx) => {
    try {
      // e.preventDefault();
      await axios.post(
        `https://blog-api-rsd8.onrender.com/add-replay/${blogId}/${commentId.id}`,
        { replay: replay },
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      const getAllComments = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/all-comments/${blogId}`
          );

          setComments(response.data.comments);
        } catch (err) {
          console.log(err);
        }
      };

      getAllComments();

      setReplay("");
      handleReplayToggle(idx);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReplayHandler = async (comentId, replayId) => {
    try {
      const response = await axios.post(
        `https://blog-api-rsd8.onrender.com/delete-replay/${blogId}/${comentId}/${replayId}`,
        {},
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);

      console.log(blogId, comentId, "#####", replayId);

      const getAllComments = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/all-comments/${blogId}`
          );

          setComments(response.data.comments);
        } catch (err) {
          console.log(err);
        }
      };

      getAllComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isLiked = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/is-user-liked-theBlog/${blogId}`,

          {
            headers: {
              authorisation: "Bearer " + token,
            },
          }
        );

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
  }, [blogId, token]);

  const likeHandler = async () => {
    try {
      const response = await axios.post(
        `https://blog-api-rsd8.onrender.com/like/${blogId}`,
        {},
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);

      const isLiked = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/is-user-liked-theBlog/${blogId}`,

            {
              headers: {
                authorisation: "Bearer " + token,
              },
            }
          );

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

      const getBlog = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/blog/${blogId}`
          );
          await setBlog(response.data.blog);

          console.log(response);
        } catch (err) {
          console.log("error getting the blog in blog page front-end", err);
        }
      };
      getBlog();
    } catch (err) {
      console.log(err);
    }
  };

  const disLikeHandler = async () => {
    try {
      const response = await axios.post(
        `https://blog-api-rsd8.onrender.com/${blogId}`,
        {},
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      const isLiked = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/is-user-liked-theBlog/${blogId}`,

            {
              headers: {
                authorisation: "Bearer " + token,
              },
            }
          );

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

      const getBlog = async () => {
        try {
          const response = await axios.get(
            `https://blog-api-rsd8.onrender.com/blog/${blogId}`
          );
          await setBlog(response.data.blog);

          console.log(response);
        } catch (err) {
          console.log("error getting the blog in blog page front-end", err);
        }
      };
      getBlog();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{blog && blog.title}</title>
      </Helmet>
      {isCommentOpen === false && (
        <div className="mt-8 md:px-10 md:hidden  lg:px-20 xl:px-[300px] 2xl:px-[500px] px-8">
          <img
            src={blog !== null ? `https://blog-api-rsd8.onrender.com/${blog.image}` : ""}
            alt="test"
            className="w-full h-[250px] mb-5 sm:h-[350px] md:h-[450px] lg:h-[550px]"
          ></img>
          <h2 className="font-bold text-2xl mb-5">
            {blog !== null ? blog.title : ""}
          </h2>
          <p className="mb-5">{blog !== null ? blog.content : ""}</p>
          <div className="md:flex items-center justify-between w-full py-3 mb-3 border-b border-custom-gray">
            <Link
              to={`/user/${userInfo._id}`}
              className="flex items-center mb-4"
            >
              <img
                src={pr}
                alt="profile"
                className="w-[50px] h-[50px] rounded-full"
              ></img>

              <div className="ml-3 font-medium">
                <p>Ayoub elimrani</p>
                <p className="underline">@Ayou2b</p>
              </div>
            </Link>
            <p className="font-medium">{blog !== null ? blog.createdAt : ""}</p>
          </div>

          <div className="mb-6">
            {isLiked !== true && (
              <button
                onClick={likeHandler}
                className={`p-2 px-3 w-fit mr-5 rounded-full  bg-light-gray`}
              >
                <FontAwesomeIcon icon={faHeart} size={13} />{" "}
                {blog !== null ? blog.likes : " "}
              </button>
            )}

            {isLiked === true && (
              <button
                onClick={disLikeHandler}
                className={`p-2 px-3 w-fit mr-5 rounded-full  bg-red-600`}
              >
                <FontAwesomeIcon icon={faHeart} size={13} />{" "}
                {blog !== null ? blog.likes : ""}
              </button>
            )}
            <button
              onClick={deleteHandler}
              className="p-2 px-3 w-fit rounded-full bg-light-gray mr-5"
            >
              <FontAwesomeIcon icon={faTrash} size={13} />
            </button>

            <Link
              to={`/edite-blog/${blogId}`}
              className="p-2 px-3 w-fit rounded-full bg-light-gray mr-5"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>

            <button
              onClick={() => {
                setIsCommentOpen(true);
              }}
              className="p-2 px-3 w-fit rounded-full bg-light-gray"
            >
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 md:px-10 hidden md:block  lg:px-20 xl:px-[300px] 2xl:px-[500px] px-8">
        <img
          src={blog !== null ? `https://blog-api-rsd8.onrender.com/${blog.image}` : ""}
          alt="test"
          className="w-full h-[250px] mb-5 sm:h-[350px] md:h-[450px] lg:h-[550px]"
        ></img>
        <h2 className="font-bold text-2xl mb-5">
          {blog !== null ? blog.title : ""}
        </h2>
        <p className="mb-5">{blog !== null ? blog.content : ""}</p>
        <div className="md:flex items-center justify-between w-full py-3 mb-3 border-b border-custom-gray">
          <Link to={`/user/${userInfo._id}`} className="flex items-center mb-4">
            <img
              src={`https://blog-api-rsd8.onrender.com/${userInfo.profileImage}`}
              alt="profile"
              className="w-[50px] h-[50px] rounded-full"
            ></img>

            <div className="ml-3 font-medium">
              <p>{userInfo && userInfo.name}</p>
              <p className="underline">@{userInfo && userInfo.userName}</p>
            </div>
          </Link>
          <p className="font-medium">{blog !== null ? blog.createdAt : ""}</p>
        </div>

        <div className="mb-6">
          {isLiked !== true && (
            <button
              onClick={likeHandler}
              className={`p-2 px-3 w-fit mr-5 rounded-full  bg-light-gray`}
            >
              <FontAwesomeIcon icon={faHeart} size={13} />{" "}
              {blog !== null ? blog.likes : ""}
            </button>
          )}

          {isLiked === true && (
            <button
              onClick={disLikeHandler}
              className={`p-2 px-3 w-fit mr-5 rounded-full  bg-red-600`}
            >
              <FontAwesomeIcon icon={faHeart} size={13} />{" "}
              {blog !== null ? blog.likes : ""}
            </button>
          )}

          <button
            onClick={deleteHandler}
            className="p-2 px-3 w-fit rounded-full bg-light-gray mr-5"
          >
            <FontAwesomeIcon icon={faTrash} size={13} />
          </button>

          <Link
            to={`/edite-blog/${blogId}`}
            className="p-2 px-3 w-fit rounded-full bg-light-gray mr-5"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>

          <button
            onClick={() => {
              setIsCommentOpen(true);
            }}
            className="p-2 px-3 w-fit rounded-full bg-light-gray"
          >
            <FontAwesomeIcon icon={faComment} />
          </button>
        </div>
      </div>

      {isCommentOpen === true && (
        <div className="w-full h-[90vh] md:hidden overflow-scroll  z-10 px-8 py-2">
          <div className="w-full flex items-center justify-between  border-b border-light-gray py-6 mb-8">
            <div>
              <h2 className="mb-2 font-medium">Comments</h2>
              <h3>{blog.title}</h3>
            </div>

            <button
              onClick={() => {
                setIsCommentOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex flex-col">
            <textarea
              className="h-[150px] rounded-lg bg-light-gray p-4 focus:outline-none"
              placeholder="Leave an comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={() => {
                addCommentHandler();
                setComment("");
              }}
              className="px-6 py-2 text-black bg-white rounded-3xl w-fit mt-6"
            >
              Comment
            </button>
          </div>

          {comments.length !== 0 && (
            <div className="mt-6 flex flex-col items-end">
              {comments.map((comment, index) => (
                <div className="w-full  mb-6" key={index}>
                  <div className="bg-[rgb(68,68,68)] p-4 mb-5">
                    <p>{comment.comment}</p>
                    <button
                      className="mt-3"
                      onClick={() => {
                        handleReplayToggle(index);
                      }}
                    >
                      Replay
                    </button>
                  </div>

                  {replayStates[index] && (
                    <div className="w-full mt-3 mb-3">
                      <textarea
                        className="h-[150px] rounded-lg w-full bg-[rgb(68,68,68)] p-4 focus:outline-none"
                        placeholder="Leave a comment"
                        onChange={(e) => {
                          setReplay(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          addReplayHandler(index);
                        }}
                        className="px-6 py-2 text-black bg-white rounded-3xl w-fit mt-6"
                      >
                        Replay
                      </button>
                    </div>
                  )}

                  <React.Fragment>
                    {comment.replays.map((replay) => {
                      return (
                        <div className="w-[80%] rounded-lg bg-[rgb(68,68,68)]  p-4 mb-6">
                          <p className="">{replay.replay}</p>

                          <button
                            className=" text-red-500  hover:underline mt-3"
                            onClick={() => {
                              deleteReplayHandler(comment.id, replay.id);

                              setReplayId(replay.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </React.Fragment>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isCommentOpen === true && (
        <div className="w-full max-w-[350px] h-[100vh] hidden md:block fixed overflow-x-hidden top-0 bg-light-gray overflow-scroll right-0 z-10 px-8 py-2   comment-scrool-container">
          <div className="w-full flex items-center justify-between  border-b border-light-gray py-6 mb-8">
            <div>
              <h2 className="mb-2 font-medium">Comments</h2>
              <h3>{blog.title}</h3>
            </div>

            <button
              onClick={() => {
                setIsCommentOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex flex-col">
            <textarea
              className="h-[150px] rounded-lg bg-[rgb(68,68,68)] p-4 focus:outline-none"
              placeholder="Leave an comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={() => {
                addCommentHandler();
                setComment("");
              }}
              className="px-6 py-2 text-black bg-white rounded-3xl w-fit mt-6"
            >
              Comment
            </button>
          </div>

          {comments.length !== 0 && (
            <div className="mt-6 flex flex-col items-end">
              {comments.map((comment, index) => (
                <div
                  className="w-full rounded-lg bg-light-gray mb-6"
                  key={index}
                >
                  <div className="bg-[rgb(68,68,68)] p-4 mb-5">
                    <p>{comment.comment}</p>
                    <button
                      className="mt-3 bg-white px-5 py-2 rounded-3xl text-black font-medium"
                      onClick={() => {
                        handleReplayToggle(index);
                      }}
                    >
                      Replay
                    </button>
                  </div>

                  {replayStates[index] && (
                    <div className="w-full mt-3 mb-3">
                      <textarea
                        className="h-[150px] rounded-lg w-full bg-[rgb(68,68,68)] p-4 focus:outline-none"
                        placeholder="Leave a comment"
                        onChange={(e) => {
                          setReplay(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          addReplayHandler(index);
                        }}
                        className="px-6 py-2 text-black bg-white rounded-3xl w-fit mt-6"
                      >
                        Replay
                      </button>
                    </div>
                  )}

                  <React.Fragment>
                    {comment.replays.map((replay) => {
                      return (
                        <div className="w-[80%] rounded-lg bg-[rgb(68,68,68)]  p-4 mb-6">
                          <p className="">{replay.replay}</p>

                          <button
                            className=" text-red-500  hover:underline mt-3"
                            onClick={() => {
                              deleteReplayHandler(comment.id, replay.id);

                              setReplayId(replay.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </React.Fragment>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Blog;
