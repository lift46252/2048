export interface Tile {
  id: string;
  value?: number;
  isNew?: boolean;
}

export interface EmptyTilePosition {
  row: number;
  col: number;
}

export type ChangedTile = Omit<EmptyTilePosition, "row"> & Tile;

export enum Direction {
  LEFT = "SWIPE_LEFT",
  RIGHT = "SWIPE_RIGHT",
  UP = "SWIPE_UP",
  DOWN = "SWIPE_DOWN",
}

export interface Mission {
  title: string;
  fn: (tiles: Tile[][], score: number, moves: number) => number; // returns remaining count
}
