import { useState } from "react";
import styles from "./faq.module.scss";
import { BsArrowDown } from "react-icons/bs";

const InfoSlideDown = ({ children, titel }) => {
  const [slide, setSlide] = useState("slideup1");
  const [arrow, setArrow] = useState(0);

  return (
    <>
      <div
        onClick={() => {
          setSlide((prev) =>
            prev === "slidedown" ? "slideup" : "slidedown"
          );
          setArrow((prev) => (prev === 180 ? 0 : 180));
        }}
        className={styles.slidebtn}
      >
        <span>{titel}</span>
        <span>
          <BsArrowDown
            style={{
              transform: `rotate(${arrow}deg)`,
              transition: "0.5s ease",
            }}
          />
        </span>
      </div>
      <div className={`${styles.slidecontent} ${styles[slide]}`}>
        {children}
      </div>
    </>
  );
};

export default InfoSlideDown;
