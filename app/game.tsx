import React from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Board } from "@/components/Board";
import { Tile } from "@/components/types";
import { addRandomTile } from "@/components/utils";
import { initialTiles } from "@/constants/tiles";
import { router } from "expo-router";

const Game = () => {
  const { getItem, setItem } = useAsyncStorage("bestScore");
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[][]>(
    addRandomTile(addRandomTile(initialTiles)),
  );

  const readBestScore = async () => {
    const bestScore = await getItem();
    if (bestScore) {
      setBestScore(Number(bestScore));
    }
  };

  useEffect(() => {
    readBestScore();
  }, []);

  const writeBestScore = async (newBestScore: number) => {
    await setItem(newBestScore.toString());
  };

  const handleBestScoreChange = useCallback(
    async (newBestScore: number) => {
      setBestScore(newBestScore);
      await writeBestScore(newBestScore);
    },
    [setBestScore, writeBestScore],
  );

  const handleGameOver = () =>
    router.push({
      pathname: "/game-over",
      params: { score: score.toString() },
    });

  return (
    <Board
      tiles={tiles}
      score={score}
      bestScore={bestScore}
      onTilesChange={setTiles}
      onScoreChange={setScore}
      onBestScoreChange={handleBestScoreChange}
      onGameOver={handleGameOver}
    />
  );
};

export default Game;
