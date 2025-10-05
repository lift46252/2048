import React, { createContext, useCallback, useEffect, useState } from "react";
import { LIFE_REFILL_TIME, loadLives, MAX_LIVES, saveLives } from "./utils";

export interface LivesContextType {
  currentLives: number;
  maxLives: number;
  timeUntilNextLife: number;
  isLoading: boolean;
  infiniteUntil?: Date;
  spendLife: VoidFunction;
  addLife: VoidFunction;
  resetLives: VoidFunction;
  activateInfiniteLives: (durationMinutes: number) => void;
}

export const LivesContext = createContext<LivesContextType | undefined>(
  undefined,
);

export const LivesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLives, setCurrentLives] = useState<number>(MAX_LIVES);
  const [timeUntilNextLife, setTimeUntilNextLife] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefillTime, setLastRefillTime] = useState<number>(Date.now());
  const [infiniteUntil, setInfiniteUntil] = useState<Date | undefined>(
    undefined,
  );

  // Load lives from storage on mount
  useEffect(() => {
    loadLives(
      setCurrentLives,
      setLastRefillTime,
      setIsLoading,
      setInfiniteUntil,
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveLives(currentLives, lastRefillTime, infiniteUntil);
    }
  }, [currentLives, lastRefillTime, infiniteUntil, isLoading]);

  // Timer effect for life refill
  useEffect(() => {
    if (currentLives >= MAX_LIVES) {
      setTimeUntilNextLife(0);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastRefill = now - lastRefillTime;
      const timeUntilNext =
        LIFE_REFILL_TIME - (timeSinceLastRefill % LIFE_REFILL_TIME);

      setTimeUntilNextLife(timeUntilNext);

      if (timeSinceLastRefill >= LIFE_REFILL_TIME) {
        addLife();
        setLastRefillTime(now);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentLives, lastRefillTime]);

  // Timer effect for infinite lives expiration
  useEffect(() => {
    if (!infiniteUntil) return;

    const interval = setInterval(() => {
      const now = new Date();
      if (now >= infiniteUntil) {
        setInfiniteUntil(undefined);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [infiniteUntil, currentLives, lastRefillTime]);

  const addLife = useCallback(() => {
    const now = Date.now();
    setCurrentLives((prev) => Math.min(prev + 1, MAX_LIVES));
    setLastRefillTime(now);
  }, []);

  const spendLife = useCallback(() => {
    const now = Date.now();
    setCurrentLives((prev) => Math.max(prev - 1, 0));
    setLastRefillTime(now);
  }, []);

  const resetLives = useCallback(() => {
    const now = Date.now();
    setCurrentLives(MAX_LIVES);
    setLastRefillTime(now);
  }, []);

  const activateInfiniteLives = useCallback((durationMinutes: number) => {
    const now = new Date();
    const endTime = new Date(now.getTime() + durationMinutes * 60 * 1000);
    setInfiniteUntil(endTime);
  }, []);

  const value: LivesContextType = {
    currentLives,
    maxLives: MAX_LIVES,
    timeUntilNextLife,
    isLoading,
    infiniteUntil,
    addLife,
    spendLife,
    resetLives,
    activateInfiniteLives,
  };

  return (
    <LivesContext.Provider value={value}>{children}</LivesContext.Provider>
  );
};
