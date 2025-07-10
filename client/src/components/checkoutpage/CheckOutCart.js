import styles from "./CheckOutCart.module.scss"
import { CartState } from "../../contexts/CartContext";
import CheckOutCartProduct from "./CheckOutCartProduct.js"



const CheckOutCart = () => {
  const { state } = CartState();
  

  const total = () => {
    let totalAmount = 0;
    state.cartProducts.forEach((element) => {
      totalAmount += element.product.price * element.quantity;
    });
    return totalAmount;
  };


  return (
    
      <div className={styles.wraper}>
    
      <div
        className={styles.popup}
      >
        <div className={styles.upperSection}>
          <h2>CART</h2>
        </div>
        <div className={styles.products}>
          {state.cartProducts.length === 0
            ? "Your cart is currently empty."
            : state.cartProducts.map((product, index) => {
                return (
                  <CheckOutCartProduct product={product} key={index} />
                );
              })}
          <div
            className={styles.popupCheckout}
            style={{ display: state.cartProducts.length ? "flex" : "none" }}
          >
            <div className={styles.checkoutDetail}>
              <div className={styles.total}>Subtotal</div>

              <div className={styles.totalPrice}>${total()}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CheckOutCart;
