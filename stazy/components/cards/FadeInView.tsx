// components/FadeInView.tsx
import React, { useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { ViewStyle } from "react-native";
import { useFocusEffect } from "expo-router";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function FadeInView({ children, style }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useFocusEffect(
    useCallback(() => {
      // Reset values
      opacity.value = 0;
      translateY.value = 30;

      // Trigger animation on focus
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });

      translateY.value = withSpring(0, {
        damping: 10,
        stiffness: 100,
      });

      return () => {
        // Optional: reset on blur if needed
        opacity.value = 0;
        translateY.value = 30;
      };
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
}
