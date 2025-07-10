import RatingDisplay from "../../StarRating/RatingDisplay";
import styles from "./Reviews.module.scss";
import { useEffect, useState } from "react";
import WriteReview from "./WriteReview";
import Review from "./Review";
const Reviews = ({ product }) => {
  const [slide, setSlide] = useState("");
  const [reviews, setReviews] = useState([]);

  const handelsetReview = (review) => {

    if (review) {
      setReviews([...reviews, review]);
    } else {
      setReviews(product?.reviews);
    }
  };
  useEffect(() => {
    handelsetReview();
  }, [product, reviews]);

  return (
    <div className={styles.reviewcontainer}>
      <div className={styles.ratecontainer}>
        <div className={styles.ratewraper}>
          <span className={styles.ratenumber}>{product.rating}</span>
          <RatingDisplay rate={product.rating} size={30} />
        </div>
        <div
          className={styles.ratecount}
        >{`Based on ${product.rateCount} Reviews`}</div>
      </div>
      <button
        className={styles.writebtn}
        onClick={() => {
          setSlide("slidedown");
        }}
      >
        Write A Review
      </button>
      <div className={`${styles.filtercontentwraper} ${styles[slide]}`}>
        <WriteReview productId={product.id} handelReview={handelsetReview} />
      </div>
      <div className={styles.title}>REVIEWS</div>
      <div>
        {reviews?.length > 0 ? (
          product.reviews.map((review) => {
            return <Review review={review} key={review.id} />;
          })
        ) : (
          <div
            style={{
              paddingTop: "40px",
              marginTop: "20px",
              borderTop: "1px solid #E8E8E1",
            }}
          >
            No Reviews Yet Be the First One to Review This Product !
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
