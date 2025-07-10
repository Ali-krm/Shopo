import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import styles from "./contact.module.scss";
import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
const Contact = () => {
  ChangeTitle("Contact Us");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.contact}>
        <h1 className={styles.contactTitle}>Contact Us</h1>
        <div className={styles.contactAddress}>
          Mailing Address: ENCINITAS,CA301,
          <br />
          Main St,Downtown Encinitas
        </div>
        <div className={styles.contactName}>
          <input placeholder="Name" />
          <input placeholder="Phone Number" />
        </div>
        <div className={styles.contactEmail}>
          <input placeholder="Email" />
        </div>
        <div className={styles.contactMsg}>
          <textarea placeholder="Message" />
        </div>
        <button className={styles.contactSend}>Send</button>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Contact;
