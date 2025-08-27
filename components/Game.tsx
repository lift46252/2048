import { useState } from "react";
import { Board } from "./Board";
import { Tile } from "./types";

export const Game = () => {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[][]>([
    [
      { id: "1", value: 2 },
      { id: "2", value: 4 },
      { id: "3", value: null },
      { id: "4", value: null },
    ],
    [
      { id: "5", value: null },
      { id: "6", value: null },
      { id: "7", value: null },
      { id: "8", value: null },
    ],
    [
      { id: "9", value: null },
      { id: "10", value: null },
      { id: "11", value: null },
      { id: "12", value: null },
    ],
    [
      { id: "13", value: null },
      { id: "14", value: null },
      { id: "15", value: null },
      { id: "16", value: null },
    ],
  ]);

  return (
    <Board
      tiles={tiles}
      score={score}
      bestScore={bestScore}
      onTilesChange={setTiles}
      onScoreChange={setScore}
    />
  );
};
