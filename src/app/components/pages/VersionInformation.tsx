import { View, Text } from "react-native";
import React, { FC } from "react";
import DeviceInfoLib from "react-native-device-info";
import StyledText from "@components/global/StylesText";
import { Colors } from "@unistyles/constants";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const VersionInformation: FC = () => {
  const { styles } = useStyles(VersionInformationStyle);
  const appVersion = DeviceInfoLib.getVersion();
  const buildNumber = DeviceInfoLib.getBuildNumber();
  return (
    <View style={styles.container}>
      <StyledText
        variant="h7"
        fontFamily="Inter_Bold"
        color={Colors.accentLight}
        style={{ letterSpacing: 1 }}
        fontWeight={600}
      >
        vbm
      </StyledText>
      <StyledText
        variant="h7"
        fontFamily="Inter_Bold"
        color={Colors.accentLight}
        fontWeight={600}
      >
        {`v${appVersion}` + `  ` + `(${buildNumber})`}
      </StyledText>
    </View>
  );
};

export default VersionInformation;

const VersionInformationStyle = createStyleSheet(
  ({ fonts, colors, device, spacing }) => ({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.xxl,
    },
  })
);
