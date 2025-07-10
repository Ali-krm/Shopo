import axios from "axios";
import { useEffect, useState } from "react";
import { CartState } from "../../contexts/CartContext";
import jwtDecode from "jwt-decode";
import "./wishlist.scss";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Whishlist = () => {
  const { auth } = CartState();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const getUser = async (username) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
    let { data } = await axiosPrivate.get(
      `http://localhost:5164/api/Account/users/${username}`,
      {}
    );
    setList(data.wishlist);
    console.log(data);
  };
  const handelRmoveWishlist = async (item, e) => {
    try {
      e.stopPropagation();
      console.log(item);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      let response = await axiosPrivate.post(
        `http://localhost:5164/Orders/remove-wish/${item.id}`
      );
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const user = jwtDecode(auth.accessToken);
    getUser(user.unique_name);
  }, []);
  return (
    <div className="wishlist">
      <div className="wishlist-title">WhishList</div>
      <div className="wishlist-items">
        {list.map((item) => {
          return (
            <div
              key={item.id}
              className="wishlist-item"
              onClick={() => navigate(`/shop/${item.productId}`)}
            >
              <div className="wishlist-image">
                <div
                  className="wishlist-heart"
                  onClick={(e) => {
                    handelRmoveWishlist(item, e);
                  }}
                >
                  <IoHeart color="white" />
                </div>
                <img src={item.image} />
              </div>
              <div className="wishlist-info">
                <span>{item.name}</span>
                <span>{item.price} $</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Whishlist;
