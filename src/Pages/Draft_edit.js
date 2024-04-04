import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Auth from "../Context/Auth";

function Draft_edit() {
  const { draftId } = useParams();
  const [file, setFile] = useState();

  const { token } = useContext(Auth);

  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const getDraft = async () => {
      try {
        const response = await axios.get(
          `https://blog-api-rsd8.onrender.com/draft/${draftId}`,
          {
            headers: { authorisation: "Bearer " + token },
          }
        );
        console.log(response.data.draft[0]);
        setDraftTitle(response.data.draft[0].title);
        setDraftContent(response.data.draft[0].content);
        setBlogContent(response.data.draft[0].content);
        setBlogTitle(response.data.draft[0].title);
      } catch (err) {
        console.log("error getting the blog in blog page frontend", err);
      }
    };
    getDraft();
  }, [draftId, token]);

  const addBlogHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", blogTitle);
      formData.append("content", blogContent);
      formData.append("topic", selectedValue);

      const response = await axios.post(
        "https://blog-api-rsd8.onrender.com/add-new-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
    } catch (err) {
      console.log("error from the add blog handler in the front-end");
    }

    console.log(blogTitle);
  };

  const saveBlogController = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://blog-api-rsd8.onrender.com/save-draft",
        {
          title: blogTitle,
          content: blogContent,
        },
        {
          headers: { authorisation: "Bearer " + token },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("error from the add draft handler in the front-end");
    }
  };

  return (
    <div className="w-full h-full md:px-10  lg:px-20 xl:px-[300px] 2xl:px-[500px] p-8">
      <Helmet>
        <title>Edit Draft</title>
      </Helmet>
      <form className="w-full border-[2px] border-custom-gray h-[200px] sm:h-[300px] md:h-[400px] lg:h-[550px] flex items-center justify-center text-center mb-10 rounded-md">
        <input
          type="file"
          id="file-input"
          name="file-input"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          id="file-input-label"
          for="file-input"
          className="w-full h-full text-center flex items-center justify-center font-medium text-2xl cursor-pointer"
        >
          Blog Banner
        </label>
      </form>

      <div className="p-5 bg-light-gray w-fit text-white mb-4 flex flex-wrap">
        <label htmlFor="blogTopics" className="mr-3">
          Select a Blog Topic:
        </label>
        <select
          onChange={(e) => {
            setSelectedValue(e.target.value);
          }}
          id="blogTopics"
          className="bg-transparent text-custom-gray outline-none cursor-pointer rounded-md"
        >
          <option value="technology">Technology</option>
          <option value="travel">Travel</option>
          <option value="health">Health and Fitness</option>
          <option value="food">Food and Cooking</option>
          <option value="fashion">Fashion and Style</option>
          <option value="personal-development">Personal Development</option>
          <option value="business">Business and Finance</option>
          <option value="entertainment">Entertainment</option>
          <option value="education">Education</option>
          <option value="sports">Sports</option>
          <option value="books">Books and Literature</option>
          <option value="arts-culture">Arts and Culture</option>
          <option value="science">Science</option>
          <option value="parenting">Parenting</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      <textarea
        placeholder="Blog Title"
        value={draftTitle}
        class="text-4xl font-medium w-full h-20 outline-none resize-none  leading-tight placeholder:opacity-40 bg-transparent mb-10"
        spellcheck="false"
        onChange={(e) => {
          setDraftTitle(e.target.value);
          setBlogTitle(e.target.value);
        }}
      ></textarea>

      <div className="w-full flex items-center flex-wrap mb-10">
        <textarea
          placeholder="Let's write an awsome story"
          value={draftContent}
          className="w-full bg-transparent outline-none"
          onChange={(e) => {
            setDraftContent(e.target.value);
            setBlogContent(e.target.value);
          }}
        ></textarea>
      </div>

      <button
        type="button"
        onClick={addBlogHandler}
        className="px-10 py-2 text-black bg-white rounded-3xl"
      >
        Publish
      </button>

      <button
        onClick={saveBlogController}
        className="px-10 py-2 text-white border border-light-gray ml-7 rounded-3xl"
      >
        Save Draft
      </button>
    </div>
  );
}

export default Draft_edit;
