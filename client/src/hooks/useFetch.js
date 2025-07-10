import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { CartState } from "../contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const useFetch = (url, onChange) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = CartState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.accessToken}`;
      try {
        const { data, status } = await axiosPrivate
          .get(url)
          .finally(() => setIsLoading(false));
        onChange && onChange(data);
        if (!status === 200) {
          setIsError(true);
          return;
        }
        
        setData(data);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/login", { state: { from: location }, replace: true });
        }
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  return { isLoading, isError, data };
};

export default useFetch;
