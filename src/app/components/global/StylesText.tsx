// Typography.tsx
import { Fonts, FontSizes } from "@unistyles/constants";
import React, { FC } from "react";
import { Text, TextStyle } from "react-native";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7";

interface TypographyProps {
  variant?: Variant;
  fontFamily?: keyof typeof Fonts;
  fontSize?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: any) => void;
}

const VariantFontSizeMap: Record<Variant, number> = {
  h1: FontSizes.huge,
  h2: FontSizes.xxl,
  h3: FontSizes.xl,
  h4: FontSizes.lg,
  h5: FontSizes.md,
  h6: FontSizes.sm,
  h7: FontSizes.xs,
};

const StyledText: FC<TypographyProps> = ({
  variant = "h7",
  fontFamily = "Inter_Bold",
  fontSize,
  style,
  color,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  const computedFontSize = fontSize || VariantFontSizeMap[variant];

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        { fontSize: computedFontSize, color },
        { fontFamily: Fonts[fontFamily] },
        style,
      ]}
      onLayout={onLayout}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
