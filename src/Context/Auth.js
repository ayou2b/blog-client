import { createContext } from "react";

const Auth = createContext({
  token: "",
  isLoggedIn: false,
  expirationTime: "",
  userId: "",
});

export default Auth;
