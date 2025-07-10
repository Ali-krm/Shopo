import { useRef, useState } from "react";
import useComponentVisible from "../../hooks/useComponentVisible";
import { BiDotsHorizontalRounded } from "react-icons/bi";
const Dropdown = ({ children }) => {
  // const [open, setOpen] = useState(false);

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        
      }}
    >
      <BiDotsHorizontalRounded
        size={20}
        onClick={() => {
          setIsComponentVisible(true);
          if (isComponentVisible) {
            setIsComponentVisible(false);
          }
        }}
        style={{ cursor: "pointer", zIndex: "0" }}
      />

      {isComponentVisible && children}
    </div>
  );
};

export default Dropdown;
