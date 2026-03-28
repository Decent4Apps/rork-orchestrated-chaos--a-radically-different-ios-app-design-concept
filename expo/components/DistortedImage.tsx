import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface DistortedImageProps {
  mode: string;
}

export function DistortedImage({ mode }: DistortedImageProps) {
  const distortAnim = useRef(new Animated.Value(0)).current;
  const skewAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(distortAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(distortAnim, {
            toValue: -1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(distortAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(skewAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(skewAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [mode]);

  const getTransform = () => {
    switch (mode) {
      case "CORRUPT":
        return [
          {
            scaleX: distortAnim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [1.2, 1, 0.8],
            }),
          },
        ];
      case "DISTORT":
        return [
          {
            rotate: distortAnim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: ["-15deg", "0deg", "15deg"],
            }),
          },
        ];
      case "FRAGMENT":
        return [
          {
            translateX: distortAnim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [-20, 0, 20],
            }),
          },
        ];
      case "DISSOLVE":
        return [
          {
            scale: distortAnim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [0.9, 1, 1.1],
            }),
          },
        ];
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: getTransform(),
          },
        ]}
      >
        <LinearGradient
          colors={["#ff006e", "#00ff88", "#8338ec"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.grid}>
            {[...Array(16)].map((_, i) => (
              <View key={i} style={styles.gridItem}>
                <Text style={styles.gridText}>{i.toString(16).toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "25%",
    height: "25%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  gridText: {
    fontSize: 24,
    fontWeight: "900",
    color: "rgba(0, 0, 0, 0.3)",
  },
});