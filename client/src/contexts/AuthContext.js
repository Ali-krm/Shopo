import { createContext, useContext } from "react";
import useLocalStorage from "use-local-storage";

const Auth = createContext(null);
const AuthContext = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  return <Auth.Provider value={{ auth, setAuth }}>{children}</Auth.Provider>;
};

export const AuthState = () => {
  return useContext(Auth);
};

export default AuthContext;
