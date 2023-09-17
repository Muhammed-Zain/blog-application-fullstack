import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div key={i}>
        <div className="post">
          <div className="image">
            <Skeleton height={"275px"} borderRadius={"20px"} />
          </div>
          <div className="texts">
            <h2>
              <Skeleton count={2} />
            </h2>

            <p className="info">
              <Skeleton />
            </p>
            <p className="summary">
              <Skeleton count={3} />
            </p>
          </div>
        </div>
      </div>
    ));
};

export default SkeletonCard;
