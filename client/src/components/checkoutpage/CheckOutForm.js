import styles from "./checkoutform.module.scss";
import { BsChevronRight, BsChevronLeft, BsTruck } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaApplePay } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { useState } from "react";
import { CartState } from "../../contexts/CartContext";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const CheckOutForm = () => {
  let navigate = useNavigate();
  const [selectedBtn, setSelectedBtn] = useState("ship");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { state, auth } = CartState();
  const axiosPrivate = useAxiosPrivate();
  const isSelected = (current) => {
    return current === selectedBtn;
  };
  const handleRadioChange = (e) => {
    setSelectedBtn(e.target.value);
  };
  const handelSubmit = async () => {
    const products = [];
    state?.cartProducts?.forEach((item) => {
      let cartproduct = {};
      cartproduct.productId = item.product.id;
      cartproduct.name = item.product.name;
      cartproduct.color = item.shopcolor;
      cartproduct.size = item.shopsize;
      cartproduct.price = item.product.price;
      cartproduct.quantity = item.quantity;
      cartproduct.image = item.product.images[0];
      products.push(cartproduct);
    });
    let formData = new FormData();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("state", stateName);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("zip", zip);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("orderItems", JSON.stringify(products));

    try {
      console.log(formData);
      console.log(JSON.stringify(products));
      let res = await axiosPrivate.post(
        "http://localhost:5164/Orders",
        formData
        // headers: { Authorization: `Bearer ${auth.accessToken}` },
        // formData,
      );
      console.log(res);
      // headers: { Authorization: `Bearer ${auth.accessToken}` },
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.checkoutform}>
      <header className={styles.mainheader}>
        <h2 className={styles.logo} onClick={() => navigate("/")}>
          SHOPHO
        </h2>
        <nav>
          <ol className={styles.breadcrum}>
            <li>
              <span
                style={{ color: "#1878b9", cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              >
                Cart
              </span>
              <BsChevronRight size={13} />
            </li>
            <li>
              <span>Information</span>
              <BsChevronRight size={13} />
            </li>
            <li>
              <span>Shipping</span>
              <BsChevronRight size={13} />
            </li>
            <li>
              <span>Payment</span>
            </li>
          </ol>
        </nav>
        <div className={styles.quickpay}>
          <div className={styles.express}>
            <span className={styles.expressContent}>Express checkout </span>
          </div>
          <div className={styles.payment}>
            <div className={styles.apple}>
              <FaApplePay size={35} />
            </div>
            <div className={styles.paypal}>
              <Icon icon="logos:paypal" />
              <span>Pay</span>
              <span>Pal</span>
            </div>
            <div className={styles.google}>
              <FcGoogle />
              Pay
            </div>
          </div>
          <div className={styles.alternativePaymentSeparator}>
            <span className={styles.alternativePaymentSeparatorContent}>
              OR
            </span>
          </div>
        </div>
        <div className={styles.contactinfo}>
          {/* <div className={styles.login}> */}
          {/* <span>
              Already have an account?
              <span
              className={styles.loginlink}
              onClick={() => navigate("/login")}
              >
              Log in
              </span>
            </span> */}
          {/* </div> */}
          <div className={styles.infoform}>
            <div className={styles.logintitle}>Contact information </div>
            <div className={styles.doble}>
              <input
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
              <input
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
              />
            </div>
            <input
              className={styles.email}
              placeholder="Email"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.method}>
          <div className={styles.methodtitle}>Delivery method</div>
          <div className={styles.methodwraper}>
            <div className={styles.ship}>
              <input
                type={"radio"}
                value="ship"
                name="shipinput"
                className={styles.shipinput}
                checked={isSelected("ship")}
                onChange={(e) => {
                  handleRadioChange(e);
                }}
              />
              <BsTruck size={22} />
              <span>Ship</span>
            </div>
            <div className={styles.pick}>
              <input
                type={"radio"}
                value="pick"
                name="pickinput"
                className={styles.pickinput}
                checked={isSelected("pick")}
                onChange={(e) => {
                  handleRadioChange(e);
                }}
              />
              <IoStorefrontOutline size={22} />
              <span>Pick Up</span>
            </div>
          </div>
        </div>

        {selectedBtn === "ship" ? (
          <div className={styles.shipaddress}>
            <div className={styles.addresstitle}>Shipping address</div>
            <div className={styles.form}>
              {/* <div className={styles.doble}>
                <input placeholder="First name" />
                <input placeholder="Last name" />
              </div>
              <input placeholder="Email" /> */}
              <input
                type={"text"}
                placeholder="Country/region"
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type={"text"}
                placeholder="State"
                onChange={(e) => setStateName(e.target.value)}
              />
              <div className={styles.doble}>
                <input
                  placeholder="zip code"
                  onChange={(e) => setZip(e.target.value)}
                />
                <input
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <input
                placeholder="Address 1"
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                placeholder="Address 1"
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className={styles.location}>
            <div className={styles.locationtitle}>Pickup locations</div>
            <div className={styles.uppdown}>
              <div className={styles.locationupper}>
                <div className={styles.inputwraper}>
                  <input type={"radio"} value="hq" defaultChecked={true} />
                  <div>SHOPO HQ</div>
                </div>
                <div>Free</div>
              </div>
              <div className={styles.locationlower}>
                <div className={styles.pickaddress}>
                  1204 SE Water Ave, Suite 15
                </div>
                <div>Usually ready in 24 hours</div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.returnwraper}>
          <div className={styles.return} onClick={() => navigate("/cart")}>
            <span>
              <BsChevronLeft size={15} />
            </span>
            <span>Return to cart</span>
          </div>
          <button onClick={handelSubmit}>Continue </button>
        </div>
      </header>
    </div>
  );
};

export default CheckOutForm;
