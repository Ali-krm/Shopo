import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import RatingDisplay from "../StarRating/RatingDisplay";
import { usePrevNextButtons } from "../../hooks/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./reviewslider.scss";
const ReviewSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="embla__review">
      <SlArrowLeft
        size={28}
        className="left-arrow"
        onClick={onPrevButtonClick}
        color={prevBtnDisabled ? "gray" : "black"}
        cursor={prevBtnDisabled ? "unset" : "pointer"}
      />
      <div className="embla__viewport__review" ref={emblaRef}>
        <div className="embla__container__review">
          <div className="embla__slide__review">
            <div className="slider-review">
              <div className="review__slider__info">
                <RatingDisplay rate={5} size={16} />
                <p>
                  "I love these pants so much. Such a cool twist to a basic
                  jean. I feel so stylish and comfy...Material is so soft yet
                  rigid and holds me in!"
                </p>
                <div>
                  <span>—KKMCL, </span>
                  <span style={{ textDecoration: "underline" }}>
                    Product 26
                  </span>
                </div>
              </div>
              <div className="review__slider__image__container">
                <img
                  className="review__slider__image"
                  src="https://media.everlane.com/image/upload/c_scale,dpr_2.0,f_auto,q_auto,w_auto/c_limit,w_1400/v1/i/53054392_e829.jpg"
                />
              </div>
            </div>
          </div>
          <div className="embla__slide__review">
            <div className="slider-review">
              <div className="review__slider__info">
                <RatingDisplay rate={5} size={16} />
                <p>
                  "I love these pants! Every time I wear them, I get
                  compliments. I own several in different colors because I love
                  them that much!"
                </p>

                <div>
                  <span>-danimac, </span>
                  <span style={{ textDecoration: "underline" }}>
                    Product 12
                  </span>
                </div>
              </div>
              <div className="review__slider__image__container">
                <img
                  className="review__slider__image"
                  src="https://media.everlane.com/image/upload/c_scale,dpr_2.0,f_auto,q_auto,w_auto/c_limit,w_1400/v1/i/dfefdd5a_67a2.jpg"
                />
              </div>
            </div>
          </div>
          <div className="embla__slide__review">
            <div className="slider-review">
              <div className="review__slider__info">
                <RatingDisplay rate={5} size={16} />
                <p>
                  "I wear this shirt night and day. Will probably get every
                  color at some point. The fabric is SO comfortable, not too
                  thin and not too thick, and so flattering."
                </p>
                <div>
                  <span>—JRKM, </span>
                  <span style={{ textDecoration: "underline" }}>
                    Product 26
                  </span>
                </div>
              </div>
              <div className="review__slider__image__container">
                <img
                  className="review__slider__image"
                  src="https://media.everlane.com/image/upload/c_scale,dpr_2.0,f_auto,q_auto,w_auto/c_limit,w_1400/v1/i/af27a3d5_9269.jpg"
                />
              </div>
            </div>
          </div>
        </div>
        <SlArrowRight
          size={28}
          style={{ alignItems: "center", display: "flex" }}
          className="right-arrow"
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

export default ReviewSlider;
