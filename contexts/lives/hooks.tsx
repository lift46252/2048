import { useContext } from "react";
import { LivesContext, LivesContextType } from "./Context";

export const useLives = (): LivesContextType => {
  const context = useContext(LivesContext);
  if (context === undefined) {
    throw new Error("useLives must be used within a LivesProvider");
  }
  return context;
};
