import styles from "./sidebarshoppingcart.module.scss";
import { CartState } from "../../contexts/CartContext";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
const SideBarShppingCartProduct = ({ product }) => {
  const { state, dispatch } = CartState();

  const quantityRef = useRef();

  const handelIncremnt = (product) => {
    quantityRef.current.value++;
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: product.id,
        quantity: quantityRef.current.value,
      },
    });
  };
  const handelDecrement = (product) => {
    if (quantityRef.current.value === "1") {
      dispatch({ type: "REMOVE_FROM_CART", payload: product });
    } else {
      quantityRef.current.value--;
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: product.id,
          quantity: quantityRef.current.value,
        },
      });
    }
  };

  const handelChange = (product, e) => {
    // console.log(e.target.value);
    // console.log(state.cartProducts);
    if (!e.target.value) {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: product.id,
          quantity: 1,
        },
      });
    } else {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: product.id,
          quantity: e.target.value,
        },
      });
    }
  };
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img src={product.product.images[0]} alt="product" />
      </div>
      <div className={styles.productMMDetail}>
        <div className={styles.productUpper}>
          <div className={styles.title}>
            {product.product.name}/<br />
            {product.shopcolor}/{product.shopsize}
          </div>
          <div>
            <AiOutlineClose
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product,
                });
                console.log(product);
              }}
              size={20}
            />
          </div>
        </div>
        <div className={styles.productLower}>
          <div className={styles.price}>${product.product.price}</div>
          <div className={styles.quantity}>
            {quantityRef.current && quantityRef.current.value === "1" ? (
              <div
                className={styles.decremont}
                onClick={() => handelDecrement(product)}
              >
                <FaRegTrashAlt size={18} />
              </div>
            ) : (
              <div
                className={styles.decremont}
                onClick={() => handelDecrement(product)}
              >
                -
              </div>
            )}
            <input
              ref={quantityRef}
              type="number"
              onChange={(e) => handelChange(product, e)}
              className={styles.quantityInput}
              value={product.quantity}
            />
            <div
              className={styles.incremont}
              onClick={() => handelIncremnt(product)}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarShppingCartProduct;
