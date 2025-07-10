import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import "../../App.scss";
import styles from "./navbar.module.scss";
import SearchBar from "../searchbar/SearchBar";
import SideBarShoppingCart from "../shoppingcart/SideBarShoppingCart";
import { useNavigate } from "react-router-dom";
import useState from "react-usestateref";
import DropDown from "./DropDown";
import SidebarNavbar from "./SidebarNavbar";
import { useEffect } from "react";

const NavBar = () => {
  let navigate = useNavigate();
  const [clasname, setClasName] = useState("");
  const [, setActive, activeRef] = useState(false);
  const [mensActive, setMensActive] = useState(false);
  const [womensActive, setWomensActive] = useState(false);
  const handleMouseLeave = () => {
    setActive(false);
    setClasName("");
  };
  useEffect(() => {
    if (activeRef.current) {
      document.documentElement.style.overflowY = "hidden";
      console.log(document);
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  }, [activeRef.current]);
  return (
    <>
      <div className={styles.firstSection}>
        <div className={styles.options}>
          <span onClick={() => navigate("/about")}>About</span>
          <span onClick={() => navigate("/contact-us")}>Contact</span>
          <span onClick={() => navigate("/FAQ")}>FAQ</span>
        </div>
        <div className={styles.socialMedia}>
          <AiFillInstagram size={22} />
          <FaFacebook size={21} />
          {/* <span className="currency">$USD</span> */}
        </div>
      </div>
      <div className={styles.secondSection}>
        {/* <SearchBar /> */}
        <div className={styles.rightSide}>
          <div
            onClick={() => {
              // setActive(!activeRef.current);
              setWomensActive(false);
              setMensActive(!mensActive);
              setClasName("Men");
            }}
            className={clasname == "Men" ? styles.navActive : ""}
          >
            Men
          </div>
          <div
            onClick={() => {
              // setActive(!activeRef.current);
              setMensActive(false);
              setWomensActive(!womensActive);
              setClasName("Women");
            }}
            className={clasname == "Women" ? styles.navActive : ""}
          >
            Women
          </div>
        </div>
        <SidebarNavbar />
        <div className={styles.categoryContainer}>
          {/* <div
            className="category-wrap"
            style={{
              display: "flex",
              justifyContent: "center",
              // width: "100%",
            }}
          > */}
          {/* <div className="left-side">
              <div
                onClick={() => navigate("/shop")}
                onMouseEnter={() => {
                  setActive(true);
                  setClasName("active");
                }}
                onMouseLeave={(e) => {
                  if (
                    e.nativeEvent.offsetX < 0 ||
                    e.nativeEvent.offsetX > e.target.clientWidth ||
                    e.nativeEvent.offsetY < 0
                  ) {
                    setActive(false);
                    setClasName("");
                    // console.log(
                    //   e.nativeEvent.offsetY,
                    //   e.target.clientWidth,
                    //   e.nativeEvent.offsetX,
                    //   e.target.clientHeight
                    // );
                  } else {
                    // console.log(
                    //   e.nativeEvent.offsetY,
                    //   e.target.clientWidth,
                    //   e.nativeEvent.offsetX,
                    //   e.target.clientHeight
                    // );
                    setActive(true);
                    setClasName("active");
                  }
                }}
                className={clasname}
              >
                SHOP
              </div>

              <div>SALES</div>
            </div> */}
          <div className={styles.logo} onClick={() => navigate("/")}>
            SHOPO
          </div>
          {/* <div className="right-side">
              <div>BLOG</div>
              <div onClick={() => navigate("/contact-us")}>CONTACT US</div>
            </div> */}
        </div>
        {/* {activeRef.current === true ? (
            <DropDown handler={handleMouseLeave} />
          ) : null} */}
        {/* </div> */}
        <div className={styles.icons}>
          <SearchBar />
          <IoPersonOutline
            onClick={() => navigate("/admin-dashboard/overview")}
            size={20}
          />
          <IoHeartOutline
            onClick={() => navigate("/user-dashboard/wishlist")}
            className={styles.navbarWishlist}
            size={24}
          />
          <SideBarShoppingCart />
        </div>
        {womensActive === true ? (
          <div className={styles.navbarDropdown}>
            <DropDown handler={handleMouseLeave} gender={clasname} />
            <div
              className={styles.dropdownShadow}
              onClick={() => {
                setActive(false);
                setMensActive(false);
                setWomensActive(false);
                setClasName("");
              }}
            />
          </div>
        ) : null}
        {mensActive === true ? (
          <div className={styles.navbarDropdown}>
            <DropDown handler={handleMouseLeave} gender={clasname} />
            <div
              className={styles.dropdownShadow}
              onClick={() => {
                setActive(false);
                setMensActive(false);
                setWomensActive(false);
                setClasName("");
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NavBar;
