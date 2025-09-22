import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { StarRating } from "./StarRating";

interface LevelCardProps {
  levelNumber: number;
  stars: number;
  isLocked: boolean;
}

export const LevelCard = ({ levelNumber, stars, isLocked }: LevelCardProps) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "text");

  const handlePress = () => {
    if (!isLocked) {
      router.push(`/levels/${levelNumber}`);
    }
  };

  return (
    <Pressable
      style={[
        styles.levelCard,
        {
          backgroundColor: isLocked ? "#CCCCCC" : backgroundColor,
          borderColor: borderColor,
        },
        isLocked && styles.lockedCard,
      ]}
      onPress={handlePress}
      disabled={isLocked}
    >
      <Text
        style={[
          styles.levelNumber,
          {
            color: isLocked ? "#999999" : textColor,
          },
        ]}
      >
        {levelNumber}
      </Text>
      <StarRating rating={stars} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  levelCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
    marginBottom: 16,
    minWidth: 120,
    minHeight: 120,
  },
  lockedCard: {
    opacity: 0.6,
  },
  levelNumber: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
