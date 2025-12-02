import { Button, Platform, StyleSheet, View } from 'react-native';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { AppTheme } from '../../../hooks/useThemedStyles/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  titleColor: string;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  backgroundColor,
  titleColor,
  disabled,
}: PrimaryButtonProps) {
  const { styles } = useThemedStyles(stylesFn);

  if (Platform.OS === 'android') {
    return (
      <Button
        title={title}
        onPress={onPress}
        color={backgroundColor}
        disabled={disabled}
      />
    );
  }

  return (
    <View style={styles.button}>
      <Button
        title={title}
        onPress={onPress}
        color={titleColor}
        disabled={disabled}
      />
    </View>
  );
}

const stylesFn = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      borderRadius: 4,
      margin: spacing.sp2,
    },
  });
