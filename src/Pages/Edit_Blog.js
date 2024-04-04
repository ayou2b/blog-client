import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Auth from "../Context/Auth";

function Edit_Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const { token } = useContext(Auth);

  const [image, setImage] = useState("");
  const navigateTo = useNavigate();

  const [file, setFile] = useState();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/blog/${blogId}`
        );

        setBlog(response.data.blog);
        setImage(response.data.blog.image);
      } catch (err) {
        console.log("error getting the blog in blog page frontend", err);
      }
    };
    getBlog();
  }, [blogId]);

  useEffect(() => {
    setBlogTitle(blog.title || "");
    setBlogContent(blog.content || "");
  }, [blog]);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const updateBlogHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("content", blogContent);
      formData.append("file", file);

      const response = await axios.post(
        `https://blog-api-rsd8.onrender.com/edit-blog/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      navigateTo(`/blog/${blogId}`);
    } catch (err) {
      console.log("Error from the update blog handler in the front-end", err);
    }
  };

  return (
    <div className="w-full h-full md:px-10  lg:px-20 xl:px-[300px] 2xl:px-[500px] p-8">
      <Helmet>
        <title>Edit Blog</title>
      </Helmet>

      <div className="w-full   h-[200px] sm:h-[300px] md:h-[400px] lg:h-[550px] flex items-center justify-center text-center mb-10 rounded-md">
        <input
          type="file"
          id="file-input"
          name="file-input"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          id="file-input-label"
          style={{
            backgroundImage: `url(https://blog-api-rsd8.onrender.com/images/${
              image.split("\\")[1]
            })`,
          }}
          for="file-input"
          className="w-full bg-cover bg-center h-full text-center  flex items-center justify-center font-medium text-2xl cursor-pointer"
        ></label>
      </div>
      <textarea
        placeholder="Blog Title"
        className="text-4xl font-medium w-full h-20 outline-none resize-none  leading-tight placeholder:opacity-40 bg-transparent mb-10"
        spellCheck="false"
        value={blogTitle}
        onChange={(e) => {
          setBlogTitle(e.target.value);
        }}
      ></textarea>

      <div className="w-full flex items-center flex-wrap mb-10">
        <textarea
          placeholder="Let's write an awesome story"
          className="w-full bg-transparent outline-none"
          value={blogContent}
          onChange={(e) => {
            setBlogContent(e.target.value);
          }}
        ></textarea>
      </div>

      <button
        onClick={updateBlogHandler}
        className="px-6 py-2 text-white bg-light-gray rounded-3xl"
      >
        Update
      </button>
    </div>
  );
}

export default Edit_Blog;
