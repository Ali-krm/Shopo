import { useEffect, useState } from "react";
import "./userdetail.scss";
import "../reviews.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartState } from "../../../contexts/CartContext";
import moment from "moment";
import RatingDisplay from "../../StarRating/RatingDisplay";
import { BsPersonCircle } from "react-icons/bs";
import Orders from "../Orders";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const UserDetail = ({ type }) => {
  const { username } = useParams();
  const [role, setRole] = useState("");
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = CartState;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const getReviews = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;

    let { data } = await axiosPrivate.get(
      `http://localhost:5164/Store/reviews`
    );
    setReviews(data);
  };

  const getUser = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;

    let { data } = await axiosPrivate.get(
      `http://localhost:5164/api/Account/users/${username}`
    );
    setUser(data);
    setUserName(data.userName);
    setRole(data.role);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
  };
  const handelEditInfo = async () => {
    await axiosPrivate.post(
      `http://localhost:5164/api/Account/admin-change-info/${username}`,
      {
        role,
        firstName,
        lastName,
        email,
      }
    );
  };

  const handelCreateUser = async () => {
    await axios.post("http://localhost:5164/api/Account/registeration", {
      username: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role,
    });
  };

  useEffect(() => {
    getReviews();
    username && getUser(username);
  }, []);
  return (
    <div className="user-detail">
      <div className="user-detail-wrapper">
        {type == "detail" ? (
          <div className="user-detail-title">User Details</div>
        ) : (
          <div className="user-detail-title">Create User</div>
        )}
        <div className="input-container">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={type == "detail" ? true : false}
            className="username-input"
            placeholder="User Name"
          />
          <div className="detail-double-input">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="select-input-container">
            <input
              type="email"
              placeholder="Email"
              className="detail-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={"detail-select"}>
              <select
                name="format"
                id="format"
                className="input-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          {type == "create" && (
            <input
              type="password"
              value={username}
              onChange={(e) => setPassword(e.target.value)}
              disabled={type == "detail" ? true : false}
              className="username-input"
              placeholder="Password"
            />
          )}
          <button
            className="edit-btn"
            onClick={type == "detail" ? handelEditInfo : handelCreateUser}
          >
            {type === "create" ? "Create" : "EDIT"}
          </button>
        </div>
      </div>
      {type === "detail" && reviews.length > 0 && (
        <div className="user-reviews">
          <div className="reviews-title">Users's Reviews</div>
          {reviews?.map((review) => {
            return (
              <div className={"reviewwraper"} key={review?.id}>
                <div className="review-top">
                  <div className="review-info">
                    <BsPersonCircle size={25} />
                    <div className="review-top-left">
                      <div className={"name"}>{review.name}</div>
                      <div className="review-rate">
                        <RatingDisplay rate={review.rate} size={20} />
                        <span style={{ marginLeft: "5px" }}>{review.rate}</span>
                      </div>
                    </div>
                  </div>
                  <div className={"reviewdate"}>
                    {moment(review.reviewDate).format("l")}
                  </div>
                </div>
                <div className={"review-title"}>"{review.title}"</div>
                <p className={"review-text"}>{review.reviewText}</p>
              </div>
            );
          })}
        </div>
      )}
      {type === "detail" && <Orders />}
    </div>
  );
};

export default UserDetail;
