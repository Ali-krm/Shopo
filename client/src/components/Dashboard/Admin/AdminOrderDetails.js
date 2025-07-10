import { useParams } from "react-router-dom";
import axios from "axios";
import { CartState } from "../../../contexts/CartContext";
import { useEffect, useState, useMemo } from "react";
import "../orderdetail.scss";
import moment from "moment";
import { useTable } from "react-table";
import { Status, TextToStatus } from "../../../utils/Status";
import { useNavigate } from "react-router-dom";
import "./AdminOrderDetails.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AdminOrderDetails = () => {
  const { orderid } = useParams();
  const { auth } = CartState();
  const [order, setOrder] = useState({});
  const [Data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const getOrder = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
    let { data } = await axiosPrivate.get(
      ` http://localhost:5164/Orders/${orderid}`
    );
    setData(data.orderItems);
    setStatus(data.orderStatus);
    setOrder(data);
    console.log(status);
  };
  useEffect(() => {
    getOrder();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "PHOTO",
        accessor: "image",
        Cell: (props) => (
          <div
            className="item-photo"
            onClick={() => navigate(`/shop/${props.row.original.productId}`)}
          >
            <img className="item-image" src={props.value} alt={props.value} />
          </div>
        ),
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "QUANTITY",
        accessor: "quantity",
      },
      {
        Header: "PRICE",
        accessor: (row) => `$${row.price}`,
      },
      {
        Header: "TOTAL",
        accessor: (row) => `$${row.price * row.quantity}`,
      },
    ],
    []
  );
  const table = useTable({ columns, data: Data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  const handelStatusChange = async (e) => {
    setStatus(e.target.value);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;

    let res = await axiosPrivate.post(
      ` http://localhost:5164/Orders/${orderid}/${TextToStatus(e.target.value)}`
    );
    console.log(res);
  };
  return (
    <div className="orderdetail">
      <div className="detail-title">Order Details</div>
      <div className="orderdetail-info-wrapper">
        <div className="orderdetail-info">
          <div className="orderdetail-id">
            <span>#{orderid}</span>

            <div className={`select `}>
              <select
                name="format"
                id="format"
                className={`${Status(status)} order-select`}
                onChange={(e) => handelStatusChange(e)}
                value={Status(status)}
              >
                <option value="Processing">Processing</option>
                <option value="Refunded">Refunded</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
          </div>
          <div className="orderdetail-info-items">
            <div className="orderdetail-info-item">
              <div>Order Created at</div>
              <div>{moment(order.orderDate).format("llll")}</div>
            </div>
            <div className="orderdetail-info-item">
              <div>Name</div>
              <div>{order.buyerId}</div>
            </div>
            <div className="orderdetail-info-item">
              <div>Email</div>
              <div>{order?.shippingInfo?.email}</div>
            </div>
          </div>
          <div className="orderdetail-shipping">
            <span
              className="orderdetail-shipping-item"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              shipping Information
            </span>
            <div className="orderdetail-shipping-item">
              <span>{`First Name: ${order?.shippingInfo?.firstName}`}</span>
              <span>{`Last Name: ${order?.shippingInfo?.lastName}`}</span>
            </div>
            <div className="orderdetail-shipping-item">
              <span>{`Country: ${order?.shippingInfo?.country}`}</span>
              <span>{`State: ${order?.shippingInfo?.state}`}</span>
            </div>
            <div className="orderdetail-shipping-item">
              <span>{`City: ${order?.shippingInfo?.city}`}</span>
              <span>{`Zip Code: ${order?.shippingInfo?.zip}`}</span>
            </div>
            <span className="orderdetail-shipping-item">{`Address 1: ${order?.shippingInfo?.address1}`}</span>
            <span className="orderdetail-shipping-item">{`Address 2: ${order?.shippingInfo?.address2}`}</span>
          </div>
        </div>
        <div className="orderdetail-price">
          <span style={{ fontSize: "22px", fontWeight: "500" }}>Price</span>
          <span className="orderdetail-price-item">
            {`Sub Total:$ ${order.subtotal}`}
          </span>
          <span className="orderdetail-price-item">{`Shipping: ${
            order.deliveryFee == 0 ? `free` : `$ ${order.deliveryFee}`
          }`}</span>
          <span className="orderdetail-price-item">{`Total: $ ${
            order.deliveryFee + order.subtotal
          }`}</span>
        </div>
      </div>
      <div className="detail-title"> Order Items</div>
      <div className="orderdetail-items">
        <table className="item-table" {...getTableProps()}>
          <thead className="item-thead">
            {headerGroups.map((headerGroup) => (
              <tr className="item-tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="item-th" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="item-tbody" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="item-tr" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="item-td" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
