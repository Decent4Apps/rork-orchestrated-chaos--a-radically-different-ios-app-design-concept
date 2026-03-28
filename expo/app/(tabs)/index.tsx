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
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChaoticCard } from "@/components/ChaoticCard";
import { GlitchText } from "@/components/GlitchText";
import { FloatingParticle } from "@/components/FloatingParticle";
import { useChaoticAnimation } from "@/hooks/useChaoticAnimation";

const { width, height } = Dimensions.get("window");

export default function ChaosScreen() {
  const [colorIndex, setColorIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { pulseAnim, wobbleAnim, startChaos } = useChaoticAnimation();

  const gradientColors = [
    ["#ff006e", "#8338ec", "#3a86ff"] as const,
    ["#00ff88", "#ff0066", "#ffaa00"] as const,
    ["#7209b7", "#560bad", "#480ca8"] as const,
    ["#f72585", "#b5179e", "#7209b7"] as const,
  ] as const;

  useEffect(() => {
    startChaos();
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % gradientColors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { id: 1, title: "BREAK", subtitle: "THE RULES", rotation: -15 },
    { id: 2, title: "EMBRACE", subtitle: "DISORDER", rotation: 8 },
    { id: 3, title: "CONTROL", subtitle: "RANDOMNESS", rotation: -5 },
    { id: 4, title: "DESIGN", subtitle: "ANARCHY", rotation: 12 },
    { id: 5, title: "ORGANIZED", subtitle: "MAYHEM", rotation: -10 },
  ];

  return (
    <LinearGradient
      colors={gradientColors[colorIndex]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Header */}
          <View style={styles.header}>
            <GlitchText text="ORCHESTRATED" style={styles.mainTitle} />
            <Animated.View
              style={[
                styles.subtitleContainer,
                {
                  transform: [
                    {
                      translateX: wobbleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-10, 10],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.subtitle}>C H A O S</Text>
            </Animated.View>
          </View>

          {/* Chaotic Cards */}
          <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
              <ChaoticCard
                key={card.id}
                title={card.title}
                subtitle={card.subtitle}
                rotation={card.rotation}
                delay={index * 100}
                scrollY={scrollY}
                index={index}
              />
            ))}
          </View>

          {/* Random Text Elements */}
          <View style={styles.textChaos}>
            <Text style={[styles.floatingText, styles.text1]}>DISRUPT</Text>
            <Text style={[styles.floatingText, styles.text2]}>INNOVATE</Text>
            <Text style={[styles.floatingText, styles.text3]}>TRANSFORM</Text>
            <Text style={[styles.floatingText, styles.text4]}>EVOLVE</Text>
          </View>

          {/* Action Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity style={styles.chaosButton} activeOpacity={0.8}>
              <LinearGradient
                colors={["#ff006e", "#ffaa00"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>UNLEASH CHAOS</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -2,
  },
  subtitleContainer: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: "300",
    color: "#00ff88",
    letterSpacing: 8,
    textShadowColor: "#ff006e",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  textChaos: {
    height: 200,
    marginVertical: 40,
  },
  floatingText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    opacity: 0.3,
  },
  text1: {
    top: 20,
    left: 30,
    transform: [{ rotate: "-25deg" }],
  },
  text2: {
    top: 60,
    right: 40,
    transform: [{ rotate: "15deg" }],
  },
  text3: {
    bottom: 40,
    left: 60,
    transform: [{ rotate: "-10deg" }],
  },
  text4: {
    bottom: 20,
    right: 30,
    transform: [{ rotate: "30deg" }],
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginBottom: 100,
  },
  chaosButton: {
    overflow: "hidden",
    borderRadius: 0,
  },
  buttonGradient: {
    paddingVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 3,
  },
});