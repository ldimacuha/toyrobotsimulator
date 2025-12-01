import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { AppTheme } from '../../../hooks/useThemedStyles/theme';

type SafeViewProps = PropsWithChildren<{
  backgroundColor?: string;
}>;

export default function SafeView({ children }: SafeViewProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const { styles } = useThemedStyles(stylesFn, safeAreaInsets);

  return <View style={styles.container}>{children}</View>;
}

const stylesFn = ({}: AppTheme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });
