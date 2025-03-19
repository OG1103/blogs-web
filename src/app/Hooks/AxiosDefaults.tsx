import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export function useAxiosDefaults() {
  const router = useRouter();

  useEffect(() => {
    // Set axios defaults
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

    // Add request interceptor to attach token
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        config.headers["X-Frontend-Secret"] = process.env.NEXT_PUBLIC_SECRET_KEY
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        ; 
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle 401 errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response, // Pass successful responses
      async (error) => {
        if (error.response?.status === 401) {
          console.warn("Unauthorized request detected. Logging out...");
          localStorage.removeItem("token");
          router.push("/");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
}
