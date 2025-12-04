import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "@utils/NavigationUtills";
import SplashScreen from "@features/SplashScreen";
import LoginScreen from "@features/auth/LoginScreen";
import SignupScreen from "@features/auth/SignupScreen";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            animation: "scale_from_center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
