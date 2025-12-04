import React, { useState } from "react";
import { Colors } from "@unistyles/constants";
import {
  View,
  Text,
  TextInputProps,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  rightIcon?: React.ReactNode;
  textColor?: string;
}

const Input: React.FC<CustomTextInputProps> = ({
  label,
  leftIcon,
  onRightIconPress,
  rightIcon,
  textColor = Colors.accentDark,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { styles } = useStyles(inputStyles);
  return (
    <View>
      {label && (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
      <View style={styles.container(isFocused)}>
        {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor={Colors.accentDark}
          {...props}
          style={styles.bg}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.iconWrapper}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const inputStyles = createStyleSheet(({ colors, fontSize, fonts, device }) => ({
  bg: {
    flex: 1,
    fontFamily: fonts.Mono_Regular,
    fontSize: 12,
  },
  label: {
    marginBottom: 10,
    fontSize: fontSize.xs,
    fontFamily: fonts.Inter_SemiBold,
    letterSpacing: 0.4,
    fontWeight: 700,
  },
  container: (isFocused: boolean = false) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: device.hp(5),
    borderColor: isFocused ? colors.primaryDark : colors.secondaryLight,
    borderWidth: 1,
    borderRadius: 10,
    borderCurve: "continuous",
    gap: 12,
    paddingHorizontal: 18,
    marginBottom: 30,
    backgroundColor: isFocused ? colors.secondaryLight : colors.neutral,
    shadowColor: "#333333",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 5,
  }),
  iconWrapper: {
    paddingHorizontal: 4,
  },
}));

export default Input;
