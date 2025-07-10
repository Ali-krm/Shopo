import { useContext, createContext, useReducer } from "react";

import { cartReducer } from "../contexts/CartReducer";
import useLocalStorage from "use-local-storage";
const Cart = createContext(null);

const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cartProducts: [],
  });

  // const [filterState, filterDispatch] = useReducer(filterReducer, {
  //   filterByBrand: [],
  //   filterByCollection: [],
  //   filterByOccasion: [],
  //   upperBound: 1000,
  //   lowerBound: 0,
  //   maxPrice: null,
  // });

  // const [resetFilter, setResetFilter] = useState(false);

  const [auth, setAuth] = useLocalStorage("auth", {});
  const [localWishlist, setLocalwishlist] = useLocalStorage(
    "localWishlist",
    []
  );

  return (
    <Cart.Provider
      value={{
        auth,
        setAuth,
        state,
        dispatch,
        localWishlist,
        setLocalwishlist,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default CartContext;
