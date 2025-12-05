// ---------------- LOGIN SCREEN -------------------

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
import VersionInformation from "@components/pages/VersionInformation";
import { useNavigation, useRoute } from "@react-navigation/native";

const LoginScreen: FC = () => {
  const { styles } = useStyles(loginStyle);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [secure, setSecure] = useState(true);

  // ------------------ ROUTE PARAM ------------------
  const route = useRoute<any>();
  const passedPhone = route.params?.phone ?? ""; // param from Signup

  // ------------------ FORM -------------------------
  const [form, setForm] = useState({
    phonenumber: "", // use same key everywhere
    password: "",
  });

  // ------------------ KEYBOARD ANIMATION ----------
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

  // ------------------ SHARED VALUES ----------------
  const bgOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const phoneOpacity = useSharedValue(0);
  const passOpacity = useSharedValue(0);
  const forgetOpacity = useSharedValue(0);
  const btnOpacity = useSharedValue(0);
  const signOpacity = useSharedValue(0);

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

  const bgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(bgOpacity.value, { duration: 800 }),
  }));

  // ------------------ PARAM AUTO FILL FIXED --------
  useEffect(() => {
    if (passedPhone) {
      setForm((prev) => ({
        ...prev,
        phonenumber: passedPhone, // ✅ FIXED
      }));
    }

    bgOpacity.value = 1;

    setTimeout(() => (titleOpacity.value = withTiming(1)), 100);
    setTimeout(() => (phoneOpacity.value = withTiming(1)), 250);
    setTimeout(() => (passOpacity.value = withTiming(1)), 400);
    setTimeout(() => (forgetOpacity.value = withTiming(1)), 550);
    setTimeout(() => (btnOpacity.value = withTiming(1)), 700);
    setTimeout(() => (signOpacity.value = withTiming(1)), 850);
  }, [passedPhone]);

  // ------------------ UPDATE FORM ------------------
  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ------------------ LOGIN FUNCTION ----------------
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

  const handleSignUP = () => navigate("Signup");

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
                >
                  Let’s Trade Smarter!!
                </StyledText>

                <StyledText
                  variant="h5"
                  fontFamily="Inter_ExtraBold"
                  color={Colors.textMuted}
                >
                  Login to your trading account
                </StyledText>
              </View>
            </Animated.View>

            {/* Input Fields */}
            <Animated.View style={[styles.inputCont, fadeSlide(phoneOpacity)]}>
              <Input
                label="Mobile Number"
                placeholder="Enter your mobile number"
                keyboardType="number-pad"
                leftIcon={
                  <Icon name="mailFilled" size={24} color={Colors.primary} />
                }
                maxLength={10}
                value={form.phonenumber}
                onChangeText={(t) =>
                  updateForm("phonenumber", t.replace(/[^0-9]/g, ""))
                }
              />

              <Animated.View style={fadeSlide(passOpacity)}>
                <Input
                  label="Password"
                  placeholder="Enter password"
                  secureTextEntry={secure}
                  value={form.password}
                  onChangeText={(t) => updateForm("password", t)}
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
                  variant="h7"
                  fontFamily="Mono_Regular"
                  color={Colors.primaryScale[950]}
                >
                  Forget Password ?
                </StyledText>
              </TouchableOpacity>
            </Animated.View>

            {/* Button */}
            <Animated.View style={fadeSlide(btnOpacity)}>
              <Button
                title="Login"
                onPress={handleLogin}
                gradientColors={Gradients.secondary}
              />
            </Animated.View>

            <Animated.View style={[styles.signUp, fadeSlide(signOpacity)]}>
              <StyledText variant="h6" color={Colors.neutralDark}>
                Don’t have a trading account ?
              </StyledText>

              <TouchableOpacity onPress={handleSignUP}>
                <StyledText
                  variant="h6"
                  color={Colors.primaryScale[950]}
                  fontWeight={600}
                >
                  Sign Up
                </StyledText>
              </TouchableOpacity>
            </Animated.View>

            {error && <Text style={{ color: "red" }}>{error}</Text>}
          </View>
        </Animated.View>

        <View style={styles.versionContainer}>
          <VersionInformation />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default LoginScreen;
