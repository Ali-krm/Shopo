export const sortReducer = (state, action) => {
  switch (action.type) {
    case "sortBy":
      return { ...state, sortBy: action.payload };
    // case "FILTER_BY_RATING":
    //   return { ...state, byRating: action.payload };
    // case "FILTER_BY_SEARCH":
    //   return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byStock: false, byFastDelivery: false, byRating: 0 };
    default:
      return state;
  }
};
