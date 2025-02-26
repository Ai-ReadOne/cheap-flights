import "@mui/lab/themeAugmentation";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import variants from "./variants";
import typography from "./typography";
import {BREAKPOINTS} from "./constants";
import components from "./components";
import shadows from "./shadows";

const createTheme = (name) => {
  let themeConfig = variants.find((variant) => variant.name === name);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${name} is not valid`));
    themeConfig = variants[0];
  }

  return createMuiTheme(
    {
      spacing: 4,
      breakpoints: BREAKPOINTS,
      components: components,
      typography: typography,
      shadows: shadows,
      palette: themeConfig.palette
    },
    {
      name: themeConfig.name,
      indicator: themeConfig.indicator,
      sidebar: themeConfig.sidebar
    }
  );
};

export default createTheme;
