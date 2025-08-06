import { useThemeColor } from "./useThemeColor";

export const useTileColor = (value: number | null) => {
  const emptyTileColor = useThemeColor({}, "emptyTile");
  const tileDefaultColor = useThemeColor({}, "tileDefault");
  const tile2Color = useThemeColor({}, "tile2");
  const tile4Color = useThemeColor({}, "tile4");
  const tile8Color = useThemeColor({}, "tile8");
  const tile16Color = useThemeColor({}, "tile16");
  const tile32Color = useThemeColor({}, "tile32");
  const tile64Color = useThemeColor({}, "tile64");
  const tile128Color = useThemeColor({}, "tile128");
  const tile256Color = useThemeColor({}, "tile256");
  const tile512Color = useThemeColor({}, "tile512");
  const tile1024Color = useThemeColor({}, "tile1024");
  const tile2048Color = useThemeColor({}, "tile2048");

  if (!value) return emptyTileColor;
  const colors: Record<number, string> = {
    2: tile2Color,
    4: tile4Color,
    8: tile8Color,
    16: tile16Color,
    32: tile32Color,
    64: tile64Color,
    128: tile128Color,
    256: tile256Color,
    512: tile512Color,
    1024: tile1024Color,
    2048: tile2048Color,
  };
  return colors[value] || tileDefaultColor;
};
