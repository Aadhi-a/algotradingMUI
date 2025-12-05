import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  useAnimatedKeyboard,
} from "react-native-reanimated";

import { Colors, Gradients, Shadows } from "@unistyles/constants";
import { useStyles } from "react-native-unistyles";
import { loginStyle } from "@unistyles/loginStyle";
import Input from "@components/global/Input";
import Icon from "@components/global/Icon";
import StyledText from "@components/global/StylesText";
import Button from "@components/global/Button";
import Toast from "react-native-toast-message";
import { navigate } from "@utils/NavigationUtills";
import VersionInformation from "@components/pages/VersionInformation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@features/toolkit/store/store";
import { registerUser } from "@features/toolkit/slice/authSlice";

const SignupScreen: FC = () => {
  const { styles } = useStyles(loginStyle);
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // -------------------
  // Keyboard Animation
  // -------------------
  const keyboard = useAnimatedKeyboard();

  const animatedKeyboardStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      keyboard.height.value,
      [0, 150, 450],
      [0, -120, -120]
    );

    return {
      transform: [
        {
          translateY: withTiming(translateY, {
            duration: 250,
            easing: Easing.out(Easing.cubic),
          }),
        },
      ],
    };
  });

  // -------------------
  // Animation Shared Values
  // -------------------
  const bgOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const nameOpacity = useSharedValue(0);
  const emailOpacity = useSharedValue(0);
  const phoneOpacity = useSharedValue(0);
  const passOpacity = useSharedValue(0);
  const cpassOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const signOpacity = useSharedValue(0);
  // -------------------
  // Smooth Fade + Slide Animations (FIXED)
  // -------------------
  const fadeFromTop = (sv: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => {
      const opacity = sv.value;

      const translateY = interpolate(opacity, [0, 1], [-30, 0]);

      return {
        opacity,
        transform: [
          {
            translateY: withTiming(translateY, {
              duration: 450,
              easing: Easing.out(Easing.cubic),
            }),
          },
        ],
      };
    });

  const fadeFromBottom = (sv: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => {
      const opacity = sv.value;

      const translateY = interpolate(opacity, [0, 1], [60, 0]);

      return {
        opacity,
        transform: [
          {
            translateY: withTiming(translateY, {
              duration: 450,
              easing: Easing.out(Easing.cubic),
            }),
          },
        ],
      };
    });

  const animatedBgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(bgOpacity.value, { duration: 900 }),
  }));

  // -------------------
  // Stagger Animation
  // -------------------
  useEffect(() => {
    bgOpacity.value = 1;

    titleOpacity.value = withTiming(1, { duration: 400 });

    setTimeout(() => (nameOpacity.value = withTiming(1)), 200);
    setTimeout(() => (emailOpacity.value = withTiming(1)), 350);
    setTimeout(() => (phoneOpacity.value = withTiming(1)), 500);
    setTimeout(() => (passOpacity.value = withTiming(1)), 650);
    setTimeout(() => (cpassOpacity.value = withTiming(1)), 800);
    setTimeout(() => (buttonOpacity.value = withTiming(1)), 900);
    setTimeout(() => (signOpacity.value = withTiming(1)), 970);
  }, []);

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    if (!form.password || !form.confirmPassword) {
      Toast.show({
        type: "errorToast",
        text1: "Please enter password & confirm password",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      Toast.show({
        type: "errorToast",
        text1: "Passwords do not match",
      });
      return;
    }

    const payload = {
      name: form.name,
      email_id: form.email,
      phonenumber: form.phoneNumber,
      password: form.password,
      confirm_password: form.confirmPassword,
    };

    dispatch(registerUser(payload))
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "successToast",
          text1: "Signup successful",
        });
        navigate("Login", {
          phone: form.phoneNumber,
        });
      })
      .catch((err) => {
        Toast.show({
          type: "errorToast",
          text1: err,
        });
      });
  };

  const handleAccount = async () => {
    navigate("Login");
  };
  return (
    <Animated.View style={[{ flex: 1 }, animatedBgStyle]}>
      <LinearGradient
        colors={Gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.1, y: 0.4 }}
        style={styles.bgGradient}
      >
        <Animated.View style={[{ flex: 1 }, animatedKeyboardStyle]}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              {/* Title */}
              <Animated.View style={fadeFromTop(titleOpacity)}>
                <StyledText
                  variant="h3"
                  fontFamily="Mono_Regular"
                  color={Colors.textMuted}
                  style={Shadows.textShadow}
                >
                  Create Your Trading Account
                </StyledText>
              </Animated.View>

              {/* Inputs */}
              <View style={styles.inputCont}>
                <Animated.View style={fadeFromTop(nameOpacity)}>
                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    leftIcon={
                      <Icon
                        name="userFilled"
                        size={24}
                        color={Colors.primary}
                      />
                    }
                    value={form.name}
                    onChangeText={(t) => updateForm("name", t)}
                  />
                </Animated.View>

                <Animated.View style={fadeFromTop(emailOpacity)}>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon={
                      <Icon
                        name="mailFilled"
                        size={24}
                        color={Colors.primary}
                      />
                    }
                    value={form.email}
                    onChangeText={(t) => updateForm("email", t)}
                  />
                </Animated.View>

                <Animated.View style={fadeFromTop(phoneOpacity)}>
                  <Input
                    label="Phone Number"
                    placeholder="Enter your mobile number"
                    keyboardType="number-pad"
                    maxLength={10}
                    leftIcon={
                      <Icon
                        name="arrowRight"
                        size={24}
                        color={Colors.primary}
                      />
                    }
                    value={form.phoneNumber}
                    onChangeText={(t) =>
                      updateForm("phoneNumber", t.replace(/[^0-9]/g, ""))
                    }
                  />
                </Animated.View>

                <Animated.View style={fadeFromTop(passOpacity)}>
                  <Input
                    label="Password"
                    placeholder="Create password"
                    secureTextEntry={securePass}
                    value={form.password}
                    onChangeText={(t) => updateForm("password", t)}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setSecurePass(!securePass)}
                      >
                        <Icon
                          name={securePass ? "eyeFilled" : "eyelock"}
                          size={24}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    }
                  />
                </Animated.View>

                <Animated.View style={fadeFromTop(cpassOpacity)}>
                  <Input
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    secureTextEntry={secureConfirm}
                    value={form.confirmPassword}
                    onChangeText={(t) => updateForm("confirmPassword", t)}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setSecureConfirm(!secureConfirm)}
                      >
                        <Icon
                          name={secureConfirm ? "eyeFilled" : "eyelock"}
                          size={24}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    }
                  />
                </Animated.View>
              </View>

              {/* Button */}
              <Animated.View style={fadeFromBottom(buttonOpacity)}>
                <Button
                  title="Sign Up"
                  onPress={handleRegister}
                  gradientColors={Gradients.secondary}
                  loadingGradientColors={Gradients.secondary}
                  loadingIndicatorColor={Colors.CloudDrift}
                  textStyle={{ fontSize: 22 }}
                />
              </Animated.View>

              <Animated.View
                style={[styles.signUp, fadeFromBottom(signOpacity)]}
              >
                <StyledText
                  variant="h6"
                  fontFamily="Inter_Medium"
                  color={Colors.neutralDark}
                >
                  Already have an account?
                </StyledText>

                <TouchableOpacity onPress={handleAccount}>
                  <StyledText
                    variant="h6"
                    fontFamily="Inter_Medium"
                    color={Colors.primaryScale[950]}
                    fontWeight={600}
                  >
                    Log In
                  </StyledText>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ScrollView>
          <View style={styles.versionContainer}>
            <VersionInformation />
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SignupScreen;
