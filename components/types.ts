export type Tile = number | null;

export interface EmptyTilePosition {
  row: number;
  col: number;
}

export interface ChangedTile extends Omit<EmptyTilePosition, "row"> {
  value: Tile;
}

export enum Direction {
  LEFT = "SWIPE_LEFT",
  RIGHT = "SWIPE_RIGHT",
  UP = "SWIPE_UP",
  DOWN = "SWIPE_DOWN",
}
