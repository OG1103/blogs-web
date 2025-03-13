import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type TUser = {
  id: number;
  username: string;
};

type TAuthContextType = {
  user: TUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/user/");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      await axios.post("/api/login", { username, password });
      await checkAuthStatus();
      router.push("/home");
    } catch (err) {
      alert(err);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post("/api/register", { username, password });
      await checkAuthStatus();
    } catch (err) {
      alert(err);
    }
  };

  const logout = async () => {
    await axios.post("/api/logout", {});
    setUser(null);
    router.push("/")
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
