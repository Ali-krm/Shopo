import styles from "./pricerange.module.scss";
import { FilterState } from "../../../contexts/FilterContext";
import { useEffect, useRef, useState } from "react";

const PriceRange = () => {
  const maxRangeRef = useRef();
  const minRangeRef = useRef();
  const progressRef = useRef();
  const { filterDispatch, filterState } = FilterState();
  const [maxprice, setMaxprice] = useState(1000);
  const [minprice, setMinprice] = useState(0);
  // const [maxProductPrice, setMinprice] = useState(0);

  let minGap = 10;

  // useEffect(() => {
  //   //this was't here
  //   if (filterState.maxPrice) {
  //     setMaxprice(filterState.maxPrice);
  //     console.log(maxprice);
  //   }
  // }, [filterState.maxPrice]);

  function slideOne() {
    if (
      parseInt(maxRangeRef.current.value) -
        parseInt(minRangeRef.current.value) <=
      minGap
    ) {
      minRangeRef.current.value = parseInt(maxRangeRef.current.value) - minGap;
    }

    setMinprice(minRangeRef.current.value);
    filterDispatch({
      type: "FILTER_BY_LOWERBOUND",
      payload: parseInt(minRangeRef.current.value),
    });
    fillColor();
  }
  function slideTwo() {
    if (
      parseInt(maxRangeRef.current.value) -
        parseInt(minRangeRef.current.value) <=
      minGap
    ) {
      maxRangeRef.current.value = parseInt(minRangeRef.current.value) + minGap;
    }
    setMaxprice(maxRangeRef.current.value);
    filterDispatch({
      type: "FILTER_BY_UPPERBOUND",
      payload: parseInt(maxRangeRef.current.value),
    });
    fillColor();
  }
  function fillColor() {
    ///1000
    let sliderMaxValue = 1000;
    let percent1 = (minRangeRef.current.value / sliderMaxValue) * 100;
    let percent2 = (maxRangeRef.current.value / sliderMaxValue) * 100;
    progressRef.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , rgb(0,53,102) ${percent1}% , rgb(0,53,102) ${percent2}%, #dadae5 ${percent2}%)`;
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.priceTitle}>Price</h4>
      <div className={styles.priceDisplay}>
        <span id="range1">${minprice}</span>
        <span className={styles.seperator}>-</span>
        <span id="range2">${maxprice}</span>
      </div>
      <div className={styles.container}>
        <div
          ref={progressRef}
          className={styles.sliderTrack}
          style={{
            background: maxprice === 1000 ? "rgb(0,53,102)" : null,
          }}
        ></div>
        <input
          ref={minRangeRef}
          onInput={slideOne}
          type="range"
          min="0"
          max={1000}
          defaultValue={0}
          id="slider-1"
          className={styles.slider}
        />
        <input
          type="range"
          onInput={slideTwo}
          ref={maxRangeRef}
          min="0"
          max={1000}
          defaultValue={1000}
          id="slider-2"
          className={styles.slider}
        />
      </div>
    </div>
  );
};

export default PriceRange;
