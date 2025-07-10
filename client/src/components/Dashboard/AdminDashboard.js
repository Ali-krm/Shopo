import { Link, Outlet } from "react-router-dom";
import "./userdashboard.scss";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { FaBoxOpen } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import {
  MdAccountCircle,
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from "react-icons/md";
import { ChangeTitle } from "../../utils/GenralFunctions";
import { AiFillShop } from "react-icons/ai";
import { useState } from "react";
import { CartState } from "../../contexts/CartContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import jwtDecode from "jwt-decode";
import axios from "../../api/axios";
const AdminDashboard = () => {
  let navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const { auth, setAuth } = CartState();
  const axiosPrivate = useAxiosPrivate();
  ChangeTitle("Dashboard");
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
  return (
    <div style={{ backgroundColor: "#F5F4FE" }}>
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
              className={`dashboard-list-item ${hidden ? "hidden" : ""}`}
            >
              <RiDashboardFill size={24} />
              <span>Dashboard</span>
            </div>

            <div
              onClick={() => navigate("orders")}
              className={`dashboard-list-item ${hidden ? "hidden" : ""}`}
            >
              <BsFillCartCheckFill size={24} />
              <span>Orders</span>
            </div>
            <div
              onClick={() => navigate("products")}
              className={`dashboard-list-item ${hidden ? "hidden" : ""}`}
            >
              <FaBoxOpen size={24} />
              <span>Products</span>
            </div>
            <div
              onClick={() => navigate("accountinfo")}
              className={`dashboard-list-item ${hidden ? "hidden" : ""}`}
            >
              <MdAccountCircle size={24} />
              <span>Account</span>
            </div>

            <div
              onClick={() => navigate("users")}
              className={`dashboard-list-item ${hidden ? "hidden" : ""}`}
            >
              <HiUsers size={24} />
              <span>Users</span>
            </div>
            <div
              onClick={() => navigate("reviews")}
              className={`dashboard-list-item ${hidden ? "hidden" : ""}`}
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
            className={`logout ${hidden ? "hidden" : ""}`}
            onClick={handelLogout}
          >
            <BiLogOutCircle size={24} />
            <span>Logout</span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
