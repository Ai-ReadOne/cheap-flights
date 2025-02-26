import { grey, yellow} from "@mui/material/colors";
import { THEMES } from "./constants";

const defaultVariant = {
  name: THEMES.LIGHT,
  palette: {
    mode: "light",
    primary: grey,
    secondary: grey,
    warning: yellow,
    background: {
      default: grey[100],
      paper: grey[100],
    },
  },
  sidebar: {
    color: grey[300],
    background: grey[200],
    header: {
      color: grey[300],
      background: grey[250],
      brand: {
        color: grey[800],
      },
    },
  },
};

const darkVariant = {
  name: THEMES.DARK,
  palette: {
    mode: "dark",
    primary: grey,
    secondary: grey,
    warning: yellow,
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: grey[100],
      secondary: "rgba(255, 255, 255, 0.5)",
    },
  },
  sidebar: {
    color: grey[150],
    background: grey[700],
    header: {
      color: grey[200],
      background: grey[900],
      brand: {
        color: grey[100],
      },
    },
  },
};

const variants = [
  defaultVariant,
  darkVariant,
];

export default variants;
