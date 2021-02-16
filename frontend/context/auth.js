import { Router, useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import * as API from "../api";
import cookies from "js-cookie";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (username, password) => {
    const res = await API.login(username, password);
    if (res.success) {
      setUser({ ...res.data, isLoggedIn: true });
      if (res.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } else {
      setError(res.data);
    }
  };

  const logout = async () => {
    API.logout();
    setUser(null);
    router.push("/login");
    cookies.remove("sid");
  };

  const validateLogin = async () => {
    const res = await API.validateLogin();
    if (res.success) {
      setUser({ ...res.data, isLoggedIn: true });
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (cookies.get("sid")) {
      validateLogin();
    }
  }, []);

  useEffect(() => {
    if (user?.isLoggedIn && router.pathname === "/admin" && user?.role !== "admin") {
      router.push("/account");
    }
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
