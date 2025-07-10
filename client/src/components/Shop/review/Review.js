import moment from "moment";
import RatingDisplay from "../../StarRating/RatingDisplay";
import styles from "./review.module.scss";
const Review = ({ review }) => {
  let date = moment(review.reviewDate).format("l");
  return (
    <div className={styles.reviewcontainer}>
      <div className={styles.reviewwraper}>
        <div className={styles.name}>{review.name}</div>
        <RatingDisplay rate={review.rate} size={20} />
        <div className={styles.title}>{review.title}</div>
        <p className={styles.review}>{review.reviewText}</p>
      </div>
      <div className={styles.reviewdate}>{date}</div>
      {/* 09/28/22 */}
    </div>
  );
};

export default Review;
