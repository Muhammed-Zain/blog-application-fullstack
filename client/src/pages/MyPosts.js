import React from "react";
import Post from "../components/Post";
import SkeletonCard from "../layout/SkeletonCard";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contextAPI/UserContext";

export const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetchAuthorPosts(userInfo.id);
  }, [userInfo.username]);

  const fetchAuthorPosts = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/myposts/${id}`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
    });
  };

  return (
    <>
      {loading && <SkeletonCard cards={2} />}

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};
