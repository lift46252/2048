import {
  Tile,
  Direction,
  EmptyTilePosition,
  ChangedTile,
} from "@/components/types";

export const isT = <T>(value: T | undefined): value is T => value !== undefined;

export const addRandomTile = (tiles: Tile[][]): Tile[][] => {
  const emptyCellsIndexes: EmptyTilePosition[] = tiles
    .reduce<
      EmptyTilePosition[]
    >((acc, row, index) => [...acc, ...row.map((cell, col) => (cell === null ? { row: index, col: col } : undefined)).filter(isT)], [])
    .filter(isT);

  if (emptyCellsIndexes.length === 0) return tiles;
  const randomEmptyCellIndex = Math.round(
    Math.random() * (emptyCellsIndexes.length - 1),
  );
  const randomCellIndex = emptyCellsIndexes[randomEmptyCellIndex];
  const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4

  const newTiles = [...tiles];

  newTiles[randomCellIndex.row][randomCellIndex.col] = newValue;

  return newTiles;
};

const merge = (
  tiles: Tile[][],
  direction: Direction.LEFT | Direction.RIGHT,
): Tile[][] => {
  let positionedTiles = tiles;

  if (direction === Direction.RIGHT) {
    positionedTiles = tiles.map((row) => row.reverse());
  }

  let newTiles = positionedTiles.map((row) =>
    row.reduce<Tile[]>((acc: Tile[], tile: Tile, col: number): Tile[] => {
      const changedTiles: ChangedTile[] = [];

      const nearCol = Math.max(0, col - 1);

      const nearTile =
        nearCol !== col ? acc.find((_, cellCol) => cellCol === nearCol) : null;

      if (nearTile === tile && tile !== null) {
        changedTiles.push({ col: nearCol, value: tile * 2 });
        changedTiles.push({ col: col, value: null });
      }

      return acc.map(updateTile(changedTiles));
    }, row),
  );

  if (direction === Direction.RIGHT) {
    newTiles = newTiles.map((row) => row.reverse());
  }

  return newTiles;
};

export const mergeTiles = (tiles: Tile[][], direction: Direction): Tile[][] => {
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    return merge(tiles, direction);
  } else {
    const transposedTiles = transpose(tiles);
    const transposedDirection =
      direction === Direction.UP ? Direction.LEFT : Direction.RIGHT;
    const mergedTiles = merge(transposedTiles, transposedDirection);
    return transpose(mergedTiles);
  }
};

const updateTile =
  (changedTiles: ChangedTile[]) => (tile: Tile, index: number) => {
    const populatedTile = changedTiles.find(
      (changedTile) => changedTile.col === index,
    );
    return populatedTile === undefined ? tile : populatedTile.value;
  };

const move = (
  tiles: Tile[][],
  direction: Direction.LEFT | Direction.RIGHT,
): Tile[][] => {
  let positionedTiles = tiles;

  if (direction === Direction.RIGHT) {
    positionedTiles = tiles.map((row) => row.reverse());
  }

  let newTiles = positionedTiles.map((row) =>
    row.reduce((acc: Tile[], tile: Tile, col: number) => {
      const changedTiles: ChangedTile[] = [];
      const emptyCellsLength = acc.filter(
        (cell, cellCol) =>
          cell === null &&
          // calc on empty cells which is before or after the tile in dependency of the direction
          cellCol < col,
      ).length;

      // if empty cells length is 0, do not move the tile
      // else move the tile to the new col
      const newCol =
        emptyCellsLength === 0 ? col : Math.max(0, col - emptyCellsLength);

      if (tile && col !== newCol) {
        changedTiles.push({ col: newCol, value: tile });
        changedTiles.push({ col: col, value: null });
      }

      return acc.map(updateTile(changedTiles));
    }, row),
  );

  if (direction === Direction.RIGHT) {
    newTiles = newTiles.map((row) => row.reverse());
  }

  return newTiles;
};

export const moveTiles = (tiles: Tile[][], direction: Direction): Tile[][] => {
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    return move(tiles, direction);
  } else {
    const transposedTiles = transpose(tiles);
    const transposedDirection =
      direction === Direction.UP ? Direction.LEFT : Direction.RIGHT;
    const movedTiles = move(transposedTiles, transposedDirection);
    return transpose(movedTiles);
  }
};

const transpose = (arr: Tile[][]) =>
  arr[0].map((_, i) => arr.map((row) => row[i]));
