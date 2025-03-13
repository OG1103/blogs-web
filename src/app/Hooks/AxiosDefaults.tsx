import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../Providers/AuthContext";

export function useAxiosDefaults() {
  const { logout } = useAuthContext();

  useEffect(() => {
    // Set axios defaults
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000"; 

    // Add response interceptor
    const interceptor = axios.interceptors.response.use(
      (response) => response, // Pass successful responses
      async (error) => {
        if (error.response?.status === 401) {
          console.warn("Unauthorized request detected. Logging out...");
          await logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptor
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [logout]);
}
