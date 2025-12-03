import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { UnistylesRegistry } from "react-native-unistyles";
import {
  BorderRadius,
  BorderWidth,
  Colors,
  Fonts,
  FontSizes,
  HP,
  Shadows,
  Spacings,
  WP,
} from "./constants";

// Responsive font helper
const RV = (number: number) => RFValue(number);

// Fully responsive theme
export const defaultTheme = {
  colors: Colors,
  fonts: Fonts,

  // Font sizes (responsive)
  fontSize: FontSizes,

  // Spacing (margin/padding) responsive
  spacing: Spacings,
  // Border radius responsive
  borderRadius: BorderRadius,

  // Border width responsive
  borderWidth: BorderWidth,

  // Shadows responsive
  shadows: Shadows,

  // Device helpers
  device: {
    hp: HP,
    wp: WP,
  },

  device_screen: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
};

// Extend Unistyles themes
declare module "react-native-unistyles" {
  interface UnistylesThemes {
    default: typeof defaultTheme;
  }
}

// Register theme
UnistylesRegistry.addThemes({
  default: defaultTheme,
}).addConfig({
  adaptiveThemes: true, // auto switch based on device color scheme
});
