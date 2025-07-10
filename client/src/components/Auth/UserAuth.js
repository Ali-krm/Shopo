import { useLocation, Navigate, Outlet } from "react-router-dom";
import { CartState } from "../../contexts/CartContext";

const Auth = () => {
  const { auth } = CartState();
  const location = useLocation();

  return auth?.accessToken && auth?.role == "User" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Auth;
