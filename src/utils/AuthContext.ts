import React from "react";

interface IAuthContext {
  socketAddress: string | undefined,
  userId: Number | undefined,
  setUserId: any,
  refresh: () => void,
};

const AuthContext = React.createContext<IAuthContext>({
  socketAddress: undefined,
  userId: undefined,
  setUserId: undefined,
  refresh: () => { },
});

export { AuthContext };
export default AuthContext;