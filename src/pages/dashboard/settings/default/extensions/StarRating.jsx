import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function StarRating({ rating }) {
  const totalStars = 5;

  return (
    <div className="flex space-x-1 text-yellow-500 text-xs">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index}>
            {rating >= starValue ? (
              <FaStar />
            ) : rating >= starValue - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
