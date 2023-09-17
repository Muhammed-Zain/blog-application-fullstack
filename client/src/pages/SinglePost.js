import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import { format } from "date-fns";
import { UserContext } from "../contextAPI/UserContext";
import { Link } from "react-router-dom";
import SingleSkeleton from "../layout/SingleSkeleton";

const SinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (postId) => {
    await fetch(`${process.env.REACT_APP_API_URL}/delete/${postId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log("error catching: " + error));
  };

  if (!postInfo) return <SingleSkeleton />;
  return (
    <div className="single-page">
      <h1 className="font-bold text-3xl pt-7 pb-3 text-center">
        {postInfo.title}
      </h1>
      <div className="text-center">
        <time className="font-medium text-gray-400">
          {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
        </time>
      </div>

      <div className="author text-center mt-2 mb-5">
        By: @<span className="font-semibold">{postInfo.author.username}</span>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="flex justify-center">
          <Link to={`/edit/${postInfo._id}`}>
            <button
              type="button"
              class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center"
            >
              Edit
              <svg
                className="w-3.5 h-3.5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLineCap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </Link>
          <button
            type="button"
            class="text-red-500 hover:text-white border border-red-300 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center"
            onClick={() => handleDelete(postInfo._id)}
          >
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash ml-2"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </div>
      )}
      <div className="image max-h-[250px] overflow-hidden flex mb-10">
        <img
          src={`${process.env.REACT_APP_API_URL}/${postInfo.cover}`}
          alt="blog_img"
          className="object-cover object-center"
        />
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        className="pt-5 pb-10 leading-loose"
      />
    </div>
  );
};

export default SinglePost;
