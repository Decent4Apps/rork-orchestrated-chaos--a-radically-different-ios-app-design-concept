import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface FloatingParticleProps {
  index: number;
}

export function FloatingParticle({ index }: FloatingParticleProps) {
  const animatedX = useRef(new Animated.Value(Math.random() * width)).current;
  const animatedY = useRef(new Animated.Value(Math.random() * height)).current;
  const opacity = useRef(new Animated.Value(Math.random())).current;

  useEffect(() => {
    const duration = 10000 + index * 1000;
    
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(animatedX, {
            toValue: Math.random() * width,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedX, {
            toValue: Math.random() * width,
            duration: duration,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedY, {
            toValue: Math.random() * height,
            duration: duration * 1.5,
            useNativeDriver: true,
          }),
          Animated.timing(animatedY, {
            toValue: Math.random() * height,
            duration: duration * 1.5,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.1,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const size = 4 + index * 2;
  const colors = ["#00ff88", "#ff006e", "#ffaa00", "#8338ec"];
  const color = colors[index % colors.length];

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          backgroundColor: color,
          transform: [
            { translateX: animatedX },
            { translateY: animatedY },
          ],
          opacity,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    borderRadius: 50,
  },
});