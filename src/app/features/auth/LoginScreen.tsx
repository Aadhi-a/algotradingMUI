import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { FC, useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  useAnimatedKeyboard,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import { Colors, Gradients, Shadows } from "@unistyles/constants";
import { useStyles } from "react-native-unistyles";
import { loginStyle } from "@unistyles/loginStyle";
import Input from "@components/global/Input";
import Icon from "@components/global/Icon";
import StyledText from "@components/global/StylesText";
import { loginUser } from "@features/toolkit/slice/authSlice";
import { AppDispatch, RootState } from "@features/toolkit/store/store";

const LoginScreen: FC = () => {
  const { styles } = useStyles(loginStyle);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [secure, setSecure] = useState(true);

  // Keyboard animation
  const keyboard = useAnimatedKeyboard();
  const animatedKeyboardStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      keyboard.height.value,
      [0, 100, 450],
      [0, -20, -65]
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

  // 🔹 One-by-one component animations
  const titleOpacity = useSharedValue(0);
  const emailOpacity = useSharedValue(0);
  const passwordOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  // 🔹 Background gradient fade
  const bgOpacity = useSharedValue(0);

  const animatedStyle = (opacity: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [
        {
          translateY: withTiming(opacity.value === 1 ? 0 : 20, {
            duration: 500,
            easing: Easing.out(Easing.cubic),
          }),
        },
      ],
    }));

  const animatedBgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(bgOpacity.value, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  useEffect(() => {
    // Fade in background
    bgOpacity.value = 1;

    // Staggered animation for components
    titleOpacity.value = withTiming(1, { duration: 400 });
    setTimeout(
      () => (emailOpacity.value = withTiming(1, { duration: 400 })),
      200
    );
    setTimeout(
      () => (passwordOpacity.value = withTiming(1, { duration: 400 })),
      400
    );
    setTimeout(
      () => (buttonOpacity.value = withTiming(1, { duration: 400 })),
      600
    );
  }, []);

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter mobile number and password");
      return;
    }

    try {
      const result = await dispatch(
        loginUser({ phonenumber: form.email, password: form.password })
      ).unwrap();
      console.log("Login success:", result);
      Alert.alert("Success", "Logged in successfully!");
    } catch (err: any) {
      console.log("Login failed:", err);
      Alert.alert("Error", err || "Login failed");
    }
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedBgStyle]}>
      <LinearGradient
        colors={Gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.1, y: 0.4 }}
        style={styles.bgGradient}
      >
        <Animated.View
          style={[{ flex: 1, justifyContent: "center" }, animatedKeyboardStyle]}
        >
          <View style={styles.container}>
            {/* Title */}
            <Animated.View style={animatedStyle(titleOpacity)}>
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
            </Animated.View>

            {/* Email Input */}
            <Animated.View style={animatedStyle(emailOpacity)}>
              <Input
                label="Mobile Number"
                placeholder="Enter your mobile number"
                leftIcon={
                  <Icon name="mailFilled" size={20} color={Colors.primary} />
                }
                textColor={Colors.primaryDark}
                keyboardType="number-pad"
                maxLength={10}
                value={form.email}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  updateForm("email", cleaned);
                }}
              />
            </Animated.View>

            {/* Password Input */}
            <Animated.View style={animatedStyle(passwordOpacity)}>
              <Input
                label="Password"
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) => updateForm("password", text)}
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
            </Animated.View>

            {/* Login Button */}
            <Animated.View style={animatedStyle(buttonOpacity)}>
              <TouchableOpacity
                onPress={handleLogin}
                style={[
                  {
                    backgroundColor: loading
                      ? Colors.primaryLight
                      : Colors.primary,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 12,
                  },
                ]}
                disabled={loading}
              >
                <StyledText color={Colors.CloudDrift} variant="h6">
                  {loading ? "Logging in..." : "Login"}
                </StyledText>
              </TouchableOpacity>
            </Animated.View>

            {/* Error Message */}
            {error && (
              <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
            )}
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

export default LoginScreen;
