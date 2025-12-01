import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { commandReducer, initialCommandActionState } from './commandReducer';
import { RobotCommmand, RobotPosition, TableSize } from './types';

const MAX_TABLE_COLUMNS = 5;
const MAX_TABLE_ROWS = 5;
const TABLE_SIZE = { columns: MAX_TABLE_COLUMNS, rows: MAX_TABLE_ROWS };

type AppContextType = {
  data: {
    tableSize: TableSize;
    commands: RobotCommmand[];
    robotPosition: RobotPosition | undefined;
  };
  addCommand: (command: RobotCommmand) => void;
  reset: () => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, reducerDispatch] = useReducer(
    commandReducer,
    initialCommandActionState,
  );

  const addCommand = (command: RobotCommmand) => {
    switch (command.command) {
      case 'PLACE':
        if (command.position) {
          reducerDispatch({
            type: command.command,
            position: command.position,
          });
        }
        break;

      case 'MOVE':
        reducerDispatch({
          type: command.command,
          tableSize: TABLE_SIZE,
        });
        break;

      case 'LEFT':
      case 'RIGHT':
        reducerDispatch({
          type: command.command,
        });
        break;

      case 'REPORT':
        reducerDispatch({
          type: command.command,
        });
    }
  };

  const reset = () => {
    reducerDispatch({
      type: 'RESET',
      tableSize: TABLE_SIZE,
    });
  };

  const context = useMemo(
    () => ({
      data: {
        tableSize: TABLE_SIZE,
        commands: state.commands,
        robotPosition: state.robotPosition,
      },
      addCommand,
      reset,
    }),
    [state],
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
