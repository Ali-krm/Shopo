import styles from "./checkoutpage.module.scss";
import { motion } from "framer-motion";
import SideCheckoutCart from "./SideCheckoutCart";
import CheckOutForm from "./CheckOutForm";
import { ChangeTitle } from "../../utils/GenralFunctions";

const CheckOutPage = () => {
  let formdata = new FormData();
  formdata.append("name", "roomName");
  formdata.append("Description", "description");
  formdata.append("ImageFile", "imageFile");

  ChangeTitle("Check Out");
  return (
    <motion.div
      className={styles.checkoutpage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CheckOutForm />
      <SideCheckoutCart />
    </motion.div>
  );
};

export default CheckOutPage;
