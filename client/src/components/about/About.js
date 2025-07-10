import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import styles from "./about.module.scss";
import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
const About = () => {
  ChangeTitle("About Us");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.about}>
        <h1 className={styles.abouTitle}>Our Story</h1>

        <p className={styles.aboutParagraph}>
          What began as a humble leather footwear label in 2009 has since
          evolved into a well established Australian design brand best known for
          its signature timepieces and butter-soft leather bags. 
        </p>

        <p className={styles.aboutParagraph}>
          From their studio in Sydney, they design complementary ranges for
          work, travel and leisure. Each collection is devised in the spirit of
          the Australian lifestyle and comes in a palette of colourways inspired
          by our natural landscapes, from the richness of a desert interior to
          the soft, organic tones of bush and coast.
        </p>

        <p className={styles.aboutParagraph}>
          In everything they do, they hold to their manifesto: to magnify what
          is essential and edit out the excess.
        </p>
        <p className={styles.aboutParagraph}>
          Together with their small team, Scott and Amy take joy in creating
          accessories that enrich the everyday.
        </p>
      </div>
      <Footer />
    </motion.div>
  );
};

export default About;
