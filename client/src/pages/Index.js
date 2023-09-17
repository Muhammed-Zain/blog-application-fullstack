import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import SkeletonCard from "../layout/SkeletonCard";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);
  return (
    <>
      {loading && <SkeletonCard cards={2} />}

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Index;
