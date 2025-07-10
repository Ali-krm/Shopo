import { useState } from "react";
import "./slidedown.scss";
import { BsArrowDown } from "react-icons/bs";

const SlideDown = ({ children, titel }) => {
  const [slide, setSlide] = useState("slideup");
  const [arrow, setArrow] = useState(0);

  return (
    <>
      <div
        onClick={() => {
          setSlide((prev) => (prev === "slidedown" ? "slideup" : "slidedown"));
          setArrow((prev) => (prev === 180 ? 0 : 180));
        }}
        className="slidebtn"
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
      <div className={`slidecontent ${slide}`}>{children}</div>
    </>
  );
};

export default SlideDown;
