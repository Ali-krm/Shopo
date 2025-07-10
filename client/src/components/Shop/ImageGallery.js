import useState from "react-usestateref";
import styles from "./imagegallery.module.scss";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { IoHeart } from "react-icons/io5";
const ImageGallery = ({ images, whishlist, add, remove }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeModal, setActiveModal] = useState(false);
  const closeModal = () => {
    setActiveModal(false);
    document.documentElement.style.overflowY = "auto";
  };
  const openModal = () => {
    setActiveModal(true);
    document.documentElement.style.overflowY = "hidden";
  };
  return (
    <div className={styles.imagegallery}>
      <div className={styles.imageswraper}>
        {images.map((image, index) => {
          return (
            <img
              className={
                activeImage === index
                  ? `${styles.image} ${styles.activeimage}`
                  : styles.image
              }
              onClick={() => setActiveImage(index)}
              key={index}
              src={image}
              alt=""
            />
          );
        })}
      </div>
      <div className={styles.main} onClick={openModal}>
        <IoHeart
          className={styles.wishlisticon}
          color={whishlist ? "red" : "white"}
          onClick={(e) => {
            whishlist ? remove(e) : add(e);
          }}
        />

        <img className={styles.mainimage} src={images[activeImage]} alt="" />
      </div>
      {activeModal && (
        <div className={styles.modal} onClick={closeModal}>
          <img
            src={images[activeImage]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.control} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.left}
              disabled={activeImage === 0}
              onClick={() => setActiveImage((prev) => prev - 1)}
            >
              <BiLeftArrowAlt />
            </button>
            <button className={styles.close} onClick={closeModal}>
              <GrClose />
            </button>
            <button
              className={styles.right}
              disabled={activeImage === images.length - 1}
              onClick={() => setActiveImage((prev) => prev + 1)}
            >
              <BiRightArrowAlt />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
