import levelsConfig from "@/constants/levels.json";
import { useCallback, useEffect, useState } from "react";

interface LevelData {
  number: number;
  stars: number;
  isLocked: boolean;
}

interface UseLevelsReturn {
  levels: LevelData[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useLevels = (itemsPerPage: number = 6): UseLevelsReturn => {
  const [levels, setLevels] = useState<LevelData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const totalLevels = Object.keys(levelsConfig).length;

  const loadLevels = useCallback(
    async (page: number) => {
      setLoading(true);

      // Simulate API delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const newLevels: LevelData[] = [];

      for (let i = startIndex; i < endIndex && i < totalLevels; i++) {
        const levelNumber = i + 1;
        const levelKey = levelNumber.toString();

        // Check if level exists in config
        if (levelsConfig[levelKey as keyof typeof levelsConfig]) {
          newLevels.push({
            number: levelNumber,
            stars: 0, // TODO: Get from saved progress
            isLocked:
              levelNumber > 1 &&
              !levelsConfig[
                (levelNumber - 1).toString() as keyof typeof levelsConfig
              ], // Lock if previous level doesn't exist
          });
        }
      }

      setLevels((prev) => (page === 1 ? newLevels : [...prev, ...newLevels]));
      setHasMore(endIndex < totalLevels);
      setCurrentPage(page);
      setLoading(false);
    },
    [itemsPerPage, totalLevels],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadLevels(currentPage + 1);
    }
  }, [loading, hasMore, currentPage, loadLevels]);

  const refresh = useCallback(() => {
    setCurrentPage(1);
    setLevels([]);
    setHasMore(true);
    loadLevels(1);
  }, [loadLevels]);

  useEffect(() => {
    loadLevels(1);
  }, [loadLevels]);

  return {
    levels,
    loading,
    hasMore,
    loadMore,
    refresh,
  };
};
