import { createStyleSheet } from "react-native-unistyles";

export const splashStyle = createStyleSheet(
  ({ fonts, colors, device, spacing }) => ({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.neutralDark,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: device.wp(100),
      height: device.hp(10),
      marginBottom: spacing.xxl,
    },
    createText: {
      textAlign: "center",
      letterSpacing: 2,
      fontWeight: 800,
      color: colors.secondaryLight,
    },
    bottomContainer: {
      position: "absolute",
      bottom: spacing.xl,
    },
    bottomText: {
      letterSpacing: 1,
      color: colors.accentDark,
      fontWeight: 800,
    },
  })
);
