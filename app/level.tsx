import { Board } from "@/components/Board";
import { Tile } from "@/components/types";
import { addRandomTile } from "@/components/utils";
import { initialTiles } from "@/constants/tiles";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";

const Level = () => {
  const { moves: movesParam } = useLocalSearchParams();
  const initialMoves = parseInt(movesParam as string) || 20;
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(initialMoves);
  const [tiles, setTiles] = useState<Tile[][]>(
    addRandomTile(addRandomTile(initialTiles)),
  );

  const handleGameOver = useCallback(
    () =>
      router.push({
        pathname: "/game-over",
        params: { score: score.toString() },
      }),
    [score],
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
      onTilesChange={setTiles}
      onScoreChange={setScore}
      onMovesChange={handleMovesChange}
      onGameOver={handleGameOver}
    />
  );
};

export default Level;
