import axios from 'axios';

export const Api = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
