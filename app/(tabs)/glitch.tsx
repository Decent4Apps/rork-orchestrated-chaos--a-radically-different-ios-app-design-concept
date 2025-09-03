import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlitchEffect } from "@/components/GlitchEffect";
import { DistortedImage } from "@/components/DistortedImage";

const { width } = Dimensions.get("window");

export default function GlitchScreen() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState(0);

  const modes = ["CORRUPT", "DISTORT", "FRAGMENT", "DISSOLVE"];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0a0a", "#1a0033", "#0a0a0a"]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <GlitchEffect active={glitchActive}>
              <Text style={styles.title}>DIGITAL</Text>
              <Text style={styles.titleAccent}>DISTORTION</Text>
            </GlitchEffect>
          </View>

          <View style={styles.modeSelector}>
            {modes.map((mode, index) => (
              <TouchableOpacity
                key={mode}
                onPress={() => setSelectedMode(index)}
                style={[
                  styles.modeButton,
                  selectedMode === index && styles.modeButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.modeText,
                    selectedMode === index && styles.modeTextActive,
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.glitchContainer}>
            <DistortedImage mode={modes[selectedMode]} />
          </View>

          <View style={styles.dataCorruption}>
            <Text style={styles.corruptedText}>
              01001000 01100101 01101100 01101100 01101111
            </Text>
            <Text style={styles.corruptedText}>
              ▓▓▓░░░▓▓▓░░░▓▓▓
            </Text>
            <Text style={styles.corruptedText}>
              ERROR_CODE: 0xDEADBEEF
            </Text>
          </View>

          <TouchableOpacity
            style={styles.glitchButton}
            onPress={() => setGlitchActive(!glitchActive)}
          >
            <LinearGradient
              colors={glitchActive ? ["#ff0066", "#00ff88"] : ["#333", "#555"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {glitchActive ? "STABILIZE" : "CORRUPT"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#00ff88",
    letterSpacing: 4,
  },
  titleAccent: {
    fontSize: 32,
    fontWeight: "300",
    color: "#ff0066",
    letterSpacing: 8,
    marginTop: 5,
  },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  modeButtonActive: {
    borderColor: "#00ff88",
    backgroundColor: "rgba(0, 255, 136, 0.1)",
  },
  modeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 1,
  },
  modeTextActive: {
    color: "#00ff88",
  },
  glitchContainer: {
    height: 300,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  dataCorruption: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  corruptedText: {
    fontSize: 14,
    color: "#00ff88",
    fontFamily: "monospace",
    marginVertical: 5,
    opacity: 0.6,
  },
  glitchButton: {
    marginHorizontal: 40,
    marginBottom: 40,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 2,
  },
});