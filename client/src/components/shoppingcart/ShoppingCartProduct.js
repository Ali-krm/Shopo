import styles from "./shoppingcart.module.scss";
//import { CartState } from "../../contexts/CartContext";
//import { useRef } from "react";
import { covertsize } from "../../utils/sizeConvert.js";

const ShppingCartProduct = ({ product }) => {
  return (
    <div className={styles.cartwraper}>
      <div className={styles.imageTitle}>
        <div className={styles.imagecontainer}>
          <img src={product.product.images[0]} alt="product" />
        </div>
        <div className={styles.title}>
          {product.product.name}/{product.shopcolor}/
          {covertsize(product.shopsize)}
        </div>
      </div>
      <div className={styles.qty}>QTY: {product.quantity}</div>
      <div className={styles.price}>${product.product.price}</div>
    </div>
  );
};

export default ShppingCartProduct;
