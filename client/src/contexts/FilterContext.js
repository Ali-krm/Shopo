import { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "./FilterReducer";

const Filter = createContext(null);

const FilterContext = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    filterByBrand: [],
    filterByCollection: [],
    filterByOccasion: [],
    upperBound: 1000,
    lowerBound: 0,
    maxPrice: null,
  });

  const [resetFilter, setResetFilter] = useState(false);
  return (
    <Filter.Provider
      value={{ filterState, filterDispatch, resetFilter, setResetFilter }}
    >
      {children}
    </Filter.Provider>
  );
};

export const FilterState = () => {
  return useContext(Filter);
};

export default FilterContext;
