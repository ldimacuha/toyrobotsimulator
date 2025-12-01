const BLUE = '#0f4c81';
const GREEN = '#278040';
const YELLOW = '#ffc428';

const SPACING = {
  spacing: {
    sp0: 0,
    sp1: 4,
    sp2: 8,
    sp3: 16,
    sp4: 32,
    sp5: 64,
  },
};

const defaultTheme = {
  colors: {
    primary: BLUE,
    primaryContainer: BLUE,
    onPrimary: '#ffffff',
    onPrimaryContainer: '#ffffff',
    secondary: GREEN,
    secondaryContainer: GREEN,
    onSecondary: '#ffffff',
    onSecondaryContainer: '#ffffff',
    tertiary: YELLOW,
    tertiaryContainer: YELLOW,
    onTertiary: '#ffffff',
    onTertiaryContainer: '#ffffff',
  },
  ...SPACING,
};

export type AppTheme = typeof defaultTheme;

export default defaultTheme;
