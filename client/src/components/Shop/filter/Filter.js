import styles from "./filter.module.scss";
import { BsArrowDown } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import PriceRange from "./PriceRange";
import CheckBox from "./Checkbox";
import { FilterState } from "../../../contexts/FilterContext";
import axios from "axios";
const Filter = ({ onSortChnage }) => {
  const { filterDispatch, filterState, setResetFilter } = FilterState();
  const [filterActive, setFilterActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [sortText, setSortText] = useState("SORT BY");
  const [slide, setSlide] = useState("slide");
  const [brandname, setBrandname] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [collection, setCollection] = useState([]);
  const getFilters = async () => {
    let { data } = await axios.get("http://localhost:5164/Store/filters");
    filterDispatch({
      type: `SET_MAX_PRICE`,
      payload: data.maxPrice,
    });
    setBrandname(data.brands);
    setCollection(data.collection);
    setOccasion(data.occasions);
    // filterDispatch({ type: "FILTER_BY_UPPERBOUND", payload: data.maxPrice });
  };
  useEffect(() => {
    getFilters();
    // SET_MAX_PRICE
  }, []);
  return (
    <section className={styles.filtersection}>
      <div className={styles.filterContainer}>
        <div
          className={styles.sortwraper}
          onClick={() => setSortActive(!sortActive)}
        >
          <div className={styles.sortcontainer}>
            <span>{sortText}</span>
            <BsArrowDown
              style={{
                transform: `rotate(${sortActive === false ? 0 : 180}deg)`,
              }}
              className={styles.icon}
            />
          </div>
          {sortActive && (
            <div className={styles.sortdropdown}>
              <div
                className={styles.sortOption}
                onClick={() => {
                  // sortDispatch({ type: "sortBy", payload: "" });
                  // sortDispatch({ type: "sortBy", payload: "PriceHighToLow" });
                  onSortChnage("PriceHighToLow");
                  setSortText("SORT BY PRICE");
                  // console.log(sortState);
                }}
              >
                Price,high to low
              </div>
              <div
                className={styles.sortOption}
                onClick={() => {
                  // sortDispatch({ type: "sortBy", payload: "" });
                  // sortDispatch({ type: "sortBy", payload: "PriceLowToHigh" });
                  onSortChnage("PriceLowToHigh");
                  setSortText("SORT BY PRICE");
                }}
              >
                Price,low to high
              </div>
              <div
                className={styles.sortOption}
                onClick={() => {
                  // sortDispatch({ type: "sortBy", payload: "" });
                  // sortDispatch({
                  //   type: "sortBy",
                  //   payload: "RateHighToLow",
                  // });
                  onSortChnage("RateHighToLow");
                  setSortText("SORT BY RATE");
                }}
              >
                Rate,high to low
              </div>
              <div
                className={styles.sortOption}
                onClick={() => {
                  // sortDispatch({ type: "sortBy", payload: "" });
                  // sortDispatch({
                  //   type: "sortBy",
                  //   payload: "RateLowToHigh",
                  // });
                  onSortChnage("RateLowToHigh");
                  setSortText("SORT BY RATE");
                }}
              >
                Rate,low to high
              </div>
            </div>
          )}
        </div>
        <div className={styles.filterwraper}>
          <div
            className={styles.filter}
            onClick={() => {
              setFilterActive(!filterActive);
              setSlide((prev) =>
                prev == "slide" || prev == "slideup" ? "slidedown" : "slideup"
              );
              setSortActive(false);
            }}
          >
            <span>FILTER</span>
            <BsArrowDown
              style={{
                transform: `rotate(${filterActive === false ? 0 : 180}deg)`,
              }}
              className={styles.icon}
            />
          </div>
        </div>
      </div>
      {/* <div className={`${styles.filters}`}> */}
      <div className={`${styles.filtercontentwraper}  ${styles[slide]}`}>
        <div className={`${styles.filtercontent}`}>
          <div
            className={`${styles.pricefilter}`}
            style={{ display: slide == "slideup" ? "none" : "block" }}
          >
            <PriceRange />
          </div>
          <div className={styles.brandfilter}>
            <h4>Brand</h4>
            {brandname.map((brand, index) => {
              return <CheckBox name={brand} key={index} category={"BRAND"} />;
            })}
          </div>
          <div className={styles.brandfilter}>
            <h4>Collection</h4>
            {collection.map((coll, index) => {
              return (
                <CheckBox name={coll} key={index} category={"COLLECTION"} />
              );
            })}
          </div>
          <div className={styles.brandfilter}>
            <h4>Occasion</h4>
            {occasion.map((occ, index) => {
              return <CheckBox name={occ} key={index} category={"OCCASION"} />;
            })}
          </div>
        </div>
        <div className={styles.filtertags}>
          <div className={styles.text}>FILTER TAGS</div>
          {/* <div className={styles.tagcontainer}> */}
          {filterState.filterByBrand.length != 0 ||
          filterState.filterByCollection.length != 0 ||
          filterState.filterByOccasion.length != 0 ? (
            <div className={styles.tagcontainer}>
              <>
                {filterState.filterByBrand.map((item) => {
                  return (
                    <div className={styles.tag} key={item}>
                      <span className={styles.remove}>
                        <IoCloseOutline
                          size={18}
                          onClick={() => {
                            filterDispatch({
                              type: `REMOVE_BRAND_FILTER`,
                              payload: item,
                            });
                          }}
                        />
                      </span>
                      <span>{item}</span>
                    </div>
                  );
                })}
                {filterState.filterByCollection.map((item) => {
                  return (
                    <div className={styles.tag} key={item}>
                      <span className={styles.remove}>
                        <IoCloseOutline
                          size={18}
                          onClick={() =>
                            filterDispatch({
                              type: "REMOVE_COLLECTION_FILTER",
                              payload: item,
                            })
                          }
                        />
                      </span>
                      <span>{item}</span>
                    </div>
                  );
                })}
                {filterState.filterByOccasion.map((item) => {
                  return (
                    <div className={styles.tag} key={item}>
                      <span className={styles.remove}>
                        <IoCloseOutline
                          size={18}
                          onClick={() =>
                            filterDispatch({
                              type: `REMOVE_OCCASION_FILTER`,
                              payload: item,
                            })
                          }
                        />
                      </span>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </>
            </div>
          ) : null}
          {/* </div> */}
          <div className={styles.tagsbtn}>
            <button
              className={styles.clear}
              onClick={() => {
                filterDispatch({
                  type: "CLEAR_FILTERS",
                });
              }}
            >
              Clear All
            </button>
            <button
              className={styles.close}
              onClick={() => {
                setFilterActive(false);
                setSlide("slideup");
              }}
            >
              Close
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Filter;
