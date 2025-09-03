import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MatrixRain } from "@/components/MatrixRain";
import { GridDistortion } from "@/components/GridDistortion";

const { width, height } = Dimensions.get("window");

export default function MatrixScreen() {
  const [gridMode, setGridMode] = useState("WARP");
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const gridModes = ["WARP", "TWIST", "BEND", "SHATTER"];

  return (
    <View style={styles.container}>
      <MatrixRain />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>MATRIX</Text>
            <Text style={styles.subtitle}>DISTORTION</Text>
          </View>

          <Animated.View
            style={[
              styles.gridContainer,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <GridDistortion mode={gridMode} />
          </Animated.View>

          <View style={styles.controls}>
            {gridModes.map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => setGridMode(mode)}
                style={[
                  styles.controlButton,
                  gridMode === mode && styles.controlButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.controlText,
                    gridMode === mode && styles.controlTextActive,
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.dataStream}>
            {[...Array(5)].map((_, i) => (
              <Text key={i} style={styles.dataText}>
                {Math.random().toString(36).substring(2, 15)}
              </Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#00ff00",
    letterSpacing: 6,
    textShadowColor: "#00ff00",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    color: "#00ff00",
    letterSpacing: 10,
    opacity: 0.6,
    marginTop: 10,
  },
  gridContainer: {
    width: width - 40,
    height: width - 40,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#00ff00",
    backgroundColor: "rgba(0, 255, 0, 0.05)",
  },
  controlButtonActive: {
    backgroundColor: "rgba(0, 255, 0, 0.2)",
  },
  controlText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00ff00",
    letterSpacing: 1,
    opacity: 0.6,
  },
  controlTextActive: {
    opacity: 1,
  },
  dataStream: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  dataText: {
    fontSize: 12,
    color: "#00ff00",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginVertical: 2,
    opacity: 0.4,
  },
});