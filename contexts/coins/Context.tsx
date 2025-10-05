import { loadCoins, saveCoins } from "./utils";
import React, { createContext, useCallback, useEffect, useState } from "react";

export interface CoinsContextType {
  coins: number;
  isLoading: boolean;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
}

export const CoinsContext = createContext<CoinsContextType | undefined>(
  undefined,
);

export const CoinsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [coins, setCoins] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load coins from storage on mount
  useEffect(() => {
    loadCoins(setCoins, setIsLoading);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveCoins(coins);
    }
  }, [coins, isLoading]);

  const handleAddCoins = useCallback(
    (amount: number) => setCoins((prev) => prev + amount),
    [],
  );

  const handleSpendCoins = useCallback(
    (amount: number) => setCoins((prev) => prev - amount),
    [],
  );

  const value: CoinsContextType = {
    coins,
    isLoading,
    addCoins: handleAddCoins,
    spendCoins: handleSpendCoins,
  };

  return (
    <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>
  );
};
