import { AiFillStar } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./shopcard.module.scss";
import { CartState } from "../../contexts/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import QuickView from "../productpage/QuickView";
import axios from "axios";
import ImageComponent from "../ImageComponent";
const ShopCard = ({ product, type }) => {
  const { dispatch, auth } = CartState();
  const [display, setdisplay] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handelClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflowY = "auto";
  };
  const handelWishlist = async () => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      let response = await axios.post(
        "http://localhost:5164/Orders/post-wish",
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={styles.cardcontainer}
      onMouseEnter={() => setdisplay("block")}
      onMouseLeave={() => setdisplay("none")}
    >
      <div className={styles.imgcontainer}>
        {/* <img
          src={product?.images[0]}
          className={styles.imgcard}
          alt="product pictures"
        /> */}
        <ImageComponent
          src={product?.images[0]}
          blur={product?.imagehash}
          height={"38vh"}
          width={"100%"}
        />
        <div
          className={styles.cardoptions}
          style={{ display: display }}
          onClick={() => navigate(`/shop/product/${product.id}`)}
        >
          <div
            className={styles.optionbar}
            onClick={(e) => e.stopPropagation()}
          >
            <Tooltip title="Add to Cart" position="top" distance={20}>
              <MdOutlineAddShoppingCart
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      product: product,
                      shopcolor: product.colors[0],
                      shopsize: product.size[0],
                    },
                  });
                }}
                size={21}
              />
            </Tooltip>
            <Tooltip title="Add to WishList" position="top" distance={20}>
              <FiHeart size={21} className="heart" onClick={handelWishlist} />
            </Tooltip>
            <Tooltip title="Quick View" position="top" distance={20}>
              <IoSearchOutline
                size={21}
                onClick={() => {
                  setIsOpen(true);
                  document.documentElement.style.overflowY = "hidden";
                }}
              />
            </Tooltip>
          </div>
        </div>
        <QuickView open={isOpen} onClose={handelClose} product={product} />
      </div>
      <div>{type != undefined ? "SHOP" : product.brand}</div>
      <h3
        className={styles.productname}
        onClick={() => navigate(`/shop/product/${product.id}`)}
      >
        {product.name}
      </h3>
      <div className={styles.ratingcontainer}>
        <AiFillStar className={styles.star} />
        <span
          className={styles.rate}
        >{`${product.rating}(${product.rateCount})`}</span>
      </div>
      <div className={styles.price}>${product.price}</div>
    </div>
  );
};

export default ShopCard;
