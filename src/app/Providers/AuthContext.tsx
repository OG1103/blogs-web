import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

type TUser = {
  id: number;
  email: string;
  name: string;
};

type TAuthContextType = {
  user: TUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) checkAuthStatus();
  }, [isClient]);

  const checkAuthStatus = async () => {
    try {
      if (user) return;

      console.log("Making a call");
      const response = await axios.get("/api/user/");
      setUser(response.data.user);
      console.log("user", response.data.user);
      router.push("/home");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.data) {
        console.log(error.response.data);
      } else {
        console.error("unexpected error");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
     const response =  await axios.post("/api/user/login", { email, password });
     localStorage.setItem("token", response.data.token);

      await checkAuthStatus();
    } catch (err) {
      throw err;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      await axios.post("/api/user/register", {
        firstName,
        lastName,
        email,
        password,
      });
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await axios.post("/api/user/logout", {});
    setUser(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
