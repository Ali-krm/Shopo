import axios from "axios";
import { useState, useMemo } from "react";
import { CartState } from "../../../contexts/CartContext";
import "../orders.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { ChangeTitle } from "../../../utils/GenralFunctions";
import Dropdown from "../Dropdown";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Table from "../../Table";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../loading/Loading";
const Products = ({ overflow }) => {
  const { auth } = CartState();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  ChangeTitle("Dashboard | Products");

  const { isLoading } = useFetch("http://localhost:5164/Store", setProducts);

  const handelRemoveProduct = async (productid) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;

    let { data } = await axiosPrivate.delete(
      `http://localhost:5164/Store/remove-product/${productid}`
    );
    setProducts(data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: (row) => {
          return `#${row.id}`;
        },
      },
      {
        Header: "PHOTO",
        accessor: "images",
        Cell: (props) => (
          <div className="item-photo">
            <img
              className="item-image"
              src={props.value[0]}
              alt={props.value[0]}
              style={{ marginLeft: "50px" }}
            />
          </div>
        ),
      },
      {
        Header: "NAME",
        accessor: "name",
        disableSortBy: true,
      },
      {
        Header: "PRICE",
        accessor: "price",
      },
      {
        Header: "STOCK",
        accessor: "stockQuantity",
      },
      {
        Header: "SOLD",
        accessor: "saleCount",
      },
      {
        Header: "",
        accessor: "rating",
        disableSortBy: true,
        Cell: (props) => (
          <Dropdown>
            <div
              className="view-more"
              style={{
                position: "absolute",
                backgroundColor: "white",
                zIndex: "100",
                right: 0,
                width: "170px",
                borderRadius: "7px",
                padding: "5px",
                // paddingBlock: "65px",
                height:"160px",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <div
                onClick={() => {
                  navigate(`/shop/product/${props.row.original.id}`);
                }}
                className="dropdown-item"
              >
                <AiOutlineEye size={19} />
                View
              </div>
              <div
                className="dropdown-item"
                onClick={() => navigate(`edit/${props.row.original.id}`)}
              >
                <AiOutlineEdit size={19} />
                Edit
              </div>
              <div
                className="dropdown-item"
                style={{ color: "red", zIndex: 100 }}
                onClick={() => handelRemoveProduct(props.row.original.id)}
              >
                <FaTrashAlt size={19} color="red" />
                Delete
              </div>
            </div>
          </Dropdown>
        ),
      },
    ],
    []
  );
  if (isLoading) return <Loading />;
  return (
    <div className="dashboard-orders" style={{ overflowY: overflow && "auto" }}>
      <div className="product-title-container">
        <span>Products</span>
        <div onClick={() => navigate("create")}>Create Product</div>
      </div>
      {products ? (
        <Table data={products} columns={columns} />
      ) : (
        <div style={{ margin: "30px 0px 0px 35px" }}>
          No Products To Display.
        </div>
      )}
    </div>
  );
};

export default Products;
