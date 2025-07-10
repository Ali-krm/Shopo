import { useNavigate } from "react-router-dom";
import "../../App.scss";
import { GoArrowRight } from "react-icons/go";
const DropDown = ({ handler, gender }) => {
  const navigate = useNavigate();
  return (
    <div
      className="dropdown"
      // onMouseLeave={handler}
    >
      <div className="dropdown-container">
        <div className="dropdown-items">
          <h4
            style={{ display: "flex", alignItems: "center" }}
            className="dropdown-title"
            onClick={() => navigate(`/shop/${gender}/Clothes`)}
          >
            <span>{`${gender}'s Clothes`}</span>
            <GoArrowRight size={25} />
          </h4>
          {
            <>
              {gender == "Men" ? (
                <ul className="item-container">
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Bottoms
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Joggers
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Trousers
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Tops
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Long Sleeve Tops
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Polo Shirts
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Short Sleeve Tops
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Shirts
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    T-Shirts
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Coats & Jackets
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Hoodies
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Shorts
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Swimwear
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Socks
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Sweatshirts{" "}
                  </li>
                </ul>
              ) : (
                <ul className="item-container">
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Bottoms
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Leggings
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Joggers
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Tops
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Tank Tops
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Coats & Jackets
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Dresses
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Hoodies
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Jumpers
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Shorts
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Skirts
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Socks
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Swimwear
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Shoes
                  </li>
                  <li
                    onClick={(e) =>
                      navigate(`/shop/${gender}/${e.currentTarget.textContent}`)
                    }
                  >
                    Sweatshirts
                  </li>
                </ul>
              )}
            </>
          }
        </div>
        <div
          className="dropdown-promo"
          style={{
            flexDirection: gender === "Women" ? "column-reverse" : "column",
          }}
        >
          <div className="promo-item">
            <h4 className="promo-text">Products On Sale</h4>
            <img
              src="//cdn.allbirds.com/image/fetch/q_auto,f_auto/w_991,f_auto,q_auto/https://images.ctfassets.net/9uo1qvvet3xa/1VdDqgMc3u35pnYngXErMM/cddb56cf0cb3a3a0b474257651aa4563/Nav-Tile-M_Desktop_1125__324.jpg"
              alt=""
            />
          </div>
          <div className="promo-item">
            <h4 className="promo-text">Feautered Products</h4>
            <img
              src="https://images.ctfassets.net/9uo1qvvet3xa/79YdU1mw1kQVlkdnL7RyfC/d7134e63e05a3b74f8d22a590940c4d1/Nav-Tile-W_Desktop_1125__324.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
