import styles from "./shoppingcart.module.scss";
import { CartState } from "../../contexts/CartContext";
import ShppingCartProduct from "./ShoppingCartProduct";
import { Link } from "react-router-dom";
import NavBar from "../header/NavBar";
//import CheckOutPage from '../checkoutpage/CheckOutPage'
import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
const ShoppingCart = () => {
  const { state } = CartState();

  const total = () => {
    let totalAmount = 0;
    state.cartProducts.forEach((element) => {
      totalAmount += element.product.price * element.quantity;
    });
    return totalAmount;
  };
  ChangeTitle("Shopping Cart");
  return (
    <motion.div
      className={styles.wraper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.popup}>
        <div className={styles.upperSection}>
          <h2>CART</h2>
        </div>
        <div className={styles.products}>
          {state.cartProducts.length === 0
            ? "Your cart is currently empty."
            : state.cartProducts.map((product, index) => {
                return <ShppingCartProduct product={product} key={index} />;
              })}
          <div
            className={styles.popupCheckout}
            style={{ display: state.cartProducts.length ? "flex" : "none" }}
          >
            <div className={styles.checkoutDetail}>
              <div className={styles.total}>Subtotal</div>

              <div className={styles.totalPrice}>${total()}</div>
            </div>
            <button className={styles.checkoutBtn}>
              <Link
                to={"/cart/checkout"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Checkout
              </Link>
            </button>
          </div>
        </div>
      </div>
      {/* <Routes>
                <Route path="/checkout" element={<CheckOutPage/>}/>
        </Routes> */}
    </motion.div>
  );
};

export default ShoppingCart;
