import {
  ChangedTile,
  Direction,
  EmptyTilePosition,
  Tile,
} from "@/components/types";

export const isT = <T>(value: T | undefined): value is T => value !== undefined;

export const addRandomTile = (tiles: Tile[][]): Tile[][] => {
  const emptyCellsIndexes: EmptyTilePosition[] = tiles
    .reduce<
      EmptyTilePosition[]
    >((acc, row, index) => [...acc, ...row.map((cell, col) => (cell.value === null ? { row: index, col: col } : undefined)).filter(isT)], [])
    .filter(isT);

  if (emptyCellsIndexes.length === 0) return tiles;
  const randomEmptyCellIndex = Math.round(
    Math.random() * (emptyCellsIndexes.length - 1),
  );
  const randomCellIndex = emptyCellsIndexes[randomEmptyCellIndex];
  const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4

  const newTiles = [
    ...tiles.map((row) => row.map((tile) => ({ ...tile, isNew: false }))),
  ];

  newTiles[randomCellIndex.row][randomCellIndex.col] = {
    value: newValue,
    isNew: true,
    id: newTiles[randomCellIndex.row][randomCellIndex.col].id,
  };

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

      if (nearTile?.value === tile.value && tile.value !== null) {
        changedTiles.push({
          col: nearCol,
          value: tile.value ? tile.value * 2 : null,
          id: tile.id,
        });
        changedTiles.push({ col: col, value: null, id: nearTile.id });
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
    return populatedTile === undefined
      ? tile
      : {
          id: populatedTile.id,
          value: populatedTile.value,
          isNew: populatedTile.isNew,
        };
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
          cell.value === null &&
          // calc on empty cells which is before or after the tile
          cellCol < col,
      ).length;

      // if empty cells length is 0, do not move the tile
      // else move the tile to the new col
      const newCol =
        emptyCellsLength === 0 ? col : Math.max(0, col - emptyCellsLength);
      const newTileId = acc[newCol].id;

      if (tile.value && col !== newCol) {
        changedTiles.push({ col: newCol, value: tile.value, id: tile.id });
        changedTiles.push({ col: col, value: null, id: newTileId });
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
