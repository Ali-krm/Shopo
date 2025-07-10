import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./quickview.module.scss";
import { CartState } from "../../contexts/CartContext";
import useState from "react-usestateref";

import { useEffect, useRef } from "react";
import RatingDisplay from "../StarRating/RatingDisplay";
import ImageGallery from "../Shop/ImageGallery";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const QuickView = ({ open, onClose, product }) => {
  const { state, dispatch } = CartState();
  const [selectedBtn, setSelectedBtn, sizeRef] = useState("");
  const [selectedColor, setSelectedColor, colorRef] = useState("");
  const [exist, setExist] = useState(false);
  const [cartProduct, setCartProduct] = useState({});
  const quantityRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedBtn(product.size[0]);

    if (
      state.cartProducts.some(
        (item) => item.product.id === product.id
        // item.shopsize == sizeRef.current &&
        // item.shopcolor == colorRef.current
      )
    ) {
      setExist(true);
    } else {
      setExist(false);
    }
    if (state.cartProducts) {
      state.cartProducts.forEach((item) => {
        if (item.product.id === product.id) {
          setCartProduct(item);
        }
      });
    }
  }, [product.id, state.cartProducts, cartProduct]);

  const isColorSelected = (current) => {
    return current === selectedColor;
  };
  const isSelected = (current) => {
    return current === selectedBtn;
  };
  const handleSizeRadioChange = (e) => {
    setSelectedBtn(e.target.value);
  };
  const handleColorRadioChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAdding = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: product,
        shopcolor: colorRef.current,
        shopsize: sizeRef.current,
      },
    });
  };

  const handelIncremnt = (product) => {
    quantityRef.current.value++;
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: product.id,
        quantity: quantityRef.current.value,
      },
    });
  };
  const handelDecrement = (product) => {
    if (quantityRef.current.value === "1") {
      dispatch({ type: "REMOVE_FROM_CART", payload: product });
    } else {
      quantityRef.current.value--;
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: product.id,
          quantity: quantityRef.current.value,
        },
      });
    }
  };

  const handelChange = (product, e) => {
    if (!e.target.value) {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: product.id,
          quantity: 1,
        },
      });
    } else {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: product.id,
          quantity: e.target.value,
        },
      });
    }
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onClose}>
      <AiOutlineClose onClick={onClose} className={styles.close} size={35} />
      <div className={styles.modalwraper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.productwraper}>
          <div className={styles.imagewraper}>
            <ImageGallery images={product.images} />
          </div>
          <div className={styles.rightside}>
            <div className={styles.detailcontainer}>
              <div className={styles.productname}>{product.name}</div>
              <div className={styles.productprice}>
                <div>${product.price}</div>
                <div>
                  <RatingDisplay rate={product.rating} />
                </div>
              </div>
            </div>
            <div className={styles.sizecontainer}>
              <div>Size</div>
              {product.size.map((size, index) => {
                return (
                  <>
                    <label
                      htmlFor="sizeinput"
                      className={styles.label}
                      key={index}
                    >
                      <input
                        type={"radio"}
                        value={size}
                        key={index}
                        style={{ cursor: "pointer" }}
                        checked={isSelected(size)}
                        onChange={(e) => {
                          handleSizeRadioChange(e);
                        }}
                        id="sizeinput"
                        className={styles.sizeinput}
                      />
                      <span>{size}</span>
                    </label>
                  </>
                );
              })}
            </div>
            <div className={styles.colorcontainer}>
              <div>Color</div>
              <div className={styles.inputwraper}>
                {product.colors.map((color, index) => {
                  return (
                    <label
                      htmlFor="colorinput"
                      className={styles.colorlabel}
                      key={index}
                    >
                      <input
                        type={"radio"}
                        value={color}
                        key={index}
                        style={{ cursor: "pointer" }}
                        checked={isColorSelected(color)}
                        onChange={(e) => {
                          handleColorRadioChange(e);
                        }}
                        id="colorinput"
                        className={styles.colorinput}
                      />
                      <span style={{ backgroundColor: color }}></span>
                    </label>
                  );
                })}
              </div>
            </div>
            {!exist ? (
              <button className={styles.add} onClick={handleAdding}>
                ADD TO CART
              </button>
            ) : (
              <div className={styles.quantitywraper}>
                <span className={styles.quantitytext}>Quantity : </span>
                <div className={styles.quantity}>
                  {quantityRef.current && quantityRef.current.value === "1" ? (
                    <div
                      className={styles.decremont}
                      onClick={() => handelDecrement(cartProduct)}
                    >
                      <FaRegTrashAlt size={18} />
                    </div>
                  ) : (
                    <div
                      className={styles.decremont}
                      onClick={() => handelDecrement(cartProduct)}
                    >
                      -
                    </div>
                  )}
                  <input
                    ref={quantityRef}
                    type="number"
                    onChange={(e) => handelChange(cartProduct, e)}
                    className={styles.quantityInput}
                    value={cartProduct.quantity}
                  />
                  <div
                    className={styles.incremont}
                    onClick={() => handelIncremnt(cartProduct)}
                  >
                    +
                  </div>
                </div>
              </div>
            )}
            <div className={styles.border}></div>
            <div
              className={styles.visit}
              onClick={() => {
                navigate(`/shop/${product.id}`);

                onClose();
              }}
            >
              <span>Visit Product Page</span>
              <div>
                <BsArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default QuickView;
