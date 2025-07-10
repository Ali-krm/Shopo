import { MdLocalShipping } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";
import styles from "./info.module.scss";
const Info = () => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoItem}>
        <div className={styles.icon}>
          <MdLocalShipping size={35} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>FREE SHIPPIN</h3>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            at iaculis quam. Integer accumsan tincidunt fringilla.
          </div>
        </div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.icon}>
          <RiCustomerService2Fill size={35} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>CUSTOMER SUPPORT</h3>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            at iaculis quam. Integer accumsan tincidunt fringilla.
          </div>
        </div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.icon}>
          <GiReturnArrow size={35} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>FREE RETURNS</h3>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            at iaculis quam. Integer accumsan tincidunt fringilla.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
