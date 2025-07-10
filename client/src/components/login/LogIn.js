import styles from "./login.module.scss";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
import axios from "axios";
import { CartState } from "../../contexts/CartContext";
import Loading from "../loading/Loading";
import { AuthState } from "../../contexts/AuthContext";
const LogIn = () => {
  const { setAuth } = CartState();
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handelLogin = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:5164/api/Account/login", {
        username: userName,
        password: password,
      })
      .then((res) => {
        setAuth(res.data);
        console.log(res);
      })
      .finally(() => {
        setLoading(false);
      });
    const from = location.state?.from?.pathname || "/";
    console.log(from);
    navigate(from);
    // if (location.state.from.state.from.pathname == "/user-dashboard") {
    //   navigate(location.state.from.state.from.pathname + "/overview");
    // } else {
    //   navigate(location.state.from.state.from.pathname);
    // }
  };
  ChangeTitle("Login");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.wraper}>
        <h2 className={styles.title}>login</h2>
        <input
          placeholder="UserName"
          required={true}
          type={"text"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="Password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <div className={styles.forgot}>
          <button className={styles.loginbtn} onClick={handelLogin}>
            {!loading ? "Login" : <Loading />}
          </button>
          <span onClick={() => setDisplay("flex")}>Forgot password?</span>
        </div>
        <div className={styles.signin}>
          <span>Don't have an account?</span>
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "5px",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
      <div className={styles.forgetwraper} style={{ display: display }}>
        <h2 className={styles.title}>Forgotten Password</h2>
        <input placeholder="Email" type={"email"} />
        <div className={styles.btnwraper}>
          <button className={styles.submit}>Submit</button>
          <button className={styles.cancel} onClick={() => setDisplay("none")}>
            Cancel
          </button>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default LogIn;
