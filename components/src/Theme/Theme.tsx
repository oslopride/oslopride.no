import { ThemeProvider, ThemeProviderProps } from "@emotion/react";
import { theme } from "./theme";

export type ThemeProps = Omit<ThemeProviderProps, "theme"> &
  Partial<Pick<ThemeProviderProps, "theme">>;

export function Theme({ theme: defaultTheme = theme, ...rest }: ThemeProps) {
  return <ThemeProvider theme={defaultTheme} {...rest} />;
}
