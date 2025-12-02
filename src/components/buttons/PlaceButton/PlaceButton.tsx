import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { AppTheme } from '../../../hooks/useThemedStyles/theme';
import { AppContext } from '../../contexts/AppContext/AppContext';
import { DirectionType } from '../../contexts/AppContext/types';
import { PrimaryButton } from '../../ui/PrimaryButton';

export default function PlaceButton() {
  const { styles } = useThemedStyles(stylesFn);
  const { addCommand } = useContext(AppContext);
  const [xCoordinate, setXCoordinate] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');
  const [direction, setDirection] = useState<DirectionType>('');

  const handleButtonPress = (x: number, y: number, f: DirectionType) => {
    // add validation
    addCommand({
      command: 'PLACE',
      position: { x, y, f },
    });

    setXCoordinate('');
    setYCoordinate('');
    setDirection('');
  };

  const placeButtonDisabled = !xCoordinate || !yCoordinate || !direction;

  return (
    <>
      <View style={styles.inputsContainer}>
        <View>
          <Text style={styles.label}>X</Text>
          <TextInput
            onChangeText={setXCoordinate}
            value={xCoordinate}
            placeholder="X"
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.label}>Y</Text>
          <TextInput
            onChangeText={setYCoordinate}
            value={yCoordinate}
            placeholder="Y"
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.label}>Direction</Text>
          <View style={styles.directionButtonsContainer}>
            <Button
              title="North"
              onPress={() => setDirection('NORTH')}
              color={direction === 'NORTH' ? '#0000cc' : '#000000'}
            />
            <Button
              title="East"
              onPress={() => setDirection('EAST')}
              color={direction === 'EAST' ? '#0000cc' : '#000000'}
            />
            <Button
              title="South"
              onPress={() => setDirection('SOUTH')}
              color={direction === 'SOUTH' ? '#0000cc' : '#000000'}
            />
            <Button
              title="West"
              onPress={() => setDirection('WEST')}
              color={direction === 'WEST' ? '#0000cc' : '#000000'}
            />
          </View>
        </View>
      </View>

      <View style={styles.button}>
        <PrimaryButton
          title="PLACE"
          titleColor="#ffffff"
          backgroundColor="#0000cc"
          onPress={() =>
            handleButtonPress(
              Number(xCoordinate),
              Number(yCoordinate),
              direction,
            )
          }
          disabled={placeButtonDisabled}
        />
      </View>
    </>
  );
}

const stylesFn = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    inputsContainer: {
      flexDirection: 'row',
    },
    label: {
      marginHorizontal: spacing.sp2,
    },
    input: {
      height: 40,
      margin: spacing.sp2,
      borderWidth: 1,
      padding: spacing.sp2,
      minWidth: 50,
    },
    directionButtonsContainer: {
      flexDirection: 'row',
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 4,
      margin: spacing.sp2,
    },
  });
