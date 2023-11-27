import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";

const ClassProgress = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);

  const { data: getDataForReview = [] } = useQuery({
    queryKey: ["getDataForReview" ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getDataForReview/${id}`);
      return res.data;
    },
  });
  console.log(getDataForReview.className);

  const { data: getReviews = [] } = useQuery({
    queryKey: ["getReviews",getDataForReview],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allReviews/${getDataForReview.className}`);
      return res.data;
    },
  });
  console.log(getReviews);

 
  return (
    <div>
      <div>
        {getReviews?.map((review) => (
          <div key={review._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center mb-4">
              <img
                src={review.reviewerImg}
                alt={`Profile of ${review.reviewer}`}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <p className="text-lg font-semibold">{review.reviewer}</p>
            </div>
            <p className="text-gray-700 mb-4">{review.description}</p>
            <div className="text-yellow-400">
              <Rating
                initialRating={review.reviewCount}
                emptySymbol={<span className="text-gray-300">&#9734;</span>}
                fullSymbol={<span className="text-yellow-400">&#9733;</span>}
                readonly // Make the rating read-only
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassProgress;
