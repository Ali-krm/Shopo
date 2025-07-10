export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          {
            product: action.payload.product,
            quantity: 1,
            shopcolor: action.payload.shopcolor ? action.payload.shopcolor : "",
            shopsize: action.payload.shopsize ? action.payload.shopsize : "",
          },
        ],
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "REMOVE_FROM_CART":
      let duplicate = [...state.cartProducts];
      let index = state.cartProducts.findIndex(
        (c) =>
          c.shopcolor === action.payload.shopcolor &&
          c.product.id === action.payload.product.id &&
          c.shopsize === action.payload.shopsize
      );
      if (index > -1) {
        duplicate.splice(index, 1);
      }

      console.log(index);
      return {
        ...state,
        cartProducts: duplicate,
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cartProducts: state.cartProducts.filter((c) =>
          c.id === action.payload.id
            ? (c.quantity = action.payload.quantity)
            : c.quantity
        ),
      };

    default:
      return state;
  }
};


