import { createStyleSheet } from "react-native-unistyles";

export const loginStyle = createStyleSheet(
  ({ fonts, colors, device, spacing }) => ({
    bgGradient: {
      flex: 1,
    },
    container: {
      marginTop: 10,
      padding: spacing.xxl,
    },
    inputCont: {
      paddingTop: spacing.xxl,
    },
    fogetPassword: {
      alignSelf: "flex-end",
      paddingBottom: spacing.xxl,
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
    signUp: {
      flexDirection: "row",
      alignSelf: "center",
      paddingBottom: spacing.xxl,
      gap: 10,
    },
    versionContainer: {
      position: "relative",
      left: 0,
      bottom: 0,
    },
  })
);
