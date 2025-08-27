import { GameBoard } from "@/components/GameBoard";
import { Tile } from "@/components/types";
import { useState } from "react";

import React from "react";

const index = () => {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[][]>([
    [{ value: 2 }, { value: 4 }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
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
