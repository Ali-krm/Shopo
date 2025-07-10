import { Outlet } from "react-router-dom";
import NavBar from "./header/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
