import { Mission as MissionType, Tile } from "@/components/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Mission } from "./Mission";

interface MissionListProps {
  missions: MissionType[];
  tiles: Tile[][];
  score: number;
  moves: number;
}

export const MissionList: React.FC<MissionListProps> = ({
  missions,
  tiles,
  score,
  moves,
}) => {
  if (missions.length === 0) {
    return null;
  }

  return (
    <View style={styles.missionsContainer}>
      {missions.map((mission, index) => (
        <Mission
          key={index}
          mission={mission}
          tiles={tiles}
          score={score}
          moves={moves}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  missionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
    maxWidth: 360,
  },
});
