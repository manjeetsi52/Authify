import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userFromGAuth, setUserFromGAuth] = useState(false);
  const [resendInfo, setResendInfo] = useState({
    buttonStatus: "send",
    disabled: false,
    resendTime: 0,
  });

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authLoading,
        setAuthLoading,
        user,
        setUser,
        resendInfo,
        setResendInfo,
        userFromGAuth,
        setUserFromGAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};
