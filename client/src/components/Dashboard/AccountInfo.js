import jwtDecode from "jwt-decode";
import { CartState } from "../../contexts/CartContext";
import "./accountinfo.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChangeTitle } from "../../utils/GenralFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const AccountInfo = () => {
  const { auth } = CartState();
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  ChangeTitle("Dashboard | Account");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const getUser = async (username) => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      let { data } = await axiosPrivate.get(
        `http://localhost:5164/api/Account/users/${username}`
      );
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      console.log(data);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const handelChangeInfo = async () => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;

      let res = await axiosPrivate.post(
        `http://localhost:5164/api/Account/change-info`,
        {
          firstName,
          lastName,
          email,
        }
      );
      console.log(res);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const handelChangePassword = async () => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;

      let res = await axiosPrivate.post(
        "http://localhost:5164/api/Account/change-password",
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      console.log(res);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  useEffect(() => {
    const user = jwtDecode(auth.accessToken);
    setUserName(user.unique_name);
    getUser(user.unique_name);
  }, []);
  return (
    <div className="accountinfo">
      <span className="welcome">{`Welcome ${username}`}</span>
      <div className={"infoform"}>
        <div className={"formtitle"}>Edit Your information </div>
        <div className={"double"}>
          <input
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
          />
          <input
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
          />
        </div>
        <input
          className={"email"}
          placeholder="Email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="accountinfo-submit" onClick={handelChangeInfo}>
          Submit
        </button>
      </div>
      <div className={"infoform"}>
        <div className={"formtitle"}>Change Password </div>
        <div className={"double"}>
          <input
            placeholder="Current Password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            type="password"
          />
          <input
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
          />
        </div>
        <button className="accountinfo-submit" onClick={handelChangePassword}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
