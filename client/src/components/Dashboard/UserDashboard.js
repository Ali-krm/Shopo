import { Link, Outlet } from "react-router-dom";
import NavBar from "../header/NavBar";
import "./userdashboard.scss";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { ChangeTitle } from "../../utils/GenralFunctions";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { CartState } from "../../contexts/CartContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AiFillShop } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
const UserDashboard = () => {
  let navigate = useNavigate();
  const { auth, setAuth } = CartState();
  ChangeTitle("Dashboard");
  const axiosPrivate = useAxiosPrivate();
  const [list, setList] = useState([]);
  const [hidden, setHidden] = useState(false);
  const getUser = async (username) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
    let { data } = await axiosPrivate.get(
      `http://localhost:5164/api/Account/users/${username}`
    );
    setList(data.wishlist);
  };
  useEffect(() => {
    const user = jwtDecode(auth.accessToken);
    getUser(user.unique_name);
  }, []);

  const handelLogout = async () => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      const user = jwtDecode(auth.accessToken);
      await axiosPrivate.post(
        `http://localhost:5164/api/Account/revoke/${user.unique_name}`
      );
      navigate("/");
      setAuth({});
    } catch (error) {
      console.log(error.response);
    }
  };
// Ali1234
  return (
    <div className="dashboard-wrraper">
      {/* <NavBar /> */}
      <div className="dashboard-container">
        <div
          className={`dashboard-sidebar-container ${
            hidden && "hiddden-sidebar"
          }`}
        >
          <div className="dashboard-sidebar">
            <Link
              to={"/"}
              className={`logo dashboard-list-item ${hidden && "hidden"}`}
            >
              <AiFillShop size={24} />
              <span>Shopo</span>
            </Link>
            <div
              onClick={() => navigate("overview")}
              className={`dashboard-list-item ${hidden && "hidden"}`}
            >
              <RiDashboardFill size={24} />
              <span>Overview</span>
            </div>
            <div
              onClick={() => navigate("orders")}
              className={`dashboard-list-item ${hidden && "hidden"}`}
            >
              <BsFillCartCheckFill size={24} />
              <span>Orders</span>
            </div>
            <div
              onClick={() => navigate("accountinfo")}
              className={`dashboard-list-item ${hidden && "hidden"}`}
            >
              <VscAccount size={24} />
              <span>Account</span>
            </div>
            <div
              onClick={() => navigate("wishlist")}
              className={`dashboard-list-item ${hidden && "hidden"}`}
            >
              <FaHeart size={22} />
              <span>Wishlist</span>
            </div>

            <div
              onClick={() => navigate("reviews ")}
              className={`dashboard-list-item ${hidden && "hidden"}`}
            >
              <VscPreview size={24} />
              <span>Reviews</span>
            </div>
          </div>
          <div
            onClick={() => setHidden((prev) => !prev)}
            className="dashboard-close"
          >
            {hidden ? (
              <MdArrowForwardIos size={17} />
            ) : (
              <MdArrowBackIosNew size={17} />
            )}
          </div>
          <div
            onClick={handelLogout}
            className={`logout ${hidden && "hidden"}`}
          >
            <BiLogOutCircle size={24} />
            <span>Logout</span>
          </div>
        </div>
        {/* <div className="overview-wishlist">
          {list.slice(0, 4).map((item) => {
            return (
              <div
                className="overview-item"
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
        </div> */}
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
