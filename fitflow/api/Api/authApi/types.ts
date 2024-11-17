export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
  };
};
