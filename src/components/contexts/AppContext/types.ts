export const directions = {
  north: 'NORTH',
  south: 'SOUTH',
  west: 'WEST',
  east: 'EAST',
  unspecified: '',
} as const;

type DirectionTypeKey = keyof typeof directions;
export type DirectionType = (typeof directions)[DirectionTypeKey];

export type RobotPosition = {
  x: number;
  y: number;
  f: DirectionType;
};

export type RobotCommmand = {
  command: 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT';
  position?: RobotPosition;
};

export type TableSize = {
  columns: number;
  rows: number;
};
