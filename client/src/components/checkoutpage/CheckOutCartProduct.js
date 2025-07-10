import styles from "./CheckOutCart.module.scss";
//import { CartState } from "../../contexts/CartContext";
//import { useRef } from "react";

const CheckOutCartProduct = ({ product }) => {
  return (
    <div className={styles.cartwraper}>
      <div className={styles.imageTitle}>
        <div className={styles.imagecontainer}>
          <img src={product.images[0]} alt="product" />
        </div>
        <div className={styles.title}>{product.name}</div>
      </div>
      <div className={styles.qty}>QTY: {product.quantity}</div>
      <div className={styles.price}>${product.price}</div>
    </div>
  );
};

export default CheckOutCartProduct;
