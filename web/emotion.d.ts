import "@emotion/react";
import { defaultTheme } from "./index";

type DefaultTheme = typeof defaultTheme;

declare module "@emotion/react" {
  export interface Theme extends DefaultTheme {}
}
