import styles from "./footer.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className={styles.leftSection}>
          <div className={styles.customer}>
            <h2>Customer Care</h2>
            <ul>
              <li>Shipping & Delivery</li>
              <li>Returns & Exchanges</li>
              <li>Terms & Conditions</li>
              <li>Stores</li>
            </ul>
          </div>
          <div className={styles.information}>
            <h2>Information</h2>
            <ul>
              <li>FAQ</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className={styles.rightSection}>
          <h2 className={styles.subscribeLabel}>Sign up and save</h2>
          <p>
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <div className={styles.newsletterSection}>
            <input
              type={"email"}
              placeholder="Enter your Email"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterBtn}>
              <AiOutlineMail size={30} fontWeight={"300"} />
            </button>
          </div>
          <div className={styles.socialMedia}>
            <AiFillInstagram size={27} />
            <FaFacebook size={25} />
            <FaPinterest size={25} />
          </div>
        </div>
      </div>
      <div className={styles.copyRight}>
        Copyright ©2022 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
