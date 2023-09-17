import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleSkeleton = () => {
  return (
    <>
      <div className="single-page">
        <h1 className="font-bold text-3xl pt-7 pb-3 text-center">
          <Skeleton width={"60%"} />
        </h1>
        <div className="text-center">
          <Skeleton width={"15%"} />
        </div>
        <div className="author text-center mt-2 mb-5">
          <Skeleton width={"30%"} />
        </div>
        <div>
          <Skeleton height={"245px"} borderRadius={"20px"} />
        </div>
        <div style={{ marginTop: "5%" }}>
          <Skeleton
            count={10}
            style={({ padding: "10px" }, { margin: "5px" })}
          />
        </div>
      </div>
    </>
  );
};

export default SingleSkeleton;
