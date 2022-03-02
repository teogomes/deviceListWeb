import React, { createContext, useContext, useEffect, useState } from 'react';
import { LOGIN } from './Services/graphql/authQueries';
import { signup } from './Services/userCalls';
import { useMutation } from '@apollo/client';

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
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const signIn = async (username, password) => {
    return login({ variables: { username, password } }).then(({ data }) => {
      const { token } = data?.login;
      if (!token) {
        return;
      }
      setToken(token);
      return localStorage.setItem('token', token);
    });
  };

  const signUp = async (name, username, password) => {
    const result = await signup({ username, name, password });
    return result;
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    token,
    signIn,
    signUp,
    logout,
  };
};
