import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface EntropyVisualizerProps {
  entropy: number;
}

export function EntropyVisualizer({ entropy }: EntropyVisualizerProps) {
  const bars = 20;
  const animatedValues = useRef(
    [...Array(bars)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * entropy,
            duration: 200 + index * 50,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 200 + index * 50,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [entropy]);

  return (
    <View style={styles.container}>
      {animatedValues.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [
                {
                  scaleY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1],
                  }),
                },
              ],
              backgroundColor: `hsl(${280 + index * 10}, 100%, 50%)`,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  bar: {
    width: (width - 40) / 20 - 2,
    height: "100%",
  },
});