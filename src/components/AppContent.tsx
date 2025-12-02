import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { AppTheme } from '../hooks/useThemedStyles/theme';
import { TableView } from './TableView';
import { PlaceButton } from './buttons/PlaceButton';
import { AppContext } from './contexts/AppContext/AppContext';
import { SafeView } from './layouts/SafeView';
import { PrimaryButton } from './ui/PrimaryButton';

export default function AppContent() {
  const { styles } = useThemedStyles(stylesFn);
  const { data, addCommand, reset } = useContext(AppContext);

  const handleReport = () => {
    addCommand({ command: 'REPORT' });

    if (!data.robotPosition) return;
    // show REPORT alert
    Alert.alert(
      'Report',
      `Output: ${data.robotPosition.x}, ${data.robotPosition.y}, ${data.robotPosition.f}`,
    );
  };

  return (
    <SafeView>
      <ScrollView>
        <TableView columns={5} rows={5} position={data.robotPosition} />

        <PlaceButton />

        <View style={styles.button}>
          <PrimaryButton
            title="MOVE"
            titleColor="#ffffff"
            backgroundColor="#0000cc"
            onPress={() => addCommand({ command: 'MOVE' })}
          />
        </View>

        <View style={styles.button}>
          <PrimaryButton
            title="LEFT"
            titleColor="#ffffff"
            backgroundColor="#0000cc"
            onPress={() => addCommand({ command: 'LEFT' })}
          />
        </View>

        <View style={styles.button}>
          <PrimaryButton
            title="RIGHT"
            titleColor="#ffffff"
            backgroundColor="#0000cc"
            onPress={() => addCommand({ command: 'RIGHT' })}
          />
        </View>

        <View style={styles.button}>
          <PrimaryButton
            title="REPORT"
            titleColor="#ffffff"
            backgroundColor="#0000cc"
            onPress={handleReport}
          />
        </View>

        <View style={styles.button}>
          <PrimaryButton
            title="RESET"
            titleColor="#ffffff"
            backgroundColor="#0000cc"
            onPress={reset}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
}

const stylesFn = ({ spacing }: AppTheme) =>
  StyleSheet.create({
    button: {
      margin: spacing.sp2,
    },
  });
