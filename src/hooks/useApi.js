import { useState } from "react";
import axios from "axios";

const useApi = (endpoint, method = "GET", payload = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        data: payload,
      });

      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};

export default useApi;