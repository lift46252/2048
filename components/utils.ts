import { Tile, Direction } from "@/components/types";

export const addRandomTile = (tiles: Tile[]): Tile[] => {
  const emptyCells = tiles.filter((cell) => cell.value === null);

  if (emptyCells.length === 0) return tiles;

  const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
  const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4

  const newTiles = [...tiles];
  // TODO seems can be occuped already
  newTiles[randomCellIndex] = { ...newTiles[randomCellIndex], value: newValue };

  return newTiles;
};

export const mergeTiles = (tiles: Tile[], direction: Direction): Tile[] => {
  const changedTiles: Tile[] = [];

  console.log("😃😃😃😃😃😃😃😃😃😃😃😃😃😃\n😃😃😃😃😃😃😃😃😃😃😃😃😃😃\n😃😃😃😃😃😃😃😃😃😃😃😃😃😃")

  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    tiles.forEach((tile, tIndex) => {
      const nearCol =
        direction === Direction.LEFT
          ? Math.max(0, tile.col - 1)
          : Math.min(3, tile.col + 1);
      console.log(`🚀 ~ tiles.${tile.row}-${tile.col} ~ nearCol: ${nearCol}`)
      const nearTile =
        nearCol !== tile.col
          ? tiles.find((cell, cIndex) => cell.row === tile.row && cell.col === nearCol && (Direction.LEFT === direction ? cIndex < tIndex : cIndex > tIndex))
          : null;
      console.log(`🚀 ~ tiles.${tile.row}-${tile.col} ~ nearTile: ${nearTile}`)
      if (nearTile && nearTile.value === tile.value && tile.value !== null) {
        changedTiles.push({ ...nearTile, value: tile.value * 2 });
        changedTiles.push({ ...tile, value: null });
      }
    });
  } else {
    tiles.forEach((tile, tIndex) => {
      const nearRow =
        direction === Direction.UP
          ? Math.max(0, tile.row - 1)
          : Math.min(3, tile.row + 1);
      console.log(`🚀 ~ tiles.${tile.row}-${tile.col} ~ nearRow: ${nearRow}`)

      const nearTile =
        nearRow !== tile.row
          ? tiles.find((cell, cIndex) => cell.col === tile.col && cell.row === nearRow && (Direction.UP === direction ? cIndex < tIndex : cIndex > tIndex))
          : null;

      console.log(`🚀 ~ tiles.${tile.row}-${tile.col} ~ nearTile: ${nearTile}`)

      if (nearTile && tile.value && nearTile.value === tile.value) {
        changedTiles.push({ ...nearTile, value: tile.value * 2 });
        changedTiles.push({ ...tile, value: null });
      }
    });
  }

  const newTiles = tiles.map((tile) => {
    const populatedTile = changedTiles.find(
      (changedTile) =>
        changedTile.col === tile.col && changedTile.row === tile.row,
    );
    if (populatedTile) {
      return populatedTile;
    }
    return tile;
  });

  return newTiles;
};

export const moveTiles = (tiles: Tile[], direction: Direction): Tile[] => {
  const changedTiles: Tile[] = [];
  console.log(
    "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀",
  );
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
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
      const isExistingTile = tiles.find(
        (cell) =>
          cell.value === tile.value &&
          cell.row === tile.row &&
          cell.col === newCol &&
          cell.value !== null,
      );
      const newTile = tiles.find(
        (cell) => cell.row === tile.row && cell.col === newCol,
      );
      console.log("🚀 ~ tiles.forEach ~ newTile:", newTile)
      console.log(
        `🚀 ~ tiles.${tile.row}-${tile.col} ~ emptyCellsLength: ${emptyCellsLength}`,
      );
      console.log(`🚀 ~ tiles.${tile.row}-${tile.col} ~ newCol: ${newCol}`);
      console.log(
        `🚀 ~ tiles.${tile.row}-${tile.col} ~ isExistingTile: ${isExistingTile}`,
      );
      if (!isExistingTile && tile.value && newTile) {
        changedTiles.push({ ...tile, id: newTile.id, value: null });
        changedTiles.push({ ...tile, col: newCol });
      }
    });
  } else {
    tiles.forEach((tile) => {
      const emptyCellsLength = tiles.filter(
        (cell) =>
          cell.col === tile.col &&
          cell.value === null &&
          // calc on empty cells which is before or after the tile in dependency of the direction
          (Direction.UP === direction
            ? cell.row < tile.row
            : cell.row > tile.row),
      ).length;

      // if empty cells length is 0, do not move the tile
      // else move the tile to the new row
      const newRow =
        emptyCellsLength === 0
          ? tile.row
          : direction === Direction.UP
            ? Math.max(0, tile.row - emptyCellsLength)
            : Math.min(3, tile.row + emptyCellsLength);
      const isExistingTile = tiles.find(
        (cell) =>
          cell.col === tile.col && cell.row === newRow && cell.value !== null,
      );
      const newTile = tiles.find(
        (cell) => cell.col === tile.col && cell.row === newRow,
      );
      console.log("🚀 ~ tiles.forEach ~ newTile:", newTile)
      console.log(
        `🚀 ~ tiles.${tile.row}-${tile.col} ~ emptyCellsLength: ${emptyCellsLength}`,
      );
      console.log(`🚀 ~ tiles.${tile.row}-${tile.col} ~ newRow: ${newRow}`);
      console.log(
        `🚀 ~ tiles.${tile.row}-${tile.col} ~ isExistingTile: ${isExistingTile}`,
      );
      if (tile.value && !isExistingTile && newTile) {
        changedTiles.push({ ...tile, id: newTile.id, value: null });
        changedTiles.push({ ...tile, row: newRow });
      }
    });
  }

  console.log("🚀 ~ moveTiles ~ changedTiles:", changedTiles);

  const newTiles = tiles.map((tile) => {
    const populatedTile = changedTiles.find(
      (changedTile) =>
        changedTile.col === tile.col && changedTile.row === tile.row,
    );
    if (populatedTile) {
      return populatedTile;
    }
    return tile;
  });
  console.log("🚀 ~ moveTiles ~ newTiles:", newTiles);

  return newTiles;
};
