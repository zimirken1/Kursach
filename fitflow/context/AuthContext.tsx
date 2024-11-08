import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

type AuthProps = {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const TOKEN = 'access-token';
const API_URL = process.env.API_URL || '';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthProps['authState']>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/registration`, { email, password });
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      await SecureStore.setItemAsync(TOKEN, response.data.token);

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value: AuthProps = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
