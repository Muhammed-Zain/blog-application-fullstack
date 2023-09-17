import React, { useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";

export const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`).then((response) =>
      response.json().then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      })
    );
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) data.set("file", files?.[0]);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (res.ok) setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl text-center p-5 mb-10">Edit post</h1>
        <form onSubmit={handleEdit}>
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
          />
          <div className="mt-1 text-sm text-gray-500 " id="photo_help">
            Photos can help to make your blog posts more visually appealing and
            engaging
          </div>
          <Editor value={content} onChange={setContent} />
          <div className="flex justify-center my-10 py-5">
            <button
              type="submit"
              class="text-white bg-purple-400 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 w-[10%]"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
