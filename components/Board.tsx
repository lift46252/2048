import { Direction, Mission, Tile } from "@/components/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { MissionList } from "./MissionList";
import { ScoreMoves } from "./ScoreMoves";
import { Tile as TileC } from "./Tile";
import { addRandomTile, mergeTiles, moveTiles } from "./utils";

interface BoardProps {
  tiles: Tile[][];
  score: number;
  moves: number;
  missions?: Mission[];
  onTilesChange: (newTiles: Tile[][]) => void;
  onScoreChange: (newScore: number) => void;
  onMovesChange: (newMoves: number) => void;
  onGameOver: VoidFunction;
}

export const Board: React.FC<BoardProps> = ({
  tiles,
  score,
  moves,
  missions = [],
  onTilesChange,
  onScoreChange,
  onMovesChange,
  onGameOver,
}) => {
  const handleSwipe = useCallback(
    (direction: Direction) => {
      if (!direction) return;

      const repositionedTiles = moveTiles(tiles, direction);
      const mergedTiles = mergeTiles(repositionedTiles, direction);
      const finalTiles = moveTiles(mergedTiles, direction);

      if (JSON.stringify(finalTiles) === JSON.stringify(tiles)) {
        finalTiles.flat().filter((tile) => tile.value === undefined).length ===
          0 && onGameOver();
        return;
      }

      // Count down moves on every swipe
      onMovesChange(moves - 1);

      const newTiles = addRandomTile(finalTiles);
      const newScore = newTiles.reduce<number>(
        (acc, row) =>
          acc + row.reduce<number>((acc, tile) => acc + (tile.value || 0), 0),
        0,
      );

      onTilesChange(newTiles);
      onScoreChange(newScore);
    },
    [tiles, moves, onTilesChange, onScoreChange, onMovesChange, onGameOver],
  );

  const backgroundColor = useThemeColor({}, "background");
  const boardColor = useThemeColor({}, "board");

  const styles = getStyles(backgroundColor, boardColor);

  return (
    <View style={styles.container}>
      <ScoreMoves score={score} moves={moves} />

      <MissionList
        missions={missions}
        tiles={tiles}
        score={score}
        moves={moves}
      />

      <GestureRecognizer
        style={styles.container}
        onSwipe={handleSwipe}
        config={{
          velocityThreshold: 0.1,
        }}
      >
        <View style={styles.board}>
          {tiles.flatMap((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <TileC key={tile.id} tile={tile} row={rowIndex} col={colIndex} />
            )),
          )}
        </View>
      </GestureRecognizer>
    </View>
  );
};

const getStyles = (backgroundColor: string, boardColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    board: {
      width: 360,
      height: 360,
      position: "relative",
      backgroundColor: boardColor,
      borderRadius: 8,
      gap: 10,
    },
  });
