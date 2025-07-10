import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import styles from "../components/Shop/shopcard.module.scss";
const ImageComponent = ({ src, blur, height, width }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  if (!blur) return <img src={src} className={styles.imgcard} />;
  return (
    <div>
      <div
        style={{
          display: imageLoaded ? "none" : "inline",
        }}
      >
        <Blurhash
          className="blur"
          hash={blur}
          width={width ? width : "47px"}
          height={height ? height : "47px"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img
        src={src}
        className={styles.imgcard}
        style={{ display: !imageLoaded ? "none" : "inline" }}
      />
    </div>
  );
};

export default ImageComponent;
