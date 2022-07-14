import { createContext } from "react";

const AuthContext = createContext({
  user: {
    userId: "",
    username: "",
  },
  setUser: (auth: any) => {},
});

export default AuthContext;
