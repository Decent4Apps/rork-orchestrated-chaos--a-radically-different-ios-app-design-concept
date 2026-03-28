import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, ScanLine, Zap, RotateCcw, Square } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

export default function ChaosScanScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isScanning) {
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      );
      
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );

      scanAnimation.start();
      pulseAnimation.start();

      return () => {
        scanAnimation.stop();
        pulseAnimation.stop();
      };
    }
  }, [isScanning]);

  const triggerGlitch = () => {
    Animated.sequence([
      Animated.timing(glitchAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(glitchAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    triggerGlitch();
    
    setTimeout(() => {
      const mockResults = [
        "CHAOS_DETECTED: 0xDEADBEEF",
        "ENTROPY_LEVEL: MAXIMUM",
        "GLITCH_SIGNATURE: FOUND",
        "REALITY_STATUS: CORRUPTED",
        "MATRIX_BREACH: CONFIRMED",
      ];
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult(result);
      setIsScanning(false);
      triggerGlitch();
    }, 3000);
  };

  const toggleCameraFacing = () => {
    setFacing((current: CameraType) => (current === "back" ? "front" : "back"));
    triggerGlitch();
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanResult(null);
    triggerGlitch();
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#0a0a0a", "#1a0033", "#0a0a0a"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>INITIALIZING SCANNER...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#0a0a0a", "#1a0033", "#0a0a0a"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.permissionContainer}>
            <Camera color="#00ff88" size={64} />
            <Text style={styles.permissionTitle}>CAMERA ACCESS REQUIRED</Text>
            <Text style={styles.permissionText}>
              Grant camera permission to scan for chaos signatures
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <LinearGradient
                colors={["#00ff88", "#ff006e"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>GRANT ACCESS</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0a0a", "#1a0033", "#0a0a0a"]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>CHAOS SCANNER</Text>
          <Text style={styles.subtitle}>REALITY DISTORTION DETECTOR</Text>
        </View>

        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing}>
            <Animated.View
              style={[
                styles.overlay,
                {
                  transform: [
                    {
                      scale: glitchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.02],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                
                {isScanning && (
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        top: scanLineAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 200],
                        }),
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={["transparent", "#00ff88", "transparent"]}
                      style={styles.scanLineGradient}
                    />
                  </Animated.View>
                )}
              </View>
            </Animated.View>
          </CameraView>
        </View>

        {scanResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>SCAN RESULT:</Text>
            <Text style={styles.resultText}>{scanResult}</Text>
          </View>
        )}

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
            <LinearGradient
              colors={["#8338ec", "#3a86ff"]}
              style={styles.buttonGradient}
            >
              <RotateCcw color="#000" size={24} />
            </LinearGradient>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.scanButton,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <TouchableOpacity
              onPress={isScanning ? resetScan : startScan}
              disabled={isScanning}
            >
              <LinearGradient
                colors={isScanning ? ["#ff006e", "#ffaa00"] : ["#00ff88", "#ff006e"]}
                style={styles.scanButtonGradient}
              >
                {isScanning ? (
                  <Square color="#000" size={32} />
                ) : (
                  <ScanLine color="#000" size={32} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.controlButton} onPress={resetScan}>
            <LinearGradient
              colors={["#ffaa00", "#ff006e"]}
              style={styles.buttonGradient}
            >
              <Zap color="#000" size={24} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            {isScanning ? "SCANNING FOR ANOMALIES..." : "READY TO SCAN"}
          </Text>
        </View>
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
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#00ff88",
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff006e",
    letterSpacing: 2,
    marginTop: 5,
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 200,
    height: 200,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#00ff88",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
  },
  scanLineGradient: {
    flex: 1,
  },
  resultContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderWidth: 1,
    borderColor: "#00ff88",
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00ff88",
    letterSpacing: 1,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
    marginTop: 5,
    fontFamily: "monospace",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00ff88",
    letterSpacing: 2,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#00ff88",
    letterSpacing: 2,
    marginTop: 20,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
  },
  permissionButton: {
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 2,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});