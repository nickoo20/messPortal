import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
//import Cookies from 'js-cookie';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  // default axios...

  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(
        {
          ...auth,
          user: parseData.user,
          token: parseData.token,
        },
        [auth]
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook..

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
