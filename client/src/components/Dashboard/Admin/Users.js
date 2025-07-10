import { useState, useMemo } from "react";
import "./users.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { ChangeTitle } from "../../../utils/GenralFunctions";
import Dropdown from "../Dropdown";
import { FaTrashAlt } from "react-icons/fa";
import Table from "../../Table";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  ChangeTitle("Dashboard | Users");

  const { isLoading } = useFetch(
    "http://localhost:5164/api/Account/users",
    setUsers
  );

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: (row) => `${row.firstName}  ${row.lastName}`,
      },
      {
        Header: "USERNAME",
        accessor: "userName",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "ROLE",
        accessor: "role",
      },
      {
        id: "EDIT",
        Header: "",
        Cell: ({ row }) => (
          <Dropdown>
            <div
              className="view-more"
              style={{
                position: "absolute",
                backgroundColor: "white",
                zIndex: "100",
                right: 0,
                width: "190px",
                borderRadius: "7px",
                padding: "5px",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <div
                className="dropdown-item"
                onClick={() => navigate(`${row.original.userName}`)}
              >
                <AiOutlineEdit size={19} />
                Edit
              </div>
              <div
                className="dropdown-item"
                style={{ color: "red", zIndex: 100 }}
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

  return (
    <div className="dashboard-users">
      <div className="product-title-container">
        <span>Users</span>
        <div onClick={() => navigate("create")}>New User</div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : users?.length > 0 ? (
        <Table columns={columns} data={users} />
      ) : (
        <div style={{ margin: "30px 0px 0px 35px" }}>No Users</div>
      )}
    </div>
  );
};

export default Users;
