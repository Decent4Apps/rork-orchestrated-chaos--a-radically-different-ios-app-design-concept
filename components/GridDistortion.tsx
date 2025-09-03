import React from "react";
import { View, StyleSheet } from "react-native";

interface GridDistortionProps {
  mode: string;
}

export function GridDistortion({ mode }: GridDistortionProps) {
  const getGridStyle = (index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    
    switch (mode) {
      case "WARP":
        return {
          transform: [
            { rotate: `${(row - col) * 5}deg` },
            { scale: 1 + (row + col) * 0.05 },
          ],
        };
      case "TWIST":
        return {
          transform: [
            { rotate: `${index * 10}deg` },
            { translateX: Math.sin(index) * 10 },
            { translateY: Math.cos(index) * 10 },
          ],
        };
      case "BEND":
        return {
          transform: [
            { skewX: `${row * 5}deg` },
            { skewY: `${col * 5}deg` },
          ],
        };
      case "SHATTER":
        return {
          transform: [
            { translateX: (Math.random() - 0.5) * 20 },
            { translateY: (Math.random() - 0.5) * 20 },
            { rotate: `${(Math.random() - 0.5) * 30}deg` },
          ],
        };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(16)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.gridItem,
            getGridStyle(i),
            {
              backgroundColor: `rgba(0, 255, 0, ${0.1 + (i % 4) * 0.2})`,
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
    flexWrap: "wrap",
  },
  gridItem: {
    width: "25%",
    height: "25%",
    borderWidth: 1,
    borderColor: "#00ff00",
  },
});