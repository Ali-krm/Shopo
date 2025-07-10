// import { useState } from "react";
import useState from "react-usestateref";
import styles from "./checkbox.module.scss";
import { FilterState } from "../../../contexts/FilterContext";
import { useEffect } from "react";
const CheckBox = ({ name, category }) => {
  const [, setChecked, ref] = useState(false);
  const { filterDispatch, filterState } = FilterState();
  const [, setExist, ExistRef] = useState(false);

  useEffect(() => {
    if (category == "BRAND") {
      setExist(filterState.filterByBrand.includes(name));
      // console.log("inc",filterState.filterByBrand.includes(name));
    } else if (category == "COLLECTION") {
      setExist(filterState.filterByCollection.includes(name));
    } else if (category == "OCCASION") {
      setExist(filterState.filterByOccasion.includes(name));
    }
    // console.log(ref.current, ExistRef.current);
  }, [filterState, ref.current, ExistRef.current]);

  return (
    <>
      <div className={styles.box}>
        <input
          id="input"
          type="checkbox"
          checked={ref.current && ExistRef.current}
          className={styles.checkbox}
          onChange={() => {
            setChecked(!ref.current);
            if (ref.current === true) {
              filterDispatch({ type: `FILTER_BY_${category}`, payload: name });
            } else {
              filterDispatch({
                type: `REMOVE_${category}_FILTER`,
                payload: name,
              });
            }
          }}
          value={name}
        />
        <label htmlFor="input">{name}</label>
      </div>
    </>
  );
};

export default CheckBox;
