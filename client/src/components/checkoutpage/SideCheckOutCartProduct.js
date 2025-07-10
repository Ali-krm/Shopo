import styles from "./checkoutpage.module.scss";
import {covertsize} from '../../utils/sizeConvert.js'

const SideCheckOutCartProduct = ({ product }) => {
  



  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img src={product.product.images[0]} alt="product" />
        <div className={styles.cout}>{product.quantity}</div>
      </div>
      <div className={styles.productMMDetail}>
        <div className={styles.productUpper}>
          {product.product.name}/{product.shopcolor}<br/>/{covertsize(product.shopsize)}
        </div>
        <div className={styles.productLower}>
          ${product.product.price}
        </div>
      </div>
    </div>
  );
};

export default SideCheckOutCartProduct;
