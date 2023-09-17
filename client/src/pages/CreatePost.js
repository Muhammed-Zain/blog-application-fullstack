import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { Editor } from "../components/Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files?.[0]) data.set("file", files?.[0]);
    console.log(files);
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return (
      <div>
        <Navigate to={"/"} />
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-bold text-3xl text-center p-5 mb-10">
        Create your new post!
      </h1>
      <form onSubmit={createNewPost}>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 ">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 ">
            Summary
          </label>
          <input
            type="text"
            id="summary"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <label className="block mb-2 text-lg font-medium text-gray-900 ">
          Upload a cover image
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
          aria-describedby="photo_help"
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
          required
        />
        <div className="mt-1 text-sm text-gray-500 " id="photo_help">
          Photos can help to make your blog posts more visually appealing and
          engaging
        </div>
        <Editor value={content} onChange={setContent} />
        <div className="flex justify-center my-10 py-5">
          <button
            type="submit"
            className="px-5 py-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[10%]"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
