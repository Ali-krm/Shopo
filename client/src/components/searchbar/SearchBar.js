import "./SearchBar.scss";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const inputref = useRef(null);
  let [active, setActive] = useState("");
  let [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const iconRef = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", handelkeydown, true);
  }, []);
  const handelkeydown = (event) => {
    if (event.key === "/") {
      iconRef.current.click();
      inputref.current.value = "";
    }
  };
  useEffect(() => {
    searchString.length > 0 && handelSearch();
  }, [searchString]);
  const handelSearch = async () => {
    let params = new URLSearchParams();
    params.append("searchString", searchString);
    params.append("pageSize", 4);
    let { data } = await axios.get("http://localhost:5164/Store", {
      params: params,
    });
    console.log(data);
    setProducts(data);
  };

  function handleActiveClick() {
    setActive("active");
    setTimeout(() => {
      inputref.current.focus();
    }, 100);
  }
  function handledeActiveClick() {
    setActive("");
  }
  return (
    <div className={`searchBox ${active}`}>
      <input
        className={`${active} input`}
        ref={inputref}
        type="text"
        placeholder="Search..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        style={{ border: searchString.length > 0 && "none" }}
      />
      <div
        className={`${active} searchIcon`}
        ref={iconRef}
        onClick={handleActiveClick}
      >
        <BsSearch size={20} />
      </div>
      <div
        className={`cancelIcon ${active}`}
        onClick={() => {
          handledeActiveClick();
          setSearchString("");
        }}
      >
        <IoClose size={28} fontWeight={300} />
      </div>
      {searchString.length > 0 && (
        <div className="search-result">
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <div
                  className="search-product"
                  onClick={() => navigate(`/shop/product/${product.id}`)}
                >
                  <div className="search-product-image-container">
                    <img
                      className="search-product-image"
                      src={product.images[0]}
                    />
                  </div>
                  <div className="search-product-right-col">
                    <div className="search-product-name">{product.name}</div>
                    <div className="search-product-price">{product.price}$</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="search-result-not-found">No Products Found.</div>
          )}
          {products.length > 0 && (
            <div
              className="search-result-view-all"
              onClick={() =>
                navigate({
                  pathname: "shop",
                  search: createSearchParams({
                    searchTerm: searchString,
                  }).toString(),
                })
              }
            >
              View All
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
