import { ICON_SIZE_MEDIUM } from "@/constants/ui";
import { useLives } from "@/contexts/lives/hooks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const RegularLivesView: React.FC = () => {
  const textColor = useThemeColor({}, "lightText");
  const { currentLives, maxLives, isLoading } = useLives();

  if (isLoading) return null;

  return (
    <View style={styles.livesSection}>
      <Ionicons name="heart" size={ICON_SIZE_MEDIUM} color="#FF6B6B" />
      <Text style={[styles.livesText, { color: textColor }]}>
        {currentLives}/{maxLives}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  livesSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  livesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
