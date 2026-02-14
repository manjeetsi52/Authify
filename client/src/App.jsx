import {  RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import API_BASE_URL from "./utils/apiBaseUrl";
import { router } from "./components/Routes/Router";
import { Suspense } from "react";
import { Loader } from "./components/ui/Loader/Loader";

export const App = () => {
  /*  Wake Render backend (non-blocking) */
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`).catch(() => {});
  }, []);

  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider
        router={router}
        fallbackElement={<h1 className="text-9xl">Loading...</h1>}
      />
      <Toaster position="top-center" />
    </Suspense>
  );
};
