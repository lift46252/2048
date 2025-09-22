import React from "react";
import { StyleSheet, View } from "react-native";
import { Moves } from "./Moves";
import { Score } from "./Score";

interface ScoreMovesProps {
  score: number;
  moves: number;
}

export const ScoreMoves: React.FC<ScoreMovesProps> = ({ score, moves }) => {
  return (
    <View style={styles.scoreContainer}>
      <Score score={score} />
      <Moves moves={moves} />
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
