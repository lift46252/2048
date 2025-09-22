import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MovesProps {
  moves: number;
}

export const Moves: React.FC<MovesProps> = ({ moves }) => {
  const scoreBoxColor = useThemeColor({}, "scoreBox");
  const scoreLabelColor = useThemeColor({}, "darkText");
  const scoreValueColor = useThemeColor({}, "lightText");

  const styles = getStyles(scoreBoxColor, scoreLabelColor, scoreValueColor);

  return (
    <View style={styles.movesBox}>
      <Text style={styles.movesLabel}>Moves</Text>
      <Text style={styles.movesValue}>{moves}</Text>
    </View>
  );
};

const getStyles = (
  scoreBoxColor: string,
  scoreLabelColor: string,
  scoreValueColor: string,
) =>
  StyleSheet.create({
    movesBox: {
      padding: 12,
      backgroundColor: scoreBoxColor,
      borderRadius: 8,
      alignItems: "center",
      marginHorizontal: 8,
    },
    movesLabel: {
      fontSize: 16,
      color: scoreLabelColor,
      marginBottom: 4,
    },
    movesValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: scoreValueColor,
    },
  });
