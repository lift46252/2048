export type Tile = {
  id: number;
  value: number | null;
  row: number;
  col: number;
};

export enum Direction {
  LEFT = "SWIPE_LEFT",
  RIGHT = "SWIPE_RIGHT",
  UP = "SWIPE_UP",
  DOWN = "SWIPE_DOWN",
}
