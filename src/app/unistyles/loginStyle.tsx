import { createStyleSheet } from "react-native-unistyles";

export const loginStyle = createStyleSheet(
  ({ fonts, colors, device, spacing }) => ({
    bgGradient: {
      flex: 1,
    },
    container: {
      padding: spacing.xxl,
    },
    txtContent: {
      justifyContent: "space-between",
      padding: spacing.xxl,
      alignItems: "center",
      gap: 10,
    },
    title: {
      fontSize: 26,
      color: "red",
      marginBottom: 20,
    },
  })
);
