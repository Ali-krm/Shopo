import Footer from "../footer/Footer";

import Filter from "./filter/Filter";
import Items from "./Items";
import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./shop.module.scss";
import { useState } from "react";

import FilterContext from "../../contexts/FilterContext";
const Shop = () => {
  ChangeTitle("Shop");
  const [searchParam] = useSearchParams();
  const { gender, category } = useParams();
  const searchTerm = searchParam.get("searchTerm") || "";
  // const [sortState, sortDispatch] = useReducer(sortReducer, {
  //   sortBy: "",
  //   byRating: "",
  //   searchQuery: "",
  // });
  const [sortBy, setSortBy] = useState("");
  return (
    <FilterContext>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {searchTerm ? (
          <h1
            className={styles.shoptitle}
          >{`Search Result For "${searchTerm}"`}</h1>
        ) : (
          <>
            {!category ? (
              <h1 className={styles.shoptitle}>{`${gender}'s Clothes`}</h1>
            ) : (
              <h1 className={styles.shoptitle}>{`${gender}'s ${category}`}</h1>
            )}
          </>
        )}
        <Filter onSortChnage={setSortBy} />
        <Items
          searchTerm={searchTerm}
          gender={gender}
          category={category}
          sortBy={sortBy}
        />
        <Footer />
      </motion.div>
    </FilterContext>
  );
};

export default Shop;
