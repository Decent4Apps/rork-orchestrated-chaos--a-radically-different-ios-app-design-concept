import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { EntropyVisualizer } from "@/components/EntropyVisualizer";
import { RandomShape } from "@/components/RandomShape";

const { width } = Dimensions.get("window");

export default function EntropyScreen() {
  const [entropy, setEntropy] = useState(0.5);
  const [shapes, setShapes] = useState<number[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev => [...prev.slice(-10), Date.now()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const increaseEntropy = () => {
    setEntropy(prev => Math.min(1, prev + 0.1));
  };

  const decreaseEntropy = () => {
    setEntropy(prev => Math.max(0, prev - 0.1));
  };

  return (
    <LinearGradient
      colors={["#0a0a0a", "#2d1b69", "#0a0a0a"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <Text style={styles.title}>ENTROPY</Text>
            <Text style={styles.value}>{(entropy * 100).toFixed(0)}%</Text>
          </Animated.View>

          <View style={styles.visualizer}>
            <EntropyVisualizer entropy={entropy} />
          </View>

          <View style={styles.shapesContainer}>
            {shapes.map((id, index) => (
              <RandomShape key={id} index={index} entropy={entropy} />
            ))}
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={decreaseEntropy}
            >
              <Text style={styles.controlText}>ORDER</Text>
            </TouchableOpacity>
            
            <View style={styles.entropyBar}>
              <View
                style={[
                  styles.entropyFill,
                  { width: `${entropy * 100}%` },
                ]}
              />
            </View>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={increaseEntropy}
            >
              <Text style={styles.controlText}>CHAOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoText}>
              SYSTEM ENTROPY: {entropy > 0.7 ? "CRITICAL" : entropy > 0.4 ? "MODERATE" : "STABLE"}
            </Text>
            <Text style={styles.infoSubtext}>
              Disorder Level: {Math.floor(entropy * 1000)} units
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ff00ff",
    letterSpacing: 6,
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  value: {
    fontSize: 64,
    fontWeight: "200",
    color: "#00ffff",
    marginTop: 10,
  },
  visualizer: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  shapesContainer: {
    height: 150,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  controlButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  controlText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#ff00ff",
    letterSpacing: 2,
  },
  entropyBar: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 20,
  },
  entropyFill: {
    height: "100%",
    backgroundColor: "#00ffff",
  },
  info: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff00ff",
    letterSpacing: 1,
  },
  infoSubtext: {
    fontSize: 12,
    color: "#00ffff",
    marginTop: 5,
    opacity: 0.7,
  },
});