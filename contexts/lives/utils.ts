import AsyncStorage from "@react-native-async-storage/async-storage";

export const LIVES_STORAGE_KEY = "game_lives";
export const INFINITE_LIVES_STORAGE_KEY = "game_infinite_lives";
export const MAX_LIVES = 5;
export const LIFE_REFILL_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const isLivesFull = (
  currentLives: number,
  maxLives: number,
): boolean => {
  return currentLives >= maxLives;
};

export const canPlay = (
  currentLives: number,
  infiniteUntil?: Date,
): boolean => {
  if (infiniteUntil && new Date() < infiniteUntil) {
    return true;
  }
  return currentLives > 0;
};

export const loadLives = async (
  setCurrentLives: (lives: number) => void,
  setLastRefillTime: (time: number) => void,
  setIsLoading: (isLoading: boolean) => void,
  setInfiniteUntil?: (date: Date | undefined) => void,
) => {
  try {
    const storedLives = await AsyncStorage.getItem(LIVES_STORAGE_KEY);
    const storedTime = await AsyncStorage.getItem(`${LIVES_STORAGE_KEY}_time`);
    const storedInfiniteUntil = await AsyncStorage.getItem(
      INFINITE_LIVES_STORAGE_KEY,
    );

    let lives = MAX_LIVES;
    let lastRefill = Date.now();
    let infiniteUntil: Date | undefined = undefined;

    if (storedLives !== null) {
      lives = parseInt(storedLives, 10);
    }

    if (storedTime !== null) {
      lastRefill = parseInt(storedTime, 10);
    }

    if (storedInfiniteUntil !== null) {
      const infiniteUntilTime = parseInt(storedInfiniteUntil, 10);
      const now = Date.now();
      // Only restore if the infinite lives haven't expired yet
      if (infiniteUntilTime > now) {
        infiniteUntil = new Date(infiniteUntilTime);
      }
    }

    // Calculate how many lives should be refilled based on time elapsed
    const now = Date.now();
    const timeElapsed = now - lastRefill;
    const livesToRefill = Math.floor(timeElapsed / LIFE_REFILL_TIME);

    if (livesToRefill > 0) {
      // Refill lives up to max, but don't exceed max
      const newLives = Math.min(lives + livesToRefill, MAX_LIVES);
      const newLastRefill = lastRefill + livesToRefill * LIFE_REFILL_TIME;

      setCurrentLives(newLives);
      setLastRefillTime(newLastRefill);

      // Save the updated values
      await AsyncStorage.setItem(LIVES_STORAGE_KEY, newLives.toString());
      await AsyncStorage.setItem(
        `${LIVES_STORAGE_KEY}_time`,
        newLastRefill.toString(),
      );
    } else {
      setCurrentLives(lives);
      setLastRefillTime(lastRefill);
    }

    // Set infinite until if it exists and hasn't expired
    if (setInfiniteUntil) {
      setInfiniteUntil(infiniteUntil);
    }
  } catch (error) {
    console.error("Error loading lives:", error);
  } finally {
    setIsLoading(false);
  }
};

export const saveLives = async (
  lives: number,
  time: number,
  infiniteUntil?: Date,
) => {
  try {
    await AsyncStorage.setItem(LIVES_STORAGE_KEY, lives.toString());
    await AsyncStorage.setItem(`${LIVES_STORAGE_KEY}_time`, time.toString());

    if (infiniteUntil) {
      await AsyncStorage.setItem(
        INFINITE_LIVES_STORAGE_KEY,
        infiniteUntil.getTime().toString(),
      );
    } else {
      await AsyncStorage.removeItem(INFINITE_LIVES_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error saving lives:", error);
  }
};
