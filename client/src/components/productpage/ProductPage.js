import { useParams } from "react-router-dom";
import { CartState } from "../../contexts/CartContext";
import useState from "react-usestateref";
import styles from "./productpage.module.scss";
import React, { useCallback, useEffect, useRef } from "react";
import RatingDisplay from "../StarRating/RatingDisplay";
import ImageGallery from "../Shop/ImageGallery";
import SlideDown from "../Shop/SlideDown";
import Footer from "../footer/Footer";
import { motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import Reviews from "../Shop/review/Reviews";
import { ChangeTitle } from "../../utils/GenralFunctions";
import axios from "axios";
import CardSlider from "../cardslider/CardSlider";
const ProductPage = () => {
  const { productid } = useParams();
  const { state, dispatch, localWishlist, setLocalwishlist } = CartState();
  const [activeProduct, setactiveProduct, productRef] = useState({});
  const [, setImages, imageref] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedBtn, setSelectedBtn, sizeRef] = useState("");
  const [selectedColor, setSelectedColor, colorRef] = useState("");
  const [specs, setSpecs] = useState({});
  const [exist, setExist] = useState(false);
  const [cartProduct, setCartProduct] = useState({});
  const [whishListed, setWhishListed] = useState();
  const quantityRef = useRef(null);
  const [brandProducts, setBrandProducts] = useState([]);

  const getProduct = async () => {
    let { data: product } = await axios.get(
      `http://localhost:5164/Store/${productid}`
    );
    setactiveProduct(product);
    setImages(product.images);
    setSize(product.size);
    setColor(product.colors);
    setSelectedColor(product.colors[0]);
    setSelectedBtn(product.size[0]);
    setSpecs(product.specifications);
  };
  useEffect(() => {
    getProduct();
  }, []);
  const getBrandProducts = async () => {
    let params = new URLSearchParams();
    params.append("brands", activeProduct.brand);
    params.append("pageSize", 10);
    await axios
      .get("http://localhost:5164/Store", {
        params: params,
      })
      .then(({ data }) => {
        setBrandProducts(data);
      });
  };
  useEffect(() => {
    activeProduct && getBrandProducts();
  }, [activeProduct]);
  useEffect(() => {
    if (localWishlist?.some((id) => Number(id) === Number(productid))) {
      setWhishListed(true);
      console.log(localWishlist);
    } else {
      setWhishListed(false);
    }
  }, [productid, localWishlist]);

  const handelAddWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      setLocalwishlist((prev) => {
        return [...prev, productid];
      });
    },
    [productid]
  );
  const handelRemoveWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      setLocalwishlist((prev) => {
        return [...prev].filter((id) => Number(id) !== Number(productid));
      });
    },
    [productid]
  );
  useEffect(() => {
    if (
      state.cartProducts.some(
        (item) =>
          Number(item.product.id) === Number(productid) &&
          item.shopsize == sizeRef.current &&
          item.shopcolor == colorRef.current
      )
    ) {
      setExist(true);
    } else {
      setExist(false);
    }
    if (state.cartProducts) {
      state.cartProducts.forEach((product) => {
        if (product.product.id === Number(productid)) {
          setCartProduct(product);
        }
      });
    }
  }, [
    productid,
    setImages,
    state.cartProducts,
    cartProduct,
    colorRef.current,
    sizeRef.current,
    quantityRef.current,
  ]);

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
        product: activeProduct,
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
  ChangeTitle(`${activeProduct.name}`);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.productwraper}>
        <div className={styles.imagewraper}>
          <ImageGallery
            images={imageref.current}
            whishlist={whishListed}
            add={handelAddWishlist}
            remove={handelRemoveWishlist}
          />
          <p className={styles.productdesc}>{activeProduct.description}</p>
        </div>
        <div className={styles.rightside}>
          <div className={styles.detailcontainer}>
            <div className={styles.productname}>{activeProduct.name}</div>
            <div className={styles.productprice}>
              <div>${activeProduct.price}</div>
              <div className={styles.ratewraper}>
                <RatingDisplay rate={productRef.current.rating} size={20} />
                <div className={styles.ratetext}>
                  {productRef.current.rateCount}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.sizecontainer}>
            <div>Size</div>
            {size.map((size, index) => {
              return (
                <React.Fragment key={size}>
                  <label
                    htmlFor="sizeinput"
                    className={styles.label}
                    key={size}
                  >
                    <input
                      type={"radio"}
                      value={size}
                      key={index}
                      checked={isSelected(size)}
                      onChange={(e) => {
                        handleSizeRadioChange(e);
                      }}
                      id="sizeinput"
                      className={styles.sizeinput}
                    />
                    <span>{size}</span>
                  </label>
                </React.Fragment>
              );
            })}
          </div>
          <div className={styles.colorcontainer}>
            <div>Color</div>
            <div className={styles.inputwraper}>
              {color.map((color, index) => {
                return (
                  <label
                    htmlFor="colorinput"
                    className={styles.colorlabel}
                    key={color}
                  >
                    <input
                      type={"radio"}
                      value={color}
                      checked={isColorSelected(color)}
                      onChange={(e) => {
                        handleColorRadioChange(e);
                      }}
                      id="colorinput"
                      className={styles.colorinput}
                    />
                    <span style={{ background: color }}></span>
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
          <div className={styles.slidecontainer}>
            <SlideDown titel={"Specifications"}>
              {Object.keys(specs).map((key, index) => {
                if (key != "id") {
                  return (
                    <div key={index}>
                      <h5>{key}</h5>
                      <p className={styles.specsdesc}>{specs[key]}</p>
                      <br />
                    </div>
                  );
                }
              })}
            </SlideDown>
            <SlideDown titel={"Shipping & Returns"}>
              <p className={styles.slidecontent}>
                We offer free shipping on all Australian orders over $150AUD
                with free online exchanges and easy 14-day returns.
                <br />
                <br />
                Expressdelivery within Australia: 1-2 business days.
                <br />
                <br />
                Standard delivery within Australia: 2-4 business days.
              </p>
            </SlideDown>
            <SlideDown titel={"NEED HELP?"}>
              <p className={styles.slidecontent}>
                We offer free shipping on all Australian orders over $150AUD
                with free online exchanges and easy 14-day returns.
                <br />
                <br />
                Expressdelivery within Australia: 1-2 business days.
                <br />
                <br />
                Standard delivery within Australia: 2-4 business days.
              </p>
            </SlideDown>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <h2 className={styles.producttitle}>You May Also Like</h2>
        <div className={styles.discription}>Also {activeProduct.brand}</div>
      </div>
      {brandProducts.length > 0 && <CardSlider products={brandProducts} />}

      <Reviews product={productRef.current} />
      <Footer />
    </motion.div>
  );
};

export default ProductPage;
