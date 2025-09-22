import { Board } from "@/components/Board";
import { Tile } from "@/components/types";
import { addRandomTile } from "@/components/utils";
import { initialTiles } from "@/constants/tiles";
import { useLevelConfig } from "@/hooks/useLevelConfig";
import { useMissions } from "@/hooks/useMission";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";

const Level = () => {
  const { id } = useLocalSearchParams();
  const levelId = parseInt(id as string) || 1;

  // Get level configuration using the custom hook
  const levelConfig = useLevelConfig(levelId);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(levelConfig.moves);
  const [tiles, setTiles] = useState<Tile[][]>(
    addRandomTile(addRandomTile(initialTiles)),
  );

  // Generate missions using the hook
  const missions = useMissions(levelConfig.missions);

  const handleGameOver = useCallback(
    () =>
      router.push({
        pathname: "/game-over",
        params: { score: score.toString(), levelId: levelId.toString() },
      }),
    [score, levelId],
  );

  const handleMovesChange = useCallback(
    (newMoves: number) => {
      setMoves(newMoves);
      if (newMoves <= 0) {
        handleGameOver();
      }
    },
    [handleGameOver],
  );

  return (
    <Board
      tiles={tiles}
      score={score}
      moves={moves}
      missions={missions}
      onTilesChange={setTiles}
      onScoreChange={setScore}
      onMovesChange={handleMovesChange}
      onGameOver={handleGameOver}
    />
  );
};

export default Level;
