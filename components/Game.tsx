import { useState } from "react";
import { Board } from "./Board";
import { Tile } from "./types";
import { addRandomTile } from "./utils";

export const Game = () => {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[][]>(
    addRandomTile(
      addRandomTile([
        [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
        [{ id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }],
        [{ id: "9" }, { id: "10" }, { id: "11" }, { id: "12" }],
        [{ id: "13" }, { id: "14" }, { id: "15" }, { id: "16" }],
      ]),
    ),
  );

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
