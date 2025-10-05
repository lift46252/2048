import { ICON_SIZE_MEDIUM } from "@/constants/ui";
import { formatTime } from "@/contexts/lives/utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfiniteLivesViewProps {
  infiniteUntil: Date;
}

export const InfiniteLivesView: React.FC<InfiniteLivesViewProps> = ({
  infiniteUntil,
}) => {
  const textColor = useThemeColor({}, "lightText");
  const now = new Date();
  const timeRemaining = Math.max(0, infiniteUntil.getTime() - now.getTime());

  return (
    <View style={styles.livesSection}>
      <Ionicons name="infinite" size={ICON_SIZE_MEDIUM} color="#FF6B6B" />
      <Text style={[styles.livesText, { color: textColor }]}>
        {formatTime(timeRemaining)}
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
