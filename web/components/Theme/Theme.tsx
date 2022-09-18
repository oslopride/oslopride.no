import { ThemeProvider, ThemeProviderProps } from "@emotion/react";

export const defaultTheme = {
  colors: {
    main: {
      purple: "#3a1b7b",
      pink: "#e350a0",
      blue: "#184FBD"
    },
    text: {
      black: "#252525",
      grey: "#656781",
      white: "#ffffff"
    },
    background: {
      white: "#f7f8fa",
      pink: "#f7acb3",
      purple: "#bfb4d3",
      lightPurple: "#ebe7f1",
      lightYellow: "#ffecac"
    }
  }
};

export type ThemeProps = Omit<ThemeProviderProps, "theme"> &
  Partial<Pick<ThemeProviderProps, "theme">>;

export function Theme({ theme = defaultTheme, ...rest }: ThemeProps) {
  return <ThemeProvider theme={theme} {...rest} />;
}
