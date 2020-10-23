import { createText, createBox} from "@shopify/restyle";
import { moderateScale } from "react-native-size-matters";

const theme = {
  color: {
    black: "#2C3A47",
    text: "#2d3436",
    grey: "#636e72",
    white: "#dfe6e9",
    primary: "#0984e3",
    button: "#74b9ff",
    color: "#00cec9",
    green: "#00b894",
    danger: "#d63031",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    tittle: {
      fontSize: moderateScale(15),
      fontFamily: "Gotham-Black",
      color: "white",
    },
    body: {
      fontSize: 16,
      fontFamily: "Gotham-Medium",
      lineHeight: 25,
      text: "text",
    },
    button: {
      fontFamily: 15,
      fontFamily: "Gotham-Bold",
      color: "text",
    },
    breakpoints: {},
  },
};

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;