import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Play, Pause, RotateCcw, Zap } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export default function ChaosGameScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [playerPosition, setPlayerPosition] = useState({ x: width / 2, y: height - 200 });
  const animationRef = useRef<number | null>(null);
  const playerAnim = useRef(new Animated.ValueXY({ x: width / 2, y: height - 200 })).current;
  const glitchAnim = useRef(new Animated.Value(0)).current;

  const colors = ["#ff006e", "#00ff88", "#ffaa00", "#8338ec", "#3a86ff"];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newX = Math.max(25, Math.min(width - 25, gestureState.moveX));
      const newY = Math.max(100, Math.min(height - 150, gestureState.moveY));
      setPlayerPosition({ x: newX, y: newY });
      playerAnim.setValue({ x: newX, y: newY });
    },
  });

  const createBall = (): Ball => ({
    id: Date.now() + Math.random(),
    x: Math.random() * (width - 40) + 20,
    y: -20,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 20 + 15,
  });

  const updateGame = () => {
    setBalls(prevBalls => {
      const updatedBalls = prevBalls
        .map(ball => ({
          ...ball,
          x: ball.x + ball.vx,
          y: ball.y + ball.vy,
          vx: ball.vx + (Math.random() - 0.5) * 0.1,
        }))
        .filter(ball => ball.y < height + 50);

      updatedBalls.forEach(ball => {
        const distance = Math.sqrt(
          Math.pow(ball.x - playerPosition.x, 2) + Math.pow(ball.y - playerPosition.y, 2)
        );
        if (distance < ball.size + 25) {
          setScore(prev => prev + 10);
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
        }
      });

      if (Math.random() < 0.03) {
        updatedBalls.push(createBall());
      }

      return updatedBalls;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      const gameLoop = () => {
        updateGame();
        animationRef.current = requestAnimationFrame(gameLoop);
      };
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, playerPosition]);

  const startGame = () => {
    setIsPlaying(true);
    setBalls([createBall(), createBall()]);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setScore(0);
    setBalls([]);
    setPlayerPosition({ x: width / 2, y: height - 200 });
    playerAnim.setValue({ x: width / 2, y: height - 200 });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0a0a", "#1a0033", "#330a1a", "#0a0a0a"]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>CHAOS CATCHER</Text>
          <Text style={styles.score}>SCORE: {score.toString().padStart(6, '0')}</Text>
        </View>

        <View style={styles.gameArea} {...panResponder.panHandlers}>
          {balls.map(ball => (
            <Animated.View
              key={ball.id}
              style={[
                styles.ball,
                {
                  left: ball.x - ball.size / 2,
                  top: ball.y - ball.size / 2,
                  width: ball.size,
                  height: ball.size,
                  backgroundColor: ball.color,
                  transform: [
                    {
                      scale: glitchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}

          <Animated.View
            style={[
              styles.player,
              {
                left: playerPosition.x - 25,
                top: playerPosition.y - 25,
                transform: [
                  {
                    rotate: glitchAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#00ff88", "#ff006e"]}
              style={styles.playerGradient}
            >
              <Zap color="#000" size={20} />
            </LinearGradient>
          </Animated.View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={isPlaying ? pauseGame : startGame}
          >
            <LinearGradient
              colors={isPlaying ? ["#ff006e", "#8338ec"] : ["#00ff88", "#3a86ff"]}
              style={styles.buttonGradient}
            >
              {isPlaying ? <Pause color="#000" size={24} /> : <Play color="#000" size={24} />}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={resetGame}>
            <LinearGradient
              colors={["#ffaa00", "#ff006e"]}
              style={styles.buttonGradient}
            >
              <RotateCcw color="#000" size={24} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>DRAG TO MOVE • CATCH THE CHAOS</Text>
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
  score: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff006e",
    letterSpacing: 2,
    marginTop: 5,
    fontFamily: "monospace",
  },
  gameArea: {
    flex: 1,
    position: "relative",
  },
  ball: {
    position: "absolute",
    borderRadius: 50,
    shadowColor: "#00ff88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  player: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playerGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  buttonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 1,
  },
});