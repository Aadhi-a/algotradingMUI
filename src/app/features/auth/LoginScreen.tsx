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
import Button from "@components/global/Button";
import { setStorage } from "@utils/mmkvStrorage";
import Toast from "react-native-toast-message";
import { navigate } from "@utils/NavigationUtills";

const LoginScreen: FC = () => {
  const { styles } = useStyles(loginStyle);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ phonenumber: "", password: "" });
  const [secure, setSecure] = useState(true);

  // -------------------------------------------
  // 🔹 Keyboard Animation
  // -------------------------------------------
  const keyboard = useAnimatedKeyboard();
  const animatedKeyboardStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      keyboard.height.value,
      [0, 200, 450],
      [0, -20, -65]
    );

    return {
      transform: [
        {
          translateY: withTiming(translate, {
            duration: 250,
            easing: Easing.out(Easing.cubic),
          }),
        },
      ],
    };
  });

  // -------------------------------------------
  // 🔹 Fade + Slide Animation Function
  // -------------------------------------------
  const fadeSlide = (sv: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      opacity: sv.value,
      transform: [
        {
          translateY: withTiming(sv.value === 1 ? 0 : 20, {
            duration: 500,
            easing: Easing.out(Easing.cubic),
          }),
        },
      ],
    }));

  // -------------------------------------------
  // 🔹 Shared Animation Values
  // -------------------------------------------
  const bgOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const phoneOpacity = useSharedValue(0);
  const passOpacity = useSharedValue(0);
  const forgetOpacity = useSharedValue(0);
  const btnOpacity = useSharedValue(0);
  const signOpacity = useSharedValue(0);

  const bgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(bgOpacity.value, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  // -------------------------------------------
  // 🔹 One-by-One Animation Trigger
  // -------------------------------------------
  useEffect(() => {
    bgOpacity.value = 1;

    setTimeout(() => (titleOpacity.value = withTiming(1)), 100);
    setTimeout(() => (phoneOpacity.value = withTiming(1)), 250);
    setTimeout(() => (passOpacity.value = withTiming(1)), 400);
    setTimeout(() => (forgetOpacity.value = withTiming(1)), 550);
    setTimeout(() => (btnOpacity.value = withTiming(1)), 700);
    setTimeout(() => (signOpacity.value = withTiming(1)), 850);
  }, []);

  // -------------------------------------------
  // 🔹 Form Handlers
  // -------------------------------------------
  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    if (!form.phonenumber || !form.password) {
      Toast.show({
        type: "errorToast",
        text1: "Please enter mobile number and password",
        position: "bottom",
      });
      return;
    }

    try {
      await new Promise((resolve: any) => setTimeout(resolve, 1000));

      const user = await dispatch(
        loginUser({
          phonenumber: form.phonenumber,
          password: form.password,
        })
      ).unwrap();

      setStorage("User", JSON.stringify(user));

      Toast.show({
        type: "successToast",
        text1: "Logged in successfully!",
        position: "top",
      });
    } catch (err: any) {
      Alert.alert("Error", err || "Login failed");
    }
  };

  const handleSignUP = async () => {
    navigate("Signup");
  };

  // -------------------------------------------
  // 🔹 UI Render
  // -------------------------------------------
  return (
    <Animated.View style={[{ flex: 1 }, bgStyle]}>
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
            <Animated.View style={fadeSlide(titleOpacity)}>
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

            {/* Inputs */}
            <Animated.View style={[styles.inputCont, fadeSlide(phoneOpacity)]}>
              {/* Mobile Number */}
              <Input
                label="Mobile Number"
                placeholder="Enter your mobile number"
                leftIcon={
                  <Icon name="mailFilled" size={24} color={Colors.primary} />
                }
                textColor={Colors.primaryDark}
                keyboardType="number-pad"
                maxLength={10}
                value={form.phonenumber}
                onChangeText={(t) =>
                  updateForm("phonenumber", t.replace(/[^0-9]/g, ""))
                }
              />

              {/* Password */}
              <Animated.View style={fadeSlide(passOpacity)}>
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChangeText={(t) => updateForm("password", t)}
                  textColor={Colors.primaryDark}
                  secureTextEntry={secure}
                  rightIcon={
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                      <Icon
                        name={secure ? "eyeFilled" : "eyelock"}
                        size={24}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  }
                />
              </Animated.View>
            </Animated.View>

            {/* Forget Password */}
            <Animated.View
              style={[styles.fogetPassword, fadeSlide(forgetOpacity)]}
            >
              <TouchableOpacity>
                <StyledText
                  variant="h6"
                  fontFamily="Mono_Regular"
                  color={Colors.primaryScale[950]}
                >
                  Forget Password ?
                </StyledText>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Button */}
            <Animated.View style={fadeSlide(btnOpacity)}>
              <Button
                title="Login"
                onPress={handleLogin}
                gradientColors={Gradients.secondary}
                loadingGradientColors={Gradients.secondary}
                loadingIndicatorColor={Colors.CloudDrift}
                textStyle={{ fontSize: 24 }}
              />
            </Animated.View>

            {/* Signup */}
            <Animated.View style={[styles.signUp, fadeSlide(signOpacity)]}>
              <StyledText
                variant="h6"
                fontFamily="Inter_Medium"
                color={Colors.neutralDark}
              >
                Don’t have a trading account ?
              </StyledText>

              <TouchableOpacity onPressIn={handleSignUP}>
                <StyledText
                  variant="h5"
                  fontFamily="Inter_Medium"
                  color={Colors.primaryScale[950]}
                  fontWeight={600}
                >
                  Sign Up
                </StyledText>
              </TouchableOpacity>
            </Animated.View>

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
