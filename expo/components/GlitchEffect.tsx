import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface GlitchEffectProps {
  children: ReactNode;
  active: boolean;
}

export function GlitchEffect({ children, active }: GlitchEffectProps) {
  if (!active) {
    return <View>{children}</View>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.layer, styles.layer1]}>{children}</View>
      <View style={[styles.layer, styles.layer2]}>{children}</View>
      <View style={[styles.layer, styles.layer3]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  layer: {
    position: "absolute",
  },
  layer1: {
    top: 1,
    left: 1,
    opacity: 0.7,
  },
  layer2: {
    top: -1,
    left: -1,
    opacity: 0.5,
  },
  layer3: {
    top: 0,
    left: 0,
    opacity: 1,
  },
});