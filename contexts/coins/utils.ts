import AsyncStorage from "@react-native-async-storage/async-storage";
import { COINS_STORAGE_KEY } from "@/constants/ui";

export const loadCoins = async (
  setCoins: (coins: number) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  try {
    const storedCoins = await AsyncStorage.getItem(COINS_STORAGE_KEY);
    if (storedCoins !== null) {
      setCoins(parseInt(storedCoins, 10));
    }
  } catch (error) {
    console.error("Error loading coins:", error);
  } finally {
    setIsLoading(false);
  }
};

export const saveCoins = async (newCoins: number) => {
  try {
    await AsyncStorage.setItem(COINS_STORAGE_KEY, newCoins.toString());
  } catch (error) {
    console.error("Error saving coins:", error);
  }
};

export const calculateCoinsFromScore = (score: number): number => {
  return Math.floor(score / 10);
};
