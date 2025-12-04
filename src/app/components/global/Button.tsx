// GradientButton.tsx
import { Colors } from "@unistyles/constants";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface GradientButtonProps {
  title: string;
  onPress?: () => Promise<void> | void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  loadingGradientColors?: string[];
  loadingIndicatorColor?: string;
  disabled?: boolean;
}

const Button: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loadingGradientColors = [Colors.primary],
  loadingIndicatorColor,
  gradientColors = ["#4c669f", "#3b5998", "#192f6a"],
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);
  const { styles } = useStyles(buttonStyles);

  const handlePress = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await onPress?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled || loading}>
      <LinearGradient
        colors={
          loading ? loadingGradientColors || gradientColors : gradientColors
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, style]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={loadingIndicatorColor || "red"}
          />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const buttonStyles = createStyleSheet(
  ({ colors, fontSize, fonts, spacing }) => ({
    button: {
      height: 50,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xxl,
    },
    text: {
      color: colors.CloudDrift,
      fontFamily: fonts.Inter_ExtraBold,
      letterSpacing: 1,
      fontSize: fontSize.xl,
      fontWeight: 700,
    },
  })
);

export default Button;
