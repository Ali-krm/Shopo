import { CartState } from "../../contexts/CartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import RatingDisplay from "../StarRating/RatingDisplay";
import { BsPersonCircle } from "react-icons/bs";
import "./reviews.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFetch from "../../hooks/useFetch";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { auth } = CartState();

  // const axiosPrivate = useAxiosPrivate();
  // const getReviews = async () => {
  //   axios.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${auth?.accessToken}`;
  //   let review;
  //   if (auth?.role == "Admin") {
  //     const { data } = await axiosPrivate.get(
  //       `http://localhost:5164/Store/reviews`
  //     );

  //     review = data;
  //   }
  //   if (auth?.role == "User") {
  //     const { data } = await axiosPrivate.get(
  //       `http://localhost:5164/Store/user/reviews`
  //     );
  //     review = data;
  //   }
  //   setReviews(review);
  //   try {
  //   } catch (err) {
  //     console.error(err);
  //     navigate("/login", { state: { from: location }, replace: true });
  //   }
  // };
  // if (auth?.role == "Admin") {
  const { data, isLoading } = useFetch(
    auth?.role == "Admin"
      ? `http://localhost:5164/Store/reviews`
      : `http://localhost:5164/Store/user/reviews`
  );
  // }
  // useEffect(() => {
  //   getReviews();
  // }, []);
  return (
    <div className="dashboard-reviews">
      <div className="reviews-title">Reviews</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.length > 0 ? (
        data?.map((review) => {
          return (
            // <div className={"reviewcontainer"}>
            <div className={"reviewwraper"} key={review.id}>
              <div className="review-top">
                <div className="review-info">
                  <BsPersonCircle size={25} />
                  <div className="review-top-left">
                    <div className={"name"}>{review.name}</div>
                    <div className="review-rate">
                      <RatingDisplay rate={review.rate} size={20} />
                      <span style={{ marginLeft: "5px" }}>{review.rate}</span>
                    </div>
                  </div>
                </div>
                <div className={"reviewdate"}>
                  {moment(review.reviewDate).format("l")}
                </div>
              </div>
              <div className={"review-title"}>"{review.title}"</div>
              <p className={"review-text"}>{review.reviewText}</p>
            </div>
            // </div>
          );
        })
      ) : (
        <div>No Reviews</div>
      )}
    </div>
  );
};

export default Reviews;
