import { createContext, useReducer } from "react";
import storeReducer from "../store/reducer";
export const UserContext = createContext();
export const StoreProvider = ({ children }) => {
  const initialState = {
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2024-01-10T00:00:00Z",
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = {
    state,
    dispatch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
