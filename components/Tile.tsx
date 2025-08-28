import { useThemeColor } from "@/hooks/useThemeColor";
import { useTileColor } from "@/hooks/useTileColor";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Tile as TileType } from "./types";

interface TileProps {
  tile: TileType;
  row: number;
  col: number;
}

export const Tile: React.FC<TileProps> = ({ tile, row, col }) => {
  const { value, isNew } = tile;
  const darkTextColor = useThemeColor({}, "darkText");
  const lightTextColor = useThemeColor({}, "lightText");
  const backgroundColor = useTileColor(value);
  const color = useMemo(
    () => (value && value > 4 ? darkTextColor : lightTextColor),
    [value, darkTextColor, lightTextColor],
  );

  const textAnimatedStyles = useAnimatedStyle(
    () => ({
      fontSize: isNew
        ? withSequence(withSpring(36), withSpring(32))
        : value
          ? 32
          : 0,
    }),
    [isNew, value],
  );

  const tileAnimatedStyles = useAnimatedStyle(() => ({
    top: value ? withTiming(row * 90, { duration: 300 }) : row * 90,
    left: value ? withTiming(col * 90, { duration: 300 }) : col * 90,
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor,
          zIndex: value ?? 0,
        },
        styles.tile,
        tileAnimatedStyles,
      ]}
    >
      {value && (
        <Animated.Text style={[styles.tileText, { color }, textAnimatedStyles]}>
          {value}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    userSelect: "none",
    position: "absolute",
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
