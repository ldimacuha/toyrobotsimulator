import { RobotCommmand, RobotPosition } from './types';

export type CommandActionState = {
  commands: RobotCommmand[];
  robotPosition: RobotPosition | undefined;
};

export const initialCommandActionState: CommandActionState = {
  commands: [],
  robotPosition: undefined,
};

export const commandReducer = (
  state: CommandActionState,
  action: {
    type: 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT' | 'RESET';
    tableSize?: { columns: number; rows: number };
    position?: RobotPosition | undefined;
  },
) => {
  switch (action.type) {
    case 'PLACE':
      if (!action.position) return state;
      return {
        ...state,
        commands: [
          ...state.commands,
          { command: action.type, position: action.position },
        ],
        robotPosition: action.position,
      };

    case 'MOVE':
      if (!state.robotPosition || !action.tableSize) return state;

      const canMove = canRobotMove(state.robotPosition, action.tableSize);
      if (!canMove) return state;

      return {
        ...state,
        commands: [
          ...state.commands,
          { command: action.type, position: action.position },
        ],
        robotPosition: moveRobotPosition(state.robotPosition),
      };

    case 'LEFT':
    case 'RIGHT':
      if (!state.robotPosition) return state;
      return {
        ...state,
        commands: [
          ...state.commands,
          { command: action.type, position: action.position },
        ],
        robotPosition: turnRobot(state.robotPosition, action.type),
      };

    case 'REPORT':
      if (!state.robotPosition) return state;
      return {
        ...state,
        commands: [
          ...state.commands,
          { command: action.type, position: action.position },
        ],
      };

    case 'RESET':
      return {
        commands: [],
        robotPosition: undefined,
      };

    default:
      return state;
  }
};

// function to move the robot one unit in the direction it is currently facing
function moveRobotPosition(position: RobotPosition): RobotPosition | undefined {
  switch (position.f) {
    case 'NORTH':
      return {
        x: position.x,
        y: position.y + 1,
        f: position.f,
      };

    case 'SOUTH':
      return {
        x: position.x,
        y: position.y - 1,
        f: position.f,
      };

    case 'EAST':
      return {
        x: position.x + 1,
        y: position.y,
        f: position.f,
      };

    case 'WEST':
      return {
        x: position.x - 1,
        y: position.y,
        f: position.f,
      };
  }
}

// function to check if the robot can move in the direction it is currently facing
function canRobotMove(
  position: RobotPosition,
  tableSize: { columns: number; rows: number },
) {
  switch (position.f) {
    case 'NORTH':
      return position.y < tableSize.rows - 1;
    case 'SOUTH':
      return position.y > 0;
    case 'EAST':
      return position.x < tableSize.columns - 1;
    case 'WEST':
      return position.x > 0;
  }
  return false;
}

// function to turn the robot left or right
function turnRobot(
  position: RobotPosition,
  direction: 'LEFT' | 'RIGHT',
): RobotPosition | undefined {
  switch (position.f) {
    case 'NORTH':
      if (direction === 'LEFT') return { ...position, f: 'WEST' };
      return { ...position, f: 'EAST' };

    case 'SOUTH':
      if (direction === 'LEFT') return { ...position, f: 'EAST' };
      return { ...position, f: 'WEST' };

    case 'EAST':
      if (direction === 'LEFT') return { ...position, f: 'NORTH' };
      return { ...position, f: 'SOUTH' };

    case 'WEST':
      if (direction === 'LEFT') return { ...position, f: 'SOUTH' };
      return { ...position, f: 'NORTH' };
  }
}
