import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    blue: {
      "50": "#EAF2FA",
      "100": "#C5DCF2",
      "200": "#A0C5E9",
      "300": "#7AAFE0",
      "400": "#5598D8",
      "500": "#3082CF",
      "600": "#2668A6",
      "700": "#1D4E7C",
      "800": "#133453",
      "900": "#0A1A29",
    },
  },
});

export default theme;
