import NavBar from "../header/NavBar";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
import { useState } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
const SignUp = () => {
  const navigate = useNavigate();
  ChangeTitle("Sign Up");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handelSignUp = async () => {
    setLoading(true);
    let response = await axios
      .post("http://localhost:5164/api/Account/registeration", {
        username: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .finally(() => setLoading(false));
    // console.log(response);
    if (response.status == 201) {
      navigate("/login");
    }
  };
  return (
    <motion.div
      className={styles.sg}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.wraper}>
        <h2 className={styles.title}>Create an Account</h2>
        <input
          placeholder="UserName"
          type={"text"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="First Name"
          type={"text"}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          type={"text"}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.createbtn} onClick={handelSignUp}>
          {!loading ? "Create Account" : <Loading />}
        </button>
        <div className={styles.signin}>
          <span>Already have an account?</span>
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "5px",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
