import "@emotion/react";
import { theme } from "./index";

declare module "@emotion/react" {
  export type Theme = typeof theme;
}
