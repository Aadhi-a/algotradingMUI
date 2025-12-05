import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  withSpring,
} from "react-native-reanimated";
import Icon from "./global/Icon";

const HEADER_MAX = 150;
const HEADER_MIN = 70;

export default function ScaleRotateHeader() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // Header height shrink
  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, HEADER_MAX - HEADER_MIN],
      [HEADER_MAX, HEADER_MIN],
      Extrapolate.CLAMP
    ),
  }));

  // Title scale + rotation
  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, 100],
          [1, 0.8],
          Extrapolate.CLAMP
        ),
      },
      {
        rotate: `${interpolate(
          scrollY.value,
          [0, 100],
          [0, 10],
          Extrapolate.CLAMP
        )}deg`,
      },
    ],
  }));

  // Icon scale + rotate (opposite)
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, 100],
          [1, 1.3],
          Extrapolate.CLAMP
        ),
      },
      {
        rotate: `${interpolate(
          scrollY.value,
          [0, 100],
          [0, -15],
          Extrapolate.CLAMP
        )}deg`,
      },
    ],
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Text style={[styles.title, titleStyle]}>
          Dashboard
        </Animated.Text>

        <Animated.View style={[iconStyle]}>
          <TouchableOpacity>
            <Icon name="chatsFilled" size={28} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* CONTENT */}
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_MAX }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.rowText}>Item {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 100,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  rowText: {
    fontSize: 18,
  },
});
