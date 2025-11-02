import { Context } from "../context/AppContext";
import { useContext } from "react";

export const useBioContext = () => {
  const bioContext = useContext(Context);
  if (bioContext === undefined)
    throw new Error("Component must be wrapped in provider!");

  return bioContext;
};
