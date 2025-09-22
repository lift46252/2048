import { Mission as MissionType, Tile } from "@/components/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MissionProps {
  mission: MissionType;
  tiles: Tile[][];
  score: number;
  moves: number;
}

export const Mission: React.FC<MissionProps> = ({
  mission,
  tiles,
  score,
  moves,
}) => {
  const scoreBoxColor = useThemeColor({}, "scoreBox");
  const scoreLabelColor = useThemeColor({}, "darkText");
  const scoreValueColor = useThemeColor({}, "lightText");

  const remaining = mission.fn(tiles, score, moves);
  const isComplete = remaining === 0;

  const styles = getStyles(scoreBoxColor, scoreLabelColor, scoreValueColor);

  return (
    <View style={styles.missionItem}>
      <Text style={styles.missionTitle}>{mission.title}</Text>
      <Text
        style={[styles.missionRemaining, isComplete && styles.completeText]}
      >
        {isComplete ? "✓ Complete" : `${remaining} left`}
      </Text>
    </View>
  );
};

const getStyles = (
  scoreBoxColor: string,
  scoreLabelColor: string,
  scoreValueColor: string,
) =>
  StyleSheet.create({
    missionItem: {
      backgroundColor: scoreBoxColor,
      borderRadius: 8,
      padding: 8,
      flex: 1,
      marginHorizontal: 4,
    },
    missionTitle: {
      fontSize: 12,
      color: scoreLabelColor,
      fontWeight: "600",
      marginBottom: 2,
    },
    missionRemaining: {
      fontSize: 10,
      color: scoreValueColor,
    },
    completeText: {
      color: "#4CAF50", // Green color for completed missions
      fontWeight: "bold",
    },
  });
