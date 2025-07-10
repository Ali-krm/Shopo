import useState from "react-usestateref";
import "./createproduct.scss";
import { FcAddImage } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { CartState } from "../../../contexts/CartContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../loading/Loading";
const CreateProduct = ({ type }) => {
  const { productid } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [, setImageFiles, imagefiles] = useState([]);
  const [colors, setColors] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [occasionList, setOccasionList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [materials, setMaterials] = useState("");
  const [specSize, setSpecSize] = useState("");
  const [Strap, setStrap] = useState("");
  const [gender, setGender] = useState("Men");
  const [sizeList, setSizeList] = useState([]);
  const [, setFeature, featured] = useState(false);
  const [editloading, setEditloading] = useState(false);
  const [createloading, setCreateloading] = useState(false);
  const { auth } = CartState();

  const PopulateProduct = async () => {
    let { data } = await axios.get(`http://localhost:5164/Store/${productid}`);
    console.log(data);
    setSizeList(data.size);
    setColorsList(data.colors);
    setName(data.name);
    setImageUrls(data.images);
    setImageFiles(data.images);
    setOccasionList(data.occasions);
    setPrice(data.price);
    setStock(data.stockQuantity);
    setBrand(data.brand);
    setCategory(data.category);
    setDescription(data.description);
    setFeature(data.featured);
    setMaterials(data.specifications.materials);
    setStrap(data.specifications.strap);
    setSpecSize(data.specifications.size);
    setSalePrice(data.salePrice);
    setCollection(data.collection);
    setGender(data.gender);
  };
  useEffect(() => {
    if (productid) {
      PopulateProduct();
    }
  }, []);
  const handelImgae = (e) => {
    const ImageUrls = [...imageUrls];
    const ImageFiles = [...imagefiles.current];

    console.log(e.target.files);
    for (const key in e.target.files) {
      if (!isNaN(key)) {
        ImageUrls.push(URL.createObjectURL(e.target.files[parseInt(key)]));
        ImageFiles.push(e.target.files[parseInt(key)]);
      }
    }
    setImageFiles(ImageFiles);
    setImageUrls(ImageUrls);
  };

  const handelAddOccasion = () => {
    setOccasionList([...occasionList, occasion]);
    setOccasion("");
  };
  const handelAddSize = () => {
    setSizeList([...sizeList, size]);
    setSize("");
  };
  const handelAddColor = () => {
    setColorsList([...colorsList, colors]);
    setColors("");
  };

  const removeImage = (Image, Index) => {
    setImageUrls((current) => current.filter((image) => image !== Image));
    setImageFiles((current) =>
      current.filter((image, index) => index !== Index)
    );
    console.log(imagefiles.current);
  };
  const handelRemoveOccasion = (Index) => {
    setOccasionList((current) =>
      current.filter((image, index) => index !== Index)
    );
  };
  const handelRemoveColor = (Index) => {
    setColorsList((current) =>
      current.filter((color, index) => index !== Index)
    );
  };
  const handelRemoveSize = (Index) => {
    setSizeList((current) => current.filter((color, index) => index !== Index));
  };

  const handelCreateProduct = async () => {
    try {
      setCreateloading(true);
      let formData = new FormData();
      formData.append("name", name);
      imagefiles.current.forEach((image) => {
        formData.append("Images", image);
        // formData.append("Images", imagefiles.current[0]);
      });
      formData.append("colors", JSON.stringify(colorsList));
      formData.append("occasion", JSON.stringify(occasionList));
      formData.append("size", JSON.stringify(sizeList));
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("materials", materials);
      formData.append("collection", collection);
      salePrice && formData.append("salePrice", salePrice);
      formData.append("strap", Strap);
      formData.append("specSize", specSize);
      formData.append("featured", featured.current);
      formData.append("gender", gender);
      console.log(formData.getAll("Images"));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      let res = await axios
        .post(`http://localhost:5164/Store/create-product`, formData)
        .then(() => setCreateloading(false));

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditProduct = async () => {
    try {
      setEditloading(true);
      let formData = new FormData();
      formData.append("name", name);
      console.log(imagefiles.current);
      imagefiles.current.forEach((image) => {
        if (typeof image == "string") {
          formData.append("ImagesUrl", image);
        } else {
          formData.append("Images", image);
        }
      });
      formData.append("colors", JSON.stringify(colorsList));
      formData.append("occasion", JSON.stringify(occasionList));
      formData.append("size", JSON.stringify(sizeList));
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("materials", materials);
      formData.append("strap", Strap);
      formData.append("featured", featured.current);
      console.log("fea", featured.current);
      formData.append("specSize", specSize);
      formData.append("collection", collection);
      salePrice && formData.append("salePrice", salePrice);
      formData.append("gender", gender);
      console.log();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      let res = await axios
        .put(`http://localhost:5164/Store/edit-product/${productid}`, formData)
        .then(() => setEditloading(false));
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="create-product">
      <div className="create-product-wrapper">
        <div className="create-product-title">{`${type} Product`}</div>
        <input
          placeholder="Product Name"
          className="create-product-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="product-image-input-container">
          <input
            type={"file"}
            id="create-image-file"
            multiple
            className="product-image-input"
            draggable
            onChange={(e) => {
              handelImgae(e);
            }}
          />
          <label htmlFor="create-image-file" className="add-image-icon">
            <FcAddImage size={90} />
            <span style={{ marginTop: "10px" }}>Select Product Images</span>
          </label>
        </div>

        {imageUrls?.length > 0 && (
          <div className="selected-opitions">
            <div className="selected-options-container">
              {imageUrls?.map((image, index) => {
                return (
                  <div className="selected-images-wrapper" key={index}>
                    <img className="selected-image" src={image} />
                    <IoIosClose
                      className="selected-image-close"
                      size={18}
                      onClick={() => removeImage(image, index)}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="select-image-removeall"
              onClick={() => {
                setImageFiles([]);
                setImageUrls([]);
              }}
            >
              <span>Remove All</span>
            </div>
          </div>
        )}
        <div className="create-product-input">
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="full-input-container">
          <input
            placeholder="Occasion"
            className="create-product-full"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />
          <div size={10} className="product-add" onClick={handelAddOccasion}>
            Add
          </div>
        </div>
        {occasionList?.length > 0 && (
          <div className="selected-opitions">
            <div className="selected-options-container">
              {occasionList.map((occasion, index) => {
                return (
                  <div className="selected-occasion" key={index}>
                    <IoIosClose
                      size={26}
                      style={{ cursor: "pointer" }}
                      onClick={() => handelRemoveOccasion(index)}
                    />
                    <span>{occasion}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="full-input-container">
          <input
            placeholder="Colors"
            className="create-product-full"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
          <div size={10} className="product-add" onClick={handelAddColor}>
            Add
          </div>
        </div>
        {colorsList?.length > 0 && (
          <div className="selected-opitions">
            <div className="selected-options-container">
              {colorsList.map((color, index) => {
                return (
                  <div className="selected-occasion" key={index}>
                    <IoIosClose
                      size={26}
                      style={{ cursor: "pointer" }}
                      onClick={() => handelRemoveColor(index)}
                    />
                    <span
                      style={{
                        backgroundColor: `${color}`,
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                    ></span>
                    <span>{color}</span>
                  </div>
                );
              })}
            </div>
            <div
              className="select-image-removeall"
              onClick={() => {
                setColorsList([]);
              }}
            >
              <span>Remove All</span>
            </div>
          </div>
        )}
        <div className="full-input-container">
          <input
            placeholder="Size"
            className="create-product-full"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <div size={10} className="product-add" onClick={handelAddSize}>
            Add
          </div>
        </div>
        {sizeList?.length > 0 && (
          <div className="selected-opitions">
            <div className="selected-options-container">
              {sizeList.map((size, index) => {
                return (
                  <div className="selected-occasion" key={index}>
                    <IoIosClose
                      size={26}
                      style={{ cursor: "pointer" }}
                      onClick={() => handelRemoveSize(index)}
                    />
                    <span>{size}</span>
                  </div>
                );
              })}
            </div>
            <div
              className="select-image-removeall"
              onClick={() => {
                setSizeList([]);
              }}
            >
              <span>Remove All</span>
            </div>
          </div>
        )}

        <div className="create-product-input">
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="SalePrice"
            value={salePrice !== null ? salePrice : ""}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>
        <div className="create-product-input">
          <input
            type="text"
            placeholder="Collection"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className={`select`}>
          <select
            name="format"
            id="format"
            className={`order-select`}
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="feauter-checkbox path">
            <input
              type="checkbox"
              value={featured.current}
              checked={featured.current}
              onChange={() => {
                setFeature((prev) => !prev);
              }}
            />
            <svg viewBox="0 0 21 21">
              <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
            </svg>
          </label>
          <span style={{ marginLeft: "10px" }}>Feature Product</span>
        </div>
        <div className="Specification-title">Specification</div>
        <input
          type="text"
          placeholder="Materials"
          onChange={(e) => setMaterials(e.target.value)}
          value={materials}
        />
        <input
          type="text"
          placeholder="Strap"
          onChange={(e) => setStrap(e.target.value)}
          value={Strap}
        />
        <input
          type="text"
          placeholder="Size"
          onChange={(e) => setSpecSize(e.target.value)}
          value={specSize}
        />
        <textarea
          placeholder="Description"
          aria-disabled
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {type == "Create" ? (
          <button className="create-button" onClick={handelCreateProduct}>
            Create
            {!createloading ? "Create" : <Loading />}
          </button>
        ) : (
          <button className="create-button" onClick={handelEditProduct}>
            {!editloading ? "Edit" : <Loading />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
