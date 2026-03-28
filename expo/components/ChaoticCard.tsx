import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface ChaoticCardProps {
  title: string;
  subtitle: string;
  rotation: number;
  delay: number;
  scrollY: Animated.Value;
  index: number;
}

export function ChaoticCard({
  title,
  subtitle,
  rotation,
  delay,
  scrollY,
  index,
}: ChaoticCardProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, index % 2 === 0 ? -30 : 30],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { rotate: `${rotation}deg` },
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, index % 2 === 0 ? 20 : -20],
              }),
            },
            { translateY },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <LinearGradient
          colors={
            index % 3 === 0
              ? ["#ff006e", "#8338ec"]
              : index % 3 === 1
              ? ["#00ff88", "#00b4d8"]
              : ["#ffaa00", "#ff006e"]
          }
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.glitchOverlay} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  gradient: {
    borderRadius: 0,
    overflow: "hidden",
  },
  content: {
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#fff",
    letterSpacing: 4,
    marginTop: 5,
  },
  glitchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
});