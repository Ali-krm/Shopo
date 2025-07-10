export const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_BRAND":
      return {
        ...state,
        filterByBrand: [...state.filterByBrand, action.payload],
      };
    case "REMOVE_BRAND_FILTER":
      return {
        ...state,
        filterByBrand: state.filterByBrand.filter((c) => c !== action.payload),
      };
    case "REMOVE_OCCASION_FILTER":
      return {
        ...state,
        filterByOccasion: state.filterByOccasion.filter(
          (c) => c !== action.payload
        ),
      };
    case "REMOVE_COLLECTION_FILTER":
      return {
        ...state,
        filterByCollection: state.filterByCollection.filter(
          (c) => c !== action.payload
        ),
      };
    case "FILTER_BY_OCCASION":
      return {
        ...state,
        filterByOccasion: [...state.filterByOccasion, action.payload],
      };
    case "FILTER_BY_COLLECTION":
      return {
        ...state,
        filterByCollection: [...state.filterByCollection, action.payload],
      };
    case "FILTER_BY_LOWERBOUND":
      return { ...state, lowerBound: action.payload };
    case "FILTER_BY_UPPERBOUND":
      return { ...state, upperBound: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };

    case "CLEAR_FILTERS":
      return {
        filterByBrand: [],
        filterByCollection: [],
        filterByOccasion: [],
        upperBound: 1000,
        lowerBound: 0,
      };
    default:
      return state;
  }
};
