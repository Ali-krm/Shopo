import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./sidebarnavbar.module.scss";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const SidebarNavbar = () => {
  const [translate, setTranslate] = useState(-100);
  const [active, setActive] = useState("Men");
  const navigate = useNavigate();
  const handlePopupClose = () => {
    setTranslate(-100);
  };
  useEffect(() => {
    if (translate === 0) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [translate]);
  return (
    <div className={styles.navbarWrapper}>
      <RxHamburgerMenu
        size={26}
        className={styles.hambergur}
        onClick={(e) => {
          setTranslate(0);
        }}
      />
      <div
        className={styles.popup}
        style={{ transform: `translateX(${translate}%)` }}
      >
        <div className={styles.close} onClick={() => setTranslate(-100)}>
          x
        </div>
        <div className={styles.sidebarContainer}>
          <div className={styles.logo}>Shopo</div>
          <div className={styles.sidebarNavTop}>
            <div
              className={
                active === "Men"
                  ? styles.sidebarNavTopItemActive
                  : styles.sidebarNavTopItem
              }
              onClick={() => {
                setActive("Men");
              }}
            >
              Men
            </div>
            <div
              className={
                active === "Women"
                  ? styles.sidebarNavTopItemActive
                  : styles.sidebarNavTopItem
              }
              onClick={() => {
                setActive("Women");
              }}
            >
              Women
            </div>
          </div>
          <div className={styles.sidebarNavBottom}>
            <h4
              className={styles.sidebarNavTitle}
              onClick={() => navigate(`/shop/${active}/Clothes`)}
            >
              {`${active}'s Clothes`}
              <GoArrowRight size={25} />
            </h4>
            {active === "Men" ? (
              <ul className={styles.sidebarNavBottomList}>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Bottoms
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Joggers
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Trousers
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Tops
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Long Sleeve Tops
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Polo Shirts
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Short Sleeve Tops
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Shirts
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  T-Shirts
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Coats & Jackets
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Hoodies
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Shorts
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Swimwear
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Socks
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Sweatshirts{" "}
                </li>
              </ul>
            ) : (
              <ul className={styles.sidebarNavBottomList}>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Bottoms
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Leggings
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Joggers
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Tops
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Tank Tops
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Coats & Jackets
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Dresses
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Hoodies
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Jumpers
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Shorts
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Skirts
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Socks
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Swimwear
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Shoes
                </li>
                <li
                  onClick={(e) =>
                    navigate(`/shop/${active}/${e.currentTarget.textContent}`)
                  }
                >
                  Sweatshirts
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div
        className={styles.shadow}
        onClick={handlePopupClose}
        style={{ display: translate === -100 ? "none" : "block" }}
      />
    </div>
  );
};

export default SidebarNavbar;
