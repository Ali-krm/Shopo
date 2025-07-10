import styles from "./slider.module.scss";
import { TbChevronLeft } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import Imgage from "../../assets/f9432583_a44f.jpeg.jpg";
import Image2 from "../../assets/aw23_walcot_drs_s3105_D3_KH_SP_250723_1576_kh_resize_2808x.jpg";
import Image5 from "../../assets/collection-inpage-module-29june-desk-v2.jpg";
import Image4 from "../../assets/menu-collection-inpag-nav-moncler-x-sb-update-13-07-desk.jpg";

// import Image3 from "../../assets/menu-collection-inpag-nav-moncler-x-sb-update-13-07-desk.jpg";
// import Image5 from "../../assets/bc24ebe2d9d4319e3adf40d6bdc20df9.jpg";
import useState from "react-usestateref";

const Slider = () => {
  let items = [
    {
      img: Imgage,
      title: "Furniture New Chair Minimal Living Room",
      descript:
        "The new Danish classic, the Dark Stained Beech Stool has an elegant, organic design",
    },
    {
      // https://images.unsplash.com/photo-1657700689554-492718c8a1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60
      img: "https://images.unsplash.com/photo-1657700689554-492718c8a1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
      title: "Furniture New Chair Minimal Living Room",
      descript:
        "Brillant White Couch Regarding Sofa Set Living Room Furniture Moder High Quality Gargeous Inspirations ",
    },
    {
      img: Image5,
      title: "New Collection Stained Beech Stool",
      descript:
        "Brillant White Couch Regarding Sofa Set Living Room Furniture Moder High Quality Gargeous Inspirations",
    },
    // {
    //   img: "https://yanka-demos.myshopify.com/cdn/shop/files/demo08_05_900x.jpg?v=1613771740",
    //   title: "New Collection Stained Beech Stool",
    //   descript:
    //     "Brillant White Couch Regarding Sofa Set Living Room Furniture Moder High Quality Gargeous Inspirations",
    // },
    {
      img: Image2,
      title: "Furniture New Chair Minimal Living Room",
      descript:
        "The new Danish classic, the Dark Stained Beech Stool has an elegant, organic design",
    },
    {
      img: Image4,
      title: "Furniture New Chair Minimal Living Room",
      descript:
        "The new Danish classic, the Dark Stained Beech Stool has an elegant, organic design",
    },

    // {
    //   img: "https://images.unsplash.com/photo-1657674614491-2aa7311c44fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
    //   title: "New Collection Stained Beech Stool",
    //   descript:
    //     "The new Danish classic, the Dark Stained Beech Stool has an elegant, organic design",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bnljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    //   title: "Furniture New Chair Minimal Living Room",
    //   descript:
    //     "Brillant White Couch Regarding Sofa Set Living Room Furniture Moder High Quality Gargeous Inspirations",
    // },
  ];

  const [slidePercentage, setSlidePercentage, slideRef] = useState(0);
  const [currentIndex, setCurrentIndex, indexRef] = useState(0);
  const leftMovement = () => {
    if (slideRef.current === 0) {
      setSlidePercentage(-100 * (items.length - 1));
      setCurrentIndex(items.length - 1);
    } else {
      setCurrentIndex(indexRef.current - 1);
      setSlidePercentage(slideRef.current + 100);
    }
  };

  const rightMovement = () => {
    if (slideRef.current === -100 * (items.length - 1)) {
      setSlidePercentage(0);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(indexRef.current + 1);
      setSlidePercentage(slideRef.current - 100);
    }
  };
  const handleNavigation = (index) => {
    setSlidePercentage(-100 * index);
    setCurrentIndex(index);
  };

  return (
    <div className={styles.slider}>
      {items.map((item, index) => {
        return (
          <div
            className={styles.slide}
            key={index}
            style={{ transform: `translateX(${slidePercentage}%)` }}
          >
            <img src={item.img} alt="slide imgage" className={styles.img} />
            <div className={styles.wraper}>
              <div className={styles.slideTitle}>{item.title}</div>
              <div className={styles.slideDescription}>{item.descript}</div>
              <button className={styles.shopBtn}>Shop The Collection</button>
            </div>
          </div>
        );
      })}
      <div className={styles.navigation}>
        <div className={styles.container}>
          {items.map((_, index) => {
            return (
              <div
                key={index}
                onClick={() => handleNavigation(index)}
                className={`${styles.bulletPoint} ${
                  currentIndex === index && styles.bulletActive
                }`}
              ></div>
            );
          })}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.leftBtn} onClick={leftMovement}>
          <TbChevronLeft size={40} />
        </button>
        <button className={styles.rightBtn} onClick={rightMovement}>
          <TbChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
