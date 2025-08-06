import { GameBoard } from "@/components/GameBoard";
import { useState } from "react";
import { Tile } from "@/components/types";

import React from "react";

const index = () => {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[]>([
    { id: 1, value: 2, row: 0, col: 0 },
    { id: 2, value: 4, row: 0, col: 1 },
    { id: 3, value: null, row: 0, col: 2 },
    { id: 4, value: null, row: 0, col: 3 },
    { id: 5, value: null, row: 1, col: 0 },
    { id: 6, value: null, row: 1, col: 1 },
    { id: 7, value: null, row: 1, col: 2 },
    { id: 8, value: null, row: 1, col: 3 },
    { id: 9, value: null, row: 2, col: 0 },
    { id: 10, value: null, row: 2, col: 1 },
    { id: 11, value: null, row: 2, col: 2 },
    { id: 12, value: null, row: 2, col: 3 },
    { id: 13, value: null, row: 3, col: 0 },
    { id: 14, value: null, row: 3, col: 1 },
    { id: 15, value: null, row: 3, col: 2 },
    { id: 16, value: null, row: 3, col: 3 },
  ]);

  return (
    <GameBoard
      tiles={tiles}
      score={score}
      bestScore={bestScore}
      onTilesChange={setTiles}
      onScoreChange={setScore}
    />
  );
};

export default index;
