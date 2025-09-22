import { LevelConfig } from "@/components/types";
import levelsConfig from "@/constants/levels.json";

export const useLevelConfig = (levelId: number): LevelConfig => {
  const levelKey = levelId.toString();
  const config = levelsConfig[levelKey as keyof typeof levelsConfig];

  // Return default config for level 1 if level not found
  return (config || levelsConfig["1"]) as LevelConfig;
};
