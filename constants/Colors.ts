/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

interface ColorTheme {
  text: string;
  background: string;
  board: string;
  emptyTile: string;
  tile2: string;
  tile4: string;
  tile8: string;
  tile16: string;
  tile32: string;
  tile64: string;
  tile128: string;
  tile256: string;
  tile512: string;
  tile1024: string;
  tile2048: string;
  tileDefault: string;
  scoreBox: string;
  button: string;
  darkText: string;
  lightText: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export const Colors = {
  light: {
    text: "#776E65",
    background: "#FAF5E8",
    board: "#BBADA0",
    emptyTile: "#CDC1B4",
    tile2: "#EEE4DA",
    tile4: "#EDE0C8",
    tile8: "#F2B179",
    tile16: "#F59563",
    tile32: "#F67C5F",
    tile64: "#F65E3B",
    tile128: "#EDCF72",
    tile256: "#EDCC61",
    tile512: "#EDC850",
    tile1024: "#EDC53F",
    tile2048: "#EDC22E",
    tileDefault: "#3C3A32",
    scoreBox: "#BBADA0",
    button: "#8F7A66",
    darkText: "#F9F6F2",
    lightText: "#776E65",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#F9F6F2",
    background: "#151718",
    board: "#151718",
    emptyTile: "#202020",
    tile2: "#202020",
    tile4: "#202020",
    tile8: "#F2B179",
    tile16: "#F59563",
    tile32: "#F67C5F",
    tile64: "#F65E3B",
    tile128: "#EDCF72",
    tile256: "#EDCC61",
    tile512: "#EDC850",
    tile1024: "#EDC53F",
    tile2048: "#EDC22E",
    tileDefault: "#3C3A32",
    scoreBox: "#151718",
    button: "#202020",
    darkText: "#F9F6F2",
    lightText: "#776E65",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
