import { useMemo } from 'react';
import defaultTheme, { AppTheme } from './theme';

export type StyleFunctionWithoutProps<Styles> = (theme: AppTheme) => Styles;

export type StyleFunctionWithProps<Styles, Props> = (
  theme: AppTheme,
  props: Props,
) => Styles;

type ReturnVal<Styles> = { theme: AppTheme; styles: Styles };

export function useThemedStyles<Styles>(
  stylesFn: StyleFunctionWithoutProps<Styles>,
): ReturnVal<Styles>;

export function useThemedStyles<Styles, Props>(
  stylesFn: StyleFunctionWithProps<Styles, Props>,
  props: Props,
): ReturnVal<Styles>;

export function useThemedStyles<Styles, Props>(
  stylesFn:
    | StyleFunctionWithoutProps<Styles>
    | StyleFunctionWithProps<Styles, Props>,
  props?: Props,
): ReturnVal<Styles> {
  const theme = defaultTheme;

  return useMemo(
    () => ({
      theme,
      styles: props
        ? (stylesFn as StyleFunctionWithProps<Styles, Props>)(theme, props)
        : (stylesFn as StyleFunctionWithoutProps<Styles>)(theme),
    }),
    [stylesFn, theme, props],
  );
}
