import { useLocation, Navigate, Outlet } from "react-router-dom";
import { CartState } from "../../contexts/CartContext";

const Auth = ({ allowedRoles }) => {
  const { auth } = CartState();
  const location = useLocation();

  return allowedRoles.find((role) => auth?.role?.includes(role)) ? (
    <Outlet />
  ) : auth ? (
    <Navigate
      to="/user-dashboard/overview"
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Auth;
