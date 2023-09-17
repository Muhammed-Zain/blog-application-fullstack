import React from "react";
import Layout from "../layout/Layout";

const NotFound = () => {
  const style = {
    margin: "0 auto",
    width: "40%",
  };
  return (
    <div>
      <Layout />
      <div className="image" style={style}>
        <img src="/images/error.jpg" alt="error" />
      </div>
    </div>
  );
};

export default NotFound;
