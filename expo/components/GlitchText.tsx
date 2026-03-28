import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

interface GlitchTextProps {
  text: string;
  style?: any;
}

export function GlitchText({ text, style }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        if (Math.random() > 0.7) {
          newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          newText += text[i];
        }
      }
      setGlitchedText(newText);

      setTimeout(() => {
        setGlitchedText(text);
        setIsGlitching(false);
      }, 100);
    }, 2000);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <View style={styles.container}>
      <Text style={[style, isGlitching && styles.glitching]}>
        {glitchedText}
      </Text>
      {isGlitching && (
        <>
          <Text style={[style, styles.glitchLayer1]}>{text}</Text>
          <Text style={[style, styles.glitchLayer2]}>{text}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  glitching: {
    opacity: 0.8,
  },
  glitchLayer1: {
    position: "absolute",
    top: 2,
    left: 2,
    color: "#00ff88",
    opacity: 0.5,
  },
  glitchLayer2: {
    position: "absolute",
    top: -2,
    left: -2,
    color: "#ff006e",
    opacity: 0.5,
  },
});