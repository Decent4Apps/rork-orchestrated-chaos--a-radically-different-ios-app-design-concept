import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");
const COLUMN_WIDTH = 20;
const columns = Math.floor(width / COLUMN_WIDTH);

interface RainDropProps {
  column: number;
  delay: number;
}

function RainDrop({ column, delay }: RainDropProps) {
  const translateY = useRef(new Animated.Value(-height)).current;
  const chars = "01アイウエオカキクケコサシスセソタチツテト";

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(translateY, {
          toValue: height,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        })
      ).start();
    }, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.drop,
        {
          left: column * COLUMN_WIDTH,
          transform: [{ translateY }],
        },
      ]}
    >
      {[...Array(20)].map((_, i) => (
        <Text key={i} style={[styles.char, { opacity: 1 - i * 0.05 }]}>
          {chars[Math.floor(Math.random() * chars.length)]}
        </Text>
      ))}
    </Animated.View>
  );
}

export function MatrixRain() {
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
    const dropArray = [];
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.5) {
        dropArray.push(i);
      }
    }
    setDrops(dropArray);
  }, []);

  return (
    <View style={styles.container}>
      {drops.map((column) => (
        <RainDrop
          key={column}
          column={column}
          delay={Math.random() * 3000}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  drop: {
    position: "absolute",
    width: COLUMN_WIDTH,
  },
  char: {
    fontSize: 16,
    color: "#00ff00",
    textAlign: "center",
    height: 20,
  },
});