// import { useState } from "react";
import useState from "react-usestateref";
import styles from "./Reviews.module.scss";
import StarRating from "../../StarRating/StarRating";
import axios from "axios";
import { CartState } from "../../../contexts/CartContext";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const WriteReview = ({ productId, handelReview }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [, setRating, rating] = useState(-1);
  const { auth } = CartState();
  useEffect(() => {
    if (auth?.accessToken) {
      const user = jwtDecode(auth?.accessToken);
      setName(user.unique_name);
    } else {
      setName("");
    }
  }, []);
  const postReview = async () => {
    let { data, status } = await axios.post(
      "http://localhost:5164/Store/post",
      {
        Name: name,
        reviewText: text,
        title: title,
        rate: rating.current + 1,
        productId: productId,
      }
    );
    console.log(data);
    if (status === 200) {
      handelReview(data);
      setName("");
      setText("");
      setTitle("");
      setRating(-1);
    }
  };

  return (
    <div className={styles.writecontainer}>
      <div className={styles.left}>
        <span>Your Rating</span>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <div className={styles.right}>
        <div className={styles.dualinput}>
          <div className={styles.inputsec}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputsec}>
            <label htmlFor="name" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.review}>
          <label htmlFor="review" className={styles.label}>
            Review
          </label>
          <textarea
            id="review"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className={styles.submitbtn} onClick={postReview}>
          Submit
        </button>
      </div>
    </div>
  );
  //   <div>Write A Review</div>;
};

export default WriteReview;
