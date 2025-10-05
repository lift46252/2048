import React, { createContext, useContext, useMemo, useState } from "react";

type ShopTab = "coins" | "lives";

interface ShopContextType {
  isOpen: boolean;
  activeTab: ShopTab;
  openShop: (tab?: ShopTab) => void;
  closeShop: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ShopTab>("coins");

  const value = useMemo<ShopContextType>(
    () => ({
      isOpen,
      activeTab,
      openShop: (tab?: ShopTab) => {
        if (tab) setActiveTab(tab);
        setIsOpen(true);
      },
      closeShop: () => setIsOpen(false),
    }),
    [isOpen, activeTab],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = (): ShopContextType => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within a ShopProvider");
  return ctx;
};
