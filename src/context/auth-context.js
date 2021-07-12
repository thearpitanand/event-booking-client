import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  userId: null,
  login: (userId, tokenExpiration, token) => {},
  logout: () => {},
});

export default AuthContext;
