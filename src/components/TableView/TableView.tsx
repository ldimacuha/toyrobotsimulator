import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { AppTheme } from '../../hooks/useThemedStyles/theme';
import {
  directions,
  DirectionType,
  RobotPosition,
} from '../contexts/AppContext/types';

type TableViewProps = {
  columns: number;
  rows: number;
  position: RobotPosition | undefined;
  showCoordinates?: boolean;
};

export default function TableView({
  columns,
  rows,
  position,
  showCoordinates,
}: TableViewProps) {
  const { styles } = useThemedStyles(stylesFn);

  // display error if table size is invalid
  if (columns <= 0 || columns > 5 || rows <= 0 || rows > 5)
    return <Text>Invalid table size.</Text>;

  // create empty grid
  const data: DirectionType[][] = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => directions.unspecified),
  );

  // If a robot position is provided and within bounds, place its facing string
  if (position) {
    const { x, y, f } = position;
    if (x >= 0 && x < columns && y >= 0 && y < rows) {
      const rowIndex = rows - 1 - y;
      data[rowIndex][x] = f;
    }
  }

  return (
    <View style={styles.container}>
      {data.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((column, columnIndex) => {
            const displayX = columnIndex;
            const displayY = rows - 1 - rowIndex; // origin bottom-left
            return (
              <View
                key={`column-${rowIndex}-${columnIndex}`}
                style={styles.cell}
              >
                <Text style={styles.cellText}>{column}</Text>
                {column ? <Text style={styles.cellText}>O</Text> : null}
                {showCoordinates ? (
                  <Text style={styles.coordText}>
                    {`(${displayX},${displayY})`}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const stylesFn = ({ spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: spacing.sp1,
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      borderWidth: 1,
      borderColor: '#ccc',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
    },
    cellText: {
      fontSize: 10,
      textAlign: 'center',
    },
    coordText: {
      fontSize: 10,
      color: '#666',
      marginTop: spacing.sp1,
    },
  });
