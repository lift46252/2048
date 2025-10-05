import { useContext } from "react";
import { CoinsContext, CoinsContextType } from "./Context";

export const useCoins = (): CoinsContextType => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinsProvider");
  }
  return context;
};
