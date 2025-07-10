import { useEffect, useState } from "react";
import styles from "./CardSlider.module.scss";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import ShopCard from "../Shop/ShopCard";
import { usePrevNextButtons } from "../../hooks//EmblaCarouselArrowButtons";
const CardSlider = ({ type, products }) => {
  const [Products, setProducts] = useState([]);
  const [slidePercentage, setSlidePercentage] = useState(0);
  const [isLeftReached, setIsLeftReached] = useState(false);
  const [isRightReached, setIsRightReached] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const getFeatured = async () => {
    let params = new URLSearchParams();
    params.append("featured", true);
    params.append("pageSize", 10);
    let { data } = await axios.get("http://localhost:5164/Store", {
      params: params,
    });
    setProducts(data);
  };
  const getBestSelling = async () => {
    let params = new URLSearchParams();
    params.append("sortBy", "BestSelling");
    params.append("pageSize", 10);
    let { data } = await axios.get("http://localhost:5164/Store", {
      params: params,
    });
    setProducts(data);
  };
  const getBrandProducts = async () => {
    // console.log(brand);
    let params = new URLSearchParams();
    params.append("brands", type);
    params.append("pageSize", 10);
    await axios
      .get("http://localhost:5164/Store", {
        params: params,
      })
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      });
  };

  useEffect(() => {
    if (type === "bestSelling") {
      getBestSelling();
    } else if (type === "Featured") {
      getFeatured();
    }
    products && setProducts(products);
    // type === "bestSelling" ? getBestSelling() : getFeatured();
  }, []);

  const leftMovement = () => {
    if (slidePercentage === 0) {
      setIsLeftReached(true);
    } else {
      setSlidePercentage(slidePercentage + 100);
      setIsLeftReached(false);
      setIsRightReached(false);
    }
  };

  const rightMovement = () => {
    if (slidePercentage === -100 * 6) {
      setIsRightReached(true);
    } else {
      setSlidePercentage(slidePercentage - 100);
      setIsRightReached(false);
      setIsLeftReached(false);
    }
  };
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    // <div style={{ width: "85%" }}>
    //   {/* <div className="info">
    //     <h2 className="producttitle">Featured Products</h2>
    //     <div className="discription">See What's Trending Right Now</div>
    //   </div> */}
    //   <ul className="card-slider">
    //     {Products.map((product, index) => {
    //       return (
    //         <li
    //           className="cardwrap"
    //           key={index}
    //           style={{ transform: `translateX(${slidePercentage}%)` }}
    //         >
    //           <Card slide={slidePercentage} product={product} />
    //         </li>
    //       );
    //     })}

    //     <button
    //       className="card-left-btn"
    //       disabled={isLeftReached}
    //       onClick={leftMovement}
    //     >
    //       <TbChevronLeft size={42} />
    //     </button>
    //     <button
    //       className="card-right-btn"
    //       disabled={isRightReached}
    //       onClick={rightMovement}
    //     >
    //       <TbChevronRight size={42} />
    //     </button>
    //   </ul>
    // </div>
    <div className={styles.embla}>
      <SlArrowLeft
        size={28}
        className={styles.leftArrow}
        onClick={onPrevButtonClick}
        color={prevBtnDisabled ? "gray" : "black"}
        cursor={prevBtnDisabled ? "unset" : "pointer"}
      />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {Products.map((product) => (
            <div className={styles.embla__slide} key={product?.id}>
              <ShopCard
                product={product}
                type={products?.length > 0 ? "shop" : undefined}
              />
            </div>
          ))}
        </div>
        <SlArrowRight
          size={28}
          style={{ alignItems: "center", display: "flex" }}
          className={styles.rightArrow}
          onClick={onNextButtonClick}
          color={nextBtnDisabled ? "gray" : "black"}
          cursor={nextBtnDisabled ? "unset" : "pointer"}
        />
      </div>

      {/* <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div> */}
    </div>
  );
};

export default CardSlider;
