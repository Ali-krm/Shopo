import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "./starrating.module.scss"
import { AiFillStar } from "react-icons/ai";
const StarRating = ({ rating, setRating }) => {
  // const [rating, setRating] = useState(-1);
  const [hover, setHover] = useState(-1);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        return (
          <BsStarFill
            key={index}
            className={
              index <= hover || index <= rating.current
                ? styles.activestar
                : styles.star
            }
            size={35}
            onMouseEnter={() => {
              setHover(index);
            }}
            onMouseLeave={() => setHover(-1)}
            onClick={() => {
              setRating(index);
              // setHover(index);
              // console.log(rating.current);
            }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
