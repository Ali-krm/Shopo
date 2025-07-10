import { AiFillStar } from "react-icons/ai";
import {
  MdOutlineAddShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import "./card.scss";
import { CartState } from "../../contexts/CartContext";

const Card = ({ product, slide }) => {
  const { state, dispatch } = CartState();
  return (
    <div
      className="card-container"
      // style={{ transform: `translateX(${slide}%)` }}
    >
      <div className="img-container">
        <img src={product.image} className="img-card" alt="prodect pictures" />
      </div>
      <div className="rating-container">
        <AiFillStar className="star" />
        <span className="rate">{product.ratings}(10)</span>
      </div>
      <h3 className="productname">{product.name}</h3>
      <div className="card-footer">
        <FiHeart size={27} className="heart" />
        {state.cartProducts.some((p) => p.id === product.id) ? (
          <div className="button remove">
            <div
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: product })
              }
              className="cart-btn remove"
            >
              <MdOutlineRemoveShoppingCart className="item-remove" />
              Remove from Cart
            </div>
          </div>
        ) : (
          <div className="button">
            <div>${product.price}</div>
            <div
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
              className="cart-btn"
            >
              <MdOutlineAddShoppingCart />
              Add To Cart
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
