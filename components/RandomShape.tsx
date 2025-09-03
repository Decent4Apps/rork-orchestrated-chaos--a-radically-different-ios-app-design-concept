import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface RandomShapeProps {
  index: number;
  entropy: number;
}

export function RandomShape({ index, entropy }: RandomShapeProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000 / (1 + entropy),
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 5000 / (1 + entropy),
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, [entropy]);

  const shapes = ["square", "circle", "triangle"];
  const shape = shapes[index % 3];
  const size = 20 + Math.random() * 30;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

  const getShapeStyle = () => {
    switch (shape) {
      case "circle":
        return { borderRadius: size / 2 };
      case "triangle":
        return {
          width: 0,
          height: 0,
          borderLeftWidth: size / 2,
          borderRightWidth: size / 2,
          borderBottomWidth: size,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: color,
          backgroundColor: "transparent",
        };
      default:
        return {};
    }
  };

  return (
    <Animated.View
      style={[
        styles.shape,
        {
          width: size,
          height: size,
          backgroundColor: shape !== "triangle" ? color : "transparent",
          left: Math.random() * (width - 40 - size),
          top: Math.random() * 100,
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1 + entropy * 0.5, 1],
              }),
            },
          ],
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.3, 1, 0.3],
          }),
        },
        getShapeStyle(),
      ]}
    />
  );
}

const styles = StyleSheet.create({
  shape: {
    position: "absolute",
  },
});