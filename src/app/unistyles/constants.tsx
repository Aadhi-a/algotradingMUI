import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

// Helper functions for responsive sizes
export const HP = (percentage: number) => (deviceHeight * percentage) / 100;
export const WP = (percentage: number) => (deviceWidth * percentage) / 100;

// Colors
const primary = {
  50: "#fbf9fb",
  100: "#f5f1f6",
  200: "#ede6ee",
  300: "#ddd2e0",
  400: "#c8b4cc",
  500: "#b69dbb",
  600: "#9b7ca1",
  700: "#846789",
  800: "#6f5772",
  900: "#5a475c",
  950: "#3d2c3f",
};

export const Colors = {
  primary: primary[500],
  primaryLight: primary[300],
  primaryDark: primary[700],
  primaryScale: primary,

  secondary: primary[300],
  secondaryLight: primary[200],
  secondaryDark: primary[400],

  accent: primary[400],
  accentLight: primary[300],
  accentDark: primary[600],

  neutral: primary[50],
  neutralDark: primary[900],
  neutralMuted: primary[200],
  border: primary[100],

  text: primary[900],
  textMuted: primary[600],
  textOnPrimary: "#ffffff",

  background: primary[50],
  backgroundCard: "#ffffff",
  backgroundDark: primary[950],

  success: "#4caf50",
  successLight: "#81c784",
  successDark: "#388e3c",

  warning: "#ffb300",
  warningLight: "#ffcc80",
  warningDark: "#f57c00",

  error: "#e53935",
  errorLight: "#ef9a9a",
  errorDark: "#c62828",

  PureCanvas: "#ffffff",
  CloudDrift: "#fafafa",
  SoftPearl: "#f4f4f5",
};

// Fonts
export const Fonts = {
  Mono_Medium: "DMMono-Medium",
  Mono_Regular: "DMMono-Regular",
  Inter_Bold: "Inter_24pt-Bold",
  Inter_ExtraBold: "Inter_24pt-ExtraBold",
  Inter_Medium: "Inter_24pt-Medium",
  Inter_Regular: "Inter_24pt-Regular",
  Inter_SemiBold: "Inter_24pt-SemiBold",
};

// Font Sizes (responsive)
export const FontSizes = {
  xs: RFValue(10),
  sm: RFValue(12),
  md: RFValue(14),
  lg: RFValue(16),
  xl: RFValue(18),
  xxl: RFValue(20),
  huge: RFValue(24),
};

// Border radius (responsive)
export const BorderRadius = {
  sm: WP(1), // ~1% of screen width
  md: WP(2),
  lg: WP(3),
  xl: WP(4),
  round: WP(50), // fully round
};

// Border width (responsive)
export const BorderWidth = {
  thin: WP(0.3),
  regular: WP(0.5),
  thick: WP(1),
};

// Spacing (margin/padding) responsive
export const Spacings = {
  xs: WP(1), // 1% of screen width
  sm: WP(2),
  md: WP(3),
  lg: WP(4),
  xl: WP(5),
  xxl: WP(6),
};

export const Gradients = {
  primary: [primary[600], Colors.CloudDrift],
  primaryDark: ["#364f47", "#141f1c"],
  primaryDiagonal: ["#527a6c", "#93b5a7", "#ffffff"],
  secondary: [primary[400], primary[600]],
};

// Shadows (responsive optional, mainly elevation & offset)
export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: HP(0.2) },
    shadowOpacity: 0.1,
    shadowRadius: WP(0.5),
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: HP(0.5) },
    shadowOpacity: 0.2,
    shadowRadius: WP(1),
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: HP(1) },
    shadowOpacity: 0.3,
    shadowRadius: WP(2),
    elevation: 6,
  },

  textShadow: {
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 0.5 },
    textShadowRadius: 0.5,
  },
};
