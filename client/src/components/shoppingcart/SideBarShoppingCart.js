import { BsCart3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./sidebarshoppingcart.module.scss";
import { useState } from "react";
import { CartState } from "../../contexts/CartContext";
import SideBarShppingCartProduct from "./SideBarShoppingCartProduct";
import { Link } from "react-router-dom";

const SideBarShoppingCart = () => {
  const { state } = CartState();

  const [translate, setTranslate] = useState(100);
  const [display, setDisplay] = useState("none");
  //const quantityRef = useRef();
  const handlePopupOpen = () => {
    setTranslate(0);
    setDisplay("block");
    // console.log(state.cartProducts);
  };

  const total = () => {
    let totalAmount = 0;
    state.cartProducts.forEach((element) => {
      totalAmount += element.product.price * element.quantity;
    });
    return totalAmount;
  };
  const handlePopupClose = () => {
    setTranslate(100);
    setDisplay("none");
  };

  return (
    <div className={styles.wraper}>
      <div>
        <BsCart3
          onClick={handlePopupOpen}
          onScroll={handlePopupClose}
          size={20}
        />
        <span className={styles.productCount}>{state.cartProducts.length}</span>
      </div>
      <div
        className={styles.popup}
        style={{ transform: `translateX(${translate}%)` }}
      >
        <div className={styles.upperSection}>
          <h2>CART</h2>
          <div>
            <AiOutlineClose onClick={handlePopupClose} size={30} />
          </div>
        </div>
        <div className={styles.products}>
          {state.cartProducts.length === 0
            ? "Your cart is currently empty."
            : state.cartProducts.map((product, index) => {
                return (
                  <SideBarShppingCartProduct product={product} key={index} />
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
            <button className={styles.checkoutBtn}>
              <Link
                to={"/cart"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                Checkout
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.shadow}
        onClick={handlePopupClose}
        style={{ display: display }}
      ></div>
    </div>
  );
};

export default SideBarShoppingCart;
