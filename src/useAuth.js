import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from './Services/userCalls';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuthProvider = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const signIn = async (username, password) => {
    const result = await login({ username, password });
    const token = result?.data?.token;
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    }
    return result;
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    token,
    signIn,
    logout,
  };
};
