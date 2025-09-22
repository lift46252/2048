import { Direction, Tile } from "@/components/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Tile as TileC } from "./Tile";
import { addRandomTile, mergeTiles, moveTiles } from "./utils";

interface BoardProps {
  tiles: Tile[][];
  score: number;
  moves: number;
  onTilesChange: (newTiles: Tile[][]) => void;
  onScoreChange: (newScore: number) => void;
  onMovesChange: (newMoves: number) => void;
  onGameOver: VoidFunction;
}

export const Board: React.FC<BoardProps> = ({
  tiles,
  score,
  moves,
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
        finalTiles.flat().filter((tile) => tile.value === undefined).length === 0 && onGameOver();
        return;
      };
      
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
  const scoreBoxColor = useThemeColor({}, "scoreBox");
  const scoreLabelColor = useThemeColor({}, "darkText");
  const scoreValueColor = useThemeColor({}, "lightText");
  const boardColor = useThemeColor({}, "board");

  const styles = getStyles(
    backgroundColor,
    scoreBoxColor,
    scoreLabelColor,
    scoreValueColor,
    boardColor,
  );

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Moves</Text>
          <Text style={styles.scoreValue}>{moves}</Text>
        </View>
      </View>

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

const getStyles = (
  backgroundColor: string,
  scoreBoxColor: string,
  scoreLabelColor: string,
  scoreValueColor: string,
  boardColor: string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    scoreContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    scoreBox: {
      padding: 12,
      backgroundColor: scoreBoxColor,
      borderRadius: 8,
      alignItems: "center",
    },
    scoreLabel: {
      fontSize: 16,
      color: scoreLabelColor,
      marginBottom: 4,
    },
    scoreValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: scoreValueColor,
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
