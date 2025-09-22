import { Mission, Tile } from "@/components/types";
import { useCallback } from "react";

export type MissionType = "reach_tile" | "score_target";

export interface MissionConfig {
  type: MissionType;
  title: string;
  goal: number;
}

export const useMission = (config: MissionConfig): Mission => {
  const createMission = useCallback((): Mission => {
    switch (config.type) {
      case "reach_tile":
        return {
          title: config.title,
          fn: (tiles: Tile[][], score: number, moves: number) => {
            const maxTile = Math.max(
              ...tiles.flat().map((tile) => tile.value || 0),
            );
            return maxTile >= config.goal ? 0 : 1;
          },
        };

      case "score_target":
        return {
          title: config.title,
          fn: (tiles: Tile[][], score: number, moves: number) => {
            return score >= config.goal ? 0 : Math.ceil(config.goal - score);
          },
        };

      default:
        throw new Error(`Unknown mission type: ${config.type}`);
    }
  }, [config]);

  return createMission();
};

// Helper function to create multiple missions
export const useMissions = (configs: MissionConfig[]): Mission[] => {
  return configs.map((config) => useMission(config));
};
