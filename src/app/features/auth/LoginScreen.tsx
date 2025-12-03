import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

import { Colors, Gradients, Shadows } from "@unistyles/constants";
import { useStyles } from "react-native-unistyles";
import { loginStyle } from "@unistyles/loginStyle";
import Input from "@components/global/Input";
import Icon from "@components/global/Icon";
import StyledText from "@components/global/StylesText";

const LoginScreen: FC = () => {
  const { styles } = useStyles(loginStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const keyboard = useAnimatedKeyboard();

  // 💫 Ultra-smooth animation
  const animatedStyle = useAnimatedStyle(() => {
    // Interpolate keyboard height → smoother movement
    const translate = interpolate(
      keyboard.height.value,
      [0, 100, 450],
      [0, -30, -65] // Max movement
    );

    return {
      transform: [
        {
          translateY: withTiming(translate, {
            duration: 280,
            easing: Easing.out(Easing.cubic),
          }),
        },
      ],
    };
  });

  return (
    <LinearGradient
      colors={Gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.1, y: 0.4 }}
      style={styles.bgGradient}
    >
      <Animated.View
        style={[{ flex: 1, justifyContent: "center" }, animatedStyle]}
      >
        <View style={styles.container}>
          <View style={styles.txtContent}>
            <StyledText
              variant="h3"
              fontFamily="Mono_Regular"
              color={Colors.textMuted}
              style={Shadows.textShadow}
            >
              Let’s Trade Smarter!!
            </StyledText>
            <StyledText
              variant="h5"
              fontFamily="Inter_ExtraBold"
              color={Colors.textMuted}
              style={Shadows.textShadow}
            >
              Login to your trading account
            </StyledText>
          </View>

          <Input
            label="Email"
            placeholder="Enter your MobileNo"
            leftIcon={
              <Icon name="mailFilled" size={20} color={Colors.primary} />
            }
            textColor={Colors.primaryDark}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            textColor={Colors.primaryDark}
            secureTextEntry={secure}
            rightIcon={
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Icon
                  name={secure ? "eyeFilled" : "eyelock"}
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            }
          />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default LoginScreen;
