import React from "react";

interface IAuthContext {
  socketAddress: string | undefined,
  userId: Number | undefined,
};

const AuthContext = React.createContext<IAuthContext>({
  socketAddress: undefined,
  userId: undefined
});

export { AuthContext };
export default AuthContext;