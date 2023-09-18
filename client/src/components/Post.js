import React, { useContext } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../contextAPI/UserContext";

const Post = ({ _id, title, summary, cover, author, createdAt }) => {
  const { userInfo } = useContext(UserContext);
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={cover} alt="blog" loading="lazy" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>

          <p className="info">
            <Link className="author">
              {JSON.stringify(author) === JSON.stringify(userInfo.id)
                ? userInfo.username
                : author.username}
            </Link>
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")} </time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
