import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { CartState } from "../../contexts/CartContext";
import jwtDecode from "jwt-decode";
import "./orders.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Status } from "../../utils/Status";
import moment from "moment";
import { ChangeTitle } from "../../utils/GenralFunctions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Table from "../Table";
const Orders = ({ overflow }) => {
  const { auth } = CartState();
  const [data, setOrders] = useState([]);
  ChangeTitle("Dashboard | Orders");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const getOrders = async (username) => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      let orders;
      if (auth?.role == "Admin") {
        let { data } = await axiosPrivate.get(`http://localhost:5164/Orders`);
        orders = data;
      }
      if (auth?.role == "User") {
        let { data } = await axiosPrivate.get(
          ` http://localhost:5164/user/${username}`
        );
        orders = data;
      }
      setOrders(orders);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  useEffect(() => {
    const user = jwtDecode(auth?.accessToken);
    getOrders(user.unique_name);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: (row) => {
          return `#${row.id}`;
        },
      },
      {
        Header: "NAME",
        accessor: "buyerId",
      },
      {
        Header: "DATE",
        accessor: (row) => moment(row.orderDate).format("ll"),
      },
      {
        Header: "SUBTOTAL",
        accessor: (row) => `$${row.subtotal}`,
      },
      {
        Header: "STATUS",
        accessor: "orderStatus",
        Cell: (props) => (
          <div className={`badge ${Status(props.value)}`}>
            {Status(props.value)}
          </div>
        ),
      },
      {
        Header: "Details",
        accessor: "",
        Cell: ({ row }) => (
          <div
            onClick={() => navigate(row.values.ID.substring(1))}
            style={{ cursor: "pointer" }}
          >
            Details
          </div>
        ),
      },
    ],
    []
  );

  // const tableHooks = (hooks) => {
  //   hooks.visibleColumns.push((columns) => [
  //     ...columns,
  //     {
  //       id: "Details",
  //       Header: "Details",
  //       Cell: ({ row }) => (
  //         <div
  //           onClick={() => navigate(row.values.ID.substring(1))}
  //           style={{ cursor: "pointer" }}
  //         >
  //           Details
  //         </div>
  //       ),
  //     },
  //   ]);
  // };

  return (
    <div className="dashboard-orders" style={{ overflowY: overflow && "auto" }}>
      <div className="orders-title">
        {overflow ? "Your Orders" : "Users's Orders"}
      </div>

      {data.length > 0 ? (
        // <table className="table" {...getTableProps()}>
        //   <thead className="thead">
        //     {headerGroups.map((headerGroup) => (
        //       <tr className="tr" {...headerGroup.getHeaderGroupProps()}>
        //         {headerGroup.headers.map((column) => (
        //           <th
        //             className="th"
        //             {...column.getHeaderProps(column.getSortByToggleProps())}
        //           >
        //             {column.render("Header")}
        //             {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
        //           </th>
        //         ))}
        //       </tr>
        //     ))}
        //   </thead>
        //   <tbody className="tbody" {...getTableBodyProps()}>
        //     {page.map((row) => {
        //       prepareRow(row);
        //       return (
        //         <tr className="table-row tr" {...row.getRowProps()}>
        //           {row.cells.map((cell) => (
        //             <td className="td table-d" {...cell.getCellProps()}>
        //               {cell.render("Cell")}
        //             </td>
        //           ))}
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
        <Table data={data} columns={columns} />
      ) : (
        <div style={{ margin: "30px 0px 0px 0px" }}>
          You Don't Have Any Orders.
        </div>
      )}
    </div>
  );
};

export default Orders;
