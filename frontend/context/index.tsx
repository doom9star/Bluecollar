import { createContext, FC, useCallback, useContext, useState } from "react";
import { AlertState, TCtx } from "./types";

const Ctx = createContext<TCtx>({} as TCtx);

export const useCtx = () => useContext(Ctx);

const CtxProvider: FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    alerter: null,
    message: "",
  });
  const resetAlert = useCallback(() => {
    setAlert({ alerter: null, message: "" });
  }, []);
  return (
    <Ctx.Provider value={{ alert, setAlert, resetAlert }}>
      {children}
    </Ctx.Provider>
  );
};
export default CtxProvider;
