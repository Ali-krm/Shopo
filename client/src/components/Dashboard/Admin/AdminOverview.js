import "./adminoverview.scss";
import Chart from "react-apexcharts";
import { useState, useMemo, useEffect } from "react";
import {
  BsCreditCard2Front,
  BsCartCheckFill,
  BsArrowUpRight,
} from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { useTable } from "react-table";
import axios from "axios";
import { CartState } from "../../../contexts/CartContext";
import "../orderdetail.scss";
const AdminOverview = () => {
  const { auth } = CartState();
  const [data, setOrders] = useState([]);
  const [product] = useState([
    {
      name: "Orders",
      data: [234, 45, 67, 987, 345, 456, 87, 321, 45, 569, 76, 890],
    },
    {
      name: "Sales",
      data: [562, 145, 267, 97, 45, 156, 87, 321, 845, 969, 706, 20],
    },
  ]);

  const [option] = useState({
    title: { text: "Orders & Sales", offsetY: 20, style: { fontSize: "18px" } },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -14,
    },
    chart: {
      zoom: {
        enabled: false,
      },

      dataLabels: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  const pieoptions = {
    title: { text: "Orders & Sales", offsetY: 0, style: { fontSize: "18px" } },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              color: undefined,
              offsetY: -10,
            },
            total: {
              show: true,
              showAlways: true,
              label: "",
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#373d3f",
              formatter: function (w) {
                let val = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return `$${val}`;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Comedy", "Action", "Romance", "Drama"],
  };

  const barseries = [
    {
      name: "Visits",
      data: [2722, 2080, 2063, 1972, 1516],
    },
  ];
  const baroptions = {
    title: { text: "Traffic", offsetY: 0, style: { fontSize: "18px" } },
    chart: {
      id: "simple-bar",
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: ["Sep", "Oct", "Nov", "Dec", "Jan"],
    },
  };
  const series = [4001, 512, 612, 1126];
  const getOrder = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
    let { data } = await axios.get(`http://localhost:5164/Store`);
    console.log(data);
    setOrders(data);
  };
  useEffect(() => {
    getOrder();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "PHOTO",
        accessor: "images",
        Cell: (props) => (
          <div className="item-photo">
            <img
              className="item-image"
              alt="product-image"
              src={props.value[0]}
            />
          </div>
        ),
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "SOLD",
        accessor: "saleCount",
      },
      {
        Header: "PRICE",
        accessor: (row) => `$${row.price}`,
      },
      {
        Header: "STOCK",
        accessor: "stockQuantity",
      },
    ],
    []
  );

  const table = useTable({ columns, data: data.slice(0, 3) });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;
  return (
    <div className="admin-overview">
      <div className="admin-overview-title">Admin Dashboard</div>
      <div className="admin-overview-items">
        <div className="admin-overview-item">
          <div className="admin-overview-item-top">
            <span>Sales</span>
            <BsCreditCard2Front size={22} />
          </div>
          <div className="admin-overview-item-value">$5,187</div>
          <div
            className="admin-overview-item-percentge"
            style={{ color: "green" }}
          >
            <BsArrowUpRight style={{ marginRight: "5px" }} size={14} />
            11.8%
          </div>
        </div>
        <div className="admin-overview-item">
          <div className="admin-overview-item-top">
            <span>Orders</span>
            <BsCartCheckFill size={22} />
          </div>
          <div className="admin-overview-item-value">566</div>
          <div
            className="admin-overview-item-percentge"
            style={{ color: "green" }}
          >
            <BsArrowUpRight style={{ marginRight: "5px" }} size={14} />
            15.3%
          </div>
        </div>
        <div className="admin-overview-item">
          <div className="admin-overview-item-top">
            <span>Visitors</span>
            <LuArrowDownUp size={22} />
          </div>
          <div className="admin-overview-item-value">237,271</div>
          <div
            className="admin-overview-item-percentge"
            style={{ color: "green" }}
          >
            <BsArrowUpRight style={{ marginRight: "5px" }} size={14} />
            8.1%
          </div>
        </div>
        <div className="admin-overview-item">
          <div className="admin-overview-item-top">
            <span>Users</span>
            <FaUsers size={22} />
          </div>
          <div className="admin-overview-item-value">87</div>
          <div
            className="admin-overview-item-percentge"
            style={{ color: "green", display: "flex", alignItems: "center" }}
          >
            <BsArrowUpRight style={{ marginRight: "5px" }} size={14} />
            3.9%
          </div>
        </div>
      </div>
      <div className="chart-container">
        <div className="line-chart-container">
          <Chart
            type="line"
            width={"100%"}
            height={"100%"}
            series={product}
            options={option}
          />
        </div>
        <div className="donut-chart-container">
          <Chart
            options={pieoptions}
            series={series}
            height={350}
            type="donut"
            width="350"
          />
        </div>
      </div>
      <div
        className="products-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="orderdetail-items">
          <div className="admin-overview-title">Best Selling Products</div>
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
        <div className="bar-chart-container">
          <Chart
            options={baroptions}
            series={barseries}
            height={"100%"}
            type="bar"
            width="350"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
