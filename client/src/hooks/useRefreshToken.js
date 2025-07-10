import axios from "../api/axios";
import { CartState } from "../contexts/CartContext";

const useRefreshToken = () => {
  const { auth, setAuth } = CartState();

  const refresh = async () => {
    let d;
    try {
      const { data } = await axios.post(
        "http://localhost:5164/api/Account/refresh",
        {
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        }
      );
      setAuth(data);
      console.log(data, "refresh");
      d = data.accessToken;
    } catch (error) {
      console.log(error.messege);
    }
    return d;
  };
  return refresh;
};

export default useRefreshToken;
