import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { CartState } from "../../contexts/CartContext";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./overview.scss";
import { AiOutlineRightCircle } from "react-icons/ai";
import Orders from "./Orders";
const Overview = () => {
  let navigate = useNavigate();
  const { auth } = CartState();
  const [list, setList] = useState([]);
  const getUser = async (username) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
    let { data } = await axios.get(
      `http://localhost:5164/api/Account/users/${username}`
    );
    setList(data.wishlist);
    console.log(data);
  };
  useEffect(() => {
    const user = jwtDecode(auth.accessToken);
    getUser(user.unique_name);
  }, []);
  return (
    <div className="overview-wishlist">
      <div className="overview-title">Wishlist</div>
      <div className="wishlist-wrapper">
        {list.slice(0, 4).map((item, index) => {
          return (
            <div
              className="overview-item"
              key={index}
              onClick={() => navigate(`/shop/${item.productId}`)}
            >
              <div className="overview-image">
                <div className="overview-heart">
                  <IoHeart color="white" />
                </div>
                <img src={item.image} />
              </div>
              <div className="overview-info">
                <span>{item.name}</span>
                <span>{item.price} $</span>
              </div>
            </div>
          );
        })}
        {list.length >= 4 && (
          <div
            className="wishlist-view"
            onClick={() => navigate("/user-dashboard/wishlist")}
          >
            <AiOutlineRightCircle size={40} />
            <span>View All</span>
          </div>
        )}
      </div>
      <Orders />
    </div>
  );
};

export default Overview;
