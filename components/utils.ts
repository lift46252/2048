import { Tile, Direction } from "@/components/types";

export const isT = <T>(value: T | undefined): value is T => value !== undefined;

export const addRandomTile = (tiles: Tile[]): Tile[] => {
  const emptyCellsIndexes = tiles
    .map((cell, index) => (cell.value === null ? index : undefined))
    .filter(isT);

  if (emptyCellsIndexes.length === 0) return tiles;
  const randomEmptyCellIndex = Math.round(
    Math.random() * (emptyCellsIndexes.length - 1),
  );
  const randomCellIndex = emptyCellsIndexes[randomEmptyCellIndex];
  const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4

  const newTiles = [...tiles];

  newTiles[randomCellIndex] = { ...newTiles[randomCellIndex], value: newValue };

  return newTiles;
};

const mergeTile = (changedTiles: Tile[]) => (tile: Tile) => {
  const populatedTile = changedTiles.find(
    (changedTile) =>
      changedTile.col === tile.col && changedTile.row === tile.row,
  );
  return populatedTile || tile;
};

const mergeHorizontal = (
  tiles: Tile[],
  direction: Direction.LEFT | Direction.RIGHT,
) => {
  const changedTiles: Tile[] = [];

  tiles.forEach((tile, tIndex) => {
    const nearCol =
      direction === Direction.LEFT
        ? Math.max(0, tile.col - 1)
        : Math.min(3, tile.col + 1);
    const nearTile =
      nearCol !== tile.col
        ? tiles.find(
            (cell, cIndex) =>
              cell.row === tile.row &&
              cell.col === nearCol &&
              (Direction.LEFT === direction
                ? cIndex < tIndex
                : cIndex > tIndex),
          )
        : null;
    if (nearTile && nearTile.value === tile.value && tile.value !== null) {
      changedTiles.push({ ...nearTile, value: tile.value * 2 });
      changedTiles.push({ ...tile, value: null });
    }
  });

  return tiles.map(mergeTile(changedTiles));
};
const mergeVertical = (
  tiles: Tile[],
  direction: Direction.UP | Direction.DOWN,
) => {
  const changedTiles: Tile[] = [];

  tiles.forEach((tile, tIndex) => {
    const nearRow =
      direction === Direction.UP
        ? Math.max(0, tile.row - 1)
        : Math.min(3, tile.row + 1);

    const nearTile =
      nearRow !== tile.row
        ? tiles.find(
            (cell, cIndex) =>
              cell.col === tile.col &&
              cell.row === nearRow &&
              (Direction.UP === direction ? cIndex < tIndex : cIndex > tIndex),
          )
        : null;

    if (nearTile && tile.value && nearTile.value === tile.value) {
      changedTiles.push({ ...nearTile, value: tile.value * 2 });
      changedTiles.push({ ...tile, value: null });
    }
  });

  return tiles.map(mergeTile(changedTiles));
};

export const mergeTiles = (tiles: Tile[], direction: Direction): Tile[] => {
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    return mergeHorizontal(tiles, direction);
  } else {
    return mergeVertical(tiles, direction);
  }
};

const moveTile = (changedTiles: Tile[]) => (tile: Tile) => {
  const populatedTile = changedTiles.find(
    (changedTile) =>
      changedTile.col === tile.col && changedTile.row === tile.row,
  );
  return populatedTile || { ...tile, value: null };
};

const moveHorizontal = (
  tiles: Tile[],
  direction: Direction.LEFT | Direction.RIGHT,
): Tile[] => {
  const changedTiles: Tile[] = [];

  tiles.forEach((tile, tIndex) => {
    const emptyCellsLength = tiles.filter(
      (cell, cIndex) =>
        cell.row === tile.row &&
        cell.value === null &&
        // calc on empty cells which is before or after the tile in dependency of the direction
        (Direction.LEFT === direction ? cIndex < tIndex : cIndex > tIndex),
    ).length;

    // if empty cells length is 0, do not move the tile
    // else move the tile to the new col
    const newCol =
      emptyCellsLength === 0
        ? tile.col
        : direction === Direction.LEFT
          ? Math.max(0, tile.col - emptyCellsLength)
          : Math.min(3, tile.col + emptyCellsLength);

    const newTile = tiles.filter(
      (cell) => cell.row === tile.row && cell.col === newCol,
    )[0];

    tile.value && changedTiles.push({ ...newTile, value: tile.value });
  });

  console.log("🚀 ~ moveHorizontal ~ changedTiles:", changedTiles);

  return tiles.map(moveTile(changedTiles));
};

const moveVertical = (
  tiles: Tile[],
  direction: Direction.UP | Direction.DOWN,
): Tile[] => {
  const changedTiles: Tile[] = [];

  tiles.forEach((tile, tIndex) => {
    const emptyCellsLength = tiles.filter(
      (cell, cIndex) =>
        cell.col === tile.col &&
        cell.value === null &&
        // calc on empty cells which is before or after the tile in dependency of the direction
        (Direction.UP === direction ? cIndex < tIndex : cIndex > tIndex),
    ).length;

    // if empty cells length is 0, do not move the tile
    // else move the tile to the new row
    const newRow =
      emptyCellsLength === 0
        ? tile.row
        : direction === Direction.UP
          ? Math.max(0, tile.row - emptyCellsLength)
          : Math.min(3, tile.row + emptyCellsLength);
    const newTile = tiles.filter(
      (cell) => cell.col === tile.col && cell.row === newRow,
    )[0];

    tile.value && changedTiles.push({ ...newTile, value: tile.value });
  });

  console.log("🚀 ~ moveVertical ~ changedTiles:", changedTiles);

  return tiles.map(moveTile(changedTiles));
};

export const moveTiles = (tiles: Tile[], direction: Direction): Tile[] => {
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    return moveHorizontal(tiles, direction);
  } else {
    return moveVertical(tiles, direction);
  }
};
