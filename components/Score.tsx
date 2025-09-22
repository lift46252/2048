import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScoreProps {
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ score }) => {
  const scoreBoxColor = useThemeColor({}, "scoreBox");
  const scoreLabelColor = useThemeColor({}, "darkText");
  const scoreValueColor = useThemeColor({}, "lightText");

  const styles = getStyles(scoreBoxColor, scoreLabelColor, scoreValueColor);

  return (
    <View style={styles.scoreBox}>
      <Text style={styles.scoreLabel}>Score</Text>
      <Text style={styles.scoreValue}>{score}</Text>
    </View>
  );
};

const getStyles = (
  scoreBoxColor: string,
  scoreLabelColor: string,
  scoreValueColor: string,
) =>
  StyleSheet.create({
    scoreBox: {
      padding: 12,
      backgroundColor: scoreBoxColor,
      borderRadius: 8,
      alignItems: "center",
      marginHorizontal: 8,
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
  });
