// toastConfig.ts
import Icon from "@components/global/Icon";
import StyledText from "@components/global/StylesText";
import { Colors, Fonts } from "@unistyles/constants";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", backgroundColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 14,
        color: "gray",
      }}
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "red", marginVertical: 100 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: "red",
      }}
      text2Style={{
        fontSize: 13,
        color: Colors.secondary,
      }}
      text2NumberOfLines={0}
    />
  ),

  successToast: ({ text1, text2, props }: any) => (
    <View
      style={{
        paddingVertical: 50,
        width: "80%",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          height: "auto",
          width: "auto",
          backgroundColor: Colors.successLight,
          borderRadius: 10,
          padding: 10,
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
          borderLeftColor: Colors.success,
          borderLeftWidth: 5,
        }}
      >
        {/* <Icon name="arrowLeft" size={30} color="red" /> */}
        <StyledText variant="h6" fontFamily="Mono_Regular">
          {text1}
        </StyledText>
      </View>
    </View>
  ),
  errorToast: ({ text1, text2, props }: any) => (
    <View
      style={{
        paddingVertical: 50,
        width: "80%",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          height: "auto",
          width: "auto",
          backgroundColor: Colors.errorLight,
          borderRadius: 10,
          padding: 10,
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
          borderLeftColor: Colors.error,
          borderLeftWidth: 5,
        }}
      >
        {/* <Icon name="arrowLeft" size={30} color="red" /> */}
        <StyledText variant="h6" fontFamily="Mono_Regular">
          {text1}
        </StyledText>
      </View>
    </View>
  ),

  warningToast: ({ text1, text2, props }: any) => (
    <View
      style={{
        paddingVertical: 50,
        width: "80%",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          height: "auto",
          width: "auto",
          backgroundColor: Colors.warningLight,
          borderRadius: 10,
          padding: 10,
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
          borderLeftColor: Colors.warning,
          borderLeftWidth: 5,
        }}
      >
        {/* <Icon name="arrowLeft" size={30} color="red" /> */}
        <StyledText variant="h6" fontFamily="Mono_Regular">
          {text1}
        </StyledText>
      </View>
    </View>
  ),
};
