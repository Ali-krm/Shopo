import { BsStarFill } from "react-icons/bs";
import styles from "./rating.module.scss";
const RatingDisplay = ({ rate, size }) => {
  //const rate = 3.5;
  let whole = Math.trunc(rate);
  let decimal = Math.trunc((rate % 1) * 100);

  return (
    <div className={styles.ratedisplay}>
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="gold" offset={`${decimal}%`} />
          <stop stopColor="rgb(196, 196, 196)" offset={`${decimal}%`} />
        </linearGradient>
      </svg>
      {[...Array(5)].map((star, index) => {
        const rating = index + 1;
        return (
          <BsStarFill
            value={rating}
            key={index}
            className={styles.star}
            size={size}
            style={{
              fill:
                rating <= whole
                  ? "gold"
                  : "rgb(196, 196, 196)" && rating === whole + 1
                  ? // url(#blue-gradient)
                    `gold`
                  : "rgb(196, 196, 196)",
              marginRight: "2px",
            }}
          />
        );
      })}
    </div>
  );
};

export default RatingDisplay;
