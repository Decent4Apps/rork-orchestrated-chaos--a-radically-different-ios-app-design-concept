import { Tabs } from "expo-router";
import { Zap, Shuffle, Grid3x3, Sparkles } from "lucide-react-native";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#00ff88',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '900',
          letterSpacing: 2,
          textTransform: 'uppercase',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "CHAOS",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconActive]}>
              <Zap color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="glitch"
        options={{
          title: "GLITCH",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconActive]}>
              <Shuffle color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="matrix"
        options={{
          title: "MATRIX",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconActive]}>
              <Grid3x3 color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="entropy"
        options={{
          title: "ENTROPY",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconActive]}>
              <Sparkles color={color} size={24} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    transform: [{ rotate: '0deg' }],
  },
  iconActive: {
    transform: [{ rotate: '-15deg' }],
  },
});