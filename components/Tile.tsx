import React, { useMemo } from "react";
import { Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useTileColor } from "@/hooks/useTileColor";
import Animated from "react-native-reanimated";

interface TileProps {
  value: number | null;
  row: number;
  col: number;
}

export const Tile: React.FC<TileProps> = ({ value, row, col }) => {
  const darkTextColor = useThemeColor({}, "darkText");
  const lightTextColor = useThemeColor({}, "lightText");
  const backgroundColor = useTileColor(value)
  const color = useMemo(() => value && value > 4 ? darkTextColor : lightTextColor, [value]);

  const animatedStyles = useAnimatedStyle(() => ({
    top: withSpring(row * 90),
    left: withSpring(col * 90),
  }),[row, col]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor,
          position: "absolute",
        },
        styles.tile,
        animatedStyles,
      ]}
    >
      {value && (
        <Text style={[styles.tileText, { color }]}>
          {value}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    userSelect: "none",
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    userSelect: "none",
    fontSize: 32,
    fontWeight: "bold",
  },
});
