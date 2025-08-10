import { GameBoard } from "@/components/GameBoard";
import { useState } from "react";
import { Tile } from "@/components/types";

import React from "react";

const index = () => {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[][]>([
    [2, 4, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
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
