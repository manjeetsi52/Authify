import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "../../header/Header";
import { Footer } from "../../footer/Footer";
import { useBioContext } from "../../../hooks/UseBioContext";
import { useEffect } from "react";

export const AppLayout = () => {
  const user = useLoaderData();
  const { isLoggedIn, setUser,  setIsLoggedIn } = useBioContext();
  // console.log(user)
  useEffect(() => {
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
      console.log(isLoggedIn); 
    }
  }, [user, setUser, setIsLoggedIn]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
