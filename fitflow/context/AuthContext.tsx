import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useLayoutEffect, useState } from 'react';

import { Api } from '@/api/Api';

type AuthProps = {
  isAuth?: boolean | null;
  onRegister?: (email: string, password: string) => Promise<void>;
  onLogin?: (accessToken: string) => Promise<void>;
  onLogout?: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const TOKEN = 'access-token';
const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<AuthProps['isAuth']>(null);

  useLayoutEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN);

      if (token) {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuth(true);
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string): Promise<void> => {
    try {
      return await Api.post(`${API_URL}/registration`, { email, password });
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (accessToken: string): Promise<void> => {
    try {
      Api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      await SecureStore.setItemAsync(TOKEN, accessToken);
      setIsAuth(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN);
    Api.defaults.headers.common['Authorization'] = '';
    setIsAuth(false);
  };

  const value: AuthProps = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    isAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
