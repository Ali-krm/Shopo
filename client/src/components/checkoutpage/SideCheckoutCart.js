
import styles from "./checkoutpage.module.scss";
import { CartState } from "../../contexts/CartContext";
import SideCheckOutCartProduct from "./SideCheckOutCartProduct";


const SideCheckoutCart = () => {
  const { state } = CartState();



  const total = () => {
    let totalAmount = 0;
    state.cartProducts.forEach((element) => {
      totalAmount += element.product.price * element.quantity;
    });
    return totalAmount;
  };


  return (
  
      <div
        className={styles.wraper}>
            <div className={styles.main}>    
            <div className={styles.products}>
            {state.cartProducts.length === 0
                ? "Your cart is currently empty."
                : state.cartProducts.map((product, index) => {
                    return (
                        <SideCheckOutCartProduct product={product} key={index} />
                        )
                })}
                </div>
                <div className={styles.giftcard}>
                <input placeholder="Gift card of discount code"/>
                <button>Apply</button>
            </div>
            <div
            className={styles.popupCheckout}
            style={{ display: state.cartProducts.length ? "flex" : "none" }}
            >
                <div className={styles.checkoutDetail}>
                    <div className={styles.subtotal}>Subtotal</div>
                    <div className={styles.subtotalPrice}>${total()}</div>
                </div>
                <div className={styles.shipping}>
                    <div>Shipping</div>
                    <div>Calculated at next step</div>
                </div>
            </div>
                <div className={styles.totalwraper}>
                    <div className={styles.total}>Total</div>
                    <div className={styles.totalPrice}>${total()}</div>
                </div>
          </div>
      </div>
  );
};

export default SideCheckoutCart;
