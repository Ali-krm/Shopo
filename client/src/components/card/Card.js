import { AiFillStar } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./card.module.scss";
import { CartState } from "../../contexts/CartContext";
import { useState } from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { useNavigate, Link } from "react-router-dom";

const Card = ({ product, slide }) => {
  const { dispatch } = CartState();
  const [display, setdisplay] = useState("none");
  const navigate = useNavigate();
  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setdisplay("block")}
      onMouseLeave={() => setdisplay("none")}
    >
      <div className={styles.imgContainer}>
        <img
          src={product.images[0]}
          className={styles.imgCard}
          alt="prodect pictures"
        />
        <div className={styles.cardOptions} style={{ display: display }}>
          <div className={styles.optionBar}>
            <Tooltip title="Add to Cart" position="top" distance={20}>
              <MdOutlineAddShoppingCart
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      product: product,
                      shopcolor: product.color[0],
                      shopsize: product.size[0],
                    },
                  })
                }
                size={21}
              />
            </Tooltip>
            <Tooltip title="Add to WishList" position="top" distance={20}>
              <FiHeart size={21} className={styles.heart} />
            </Tooltip>
            <Tooltip title="Quick View" position="top" distance={20}>
              <IoSearchOutline size={21} />
            </Tooltip>
          </div>
        </div>
      </div>
      <div>SHOP</div>
      <h3
        className={styles.productName}
        onClick={() => {
          navigate(`/shop/${product.id}`);
        }}
      >
        {product.name}
      </h3>
      <div className={styles.ratingContainer}>
        <AiFillStar className={styles.star} />
        <span className="rate">{product.rating}(10)</span>
      </div>
      <div className={styles.price}>${product.price}</div>
    </div>
  );
};

export default Card;
