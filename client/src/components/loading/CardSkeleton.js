import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./cardskeleton.scss";
const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="skeleton-top">
        <Skeleton width={"100%"} height={"38vh"} />
      </div>
      <div className="skeleton-bottom">
        <div className="skeleton-brand" style={{ width: "50%" }}>
          <Skeleton />
        </div>
        <div className="skeleton-brand" style={{ width: "80%" }}>
          <Skeleton />
        </div>
        <div className="skeleton-brand" style={{ width: "50%" }}>
          <Skeleton />
        </div>
        <div className="skeleton-brand" style={{ width: "40%" }}>
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
