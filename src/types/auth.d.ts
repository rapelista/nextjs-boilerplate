export type TokenType = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginBodyType = {
  username: string;
  password: string;
};
