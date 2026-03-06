import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function FloatingPhysicsBackground() {
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;
  const float4 = useRef(new Animated.Value(0)).current;
  const float5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (anim, duration, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      );

    const a1 = loop(float1, 5200, 0);
    const a2 = loop(float2, 6400, 250);
    const a3 = loop(float3, 7200, 700);
    const a4 = loop(float4, 5600, 900);
    const a5 = loop(float5, 7800, 1200);

    a1.start();
    a2.start();
    a3.start();
    a4.start();
    a5.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
      a4.stop();
      a5.stop();
    };
  }, [float1, float2, float3, float4, float5]);

  const orbit = (anim, range = 18) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-range, range],
    });

  const orbitSmall = (anim, range = 10) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [range, -range],
    });

  const items = useMemo(() => {
    const s = clamp(width / 390, 0.9, 1.2);
    return [
      {
        emoji: "🚀",
        size: 48 * s,
        left: width * 0.08,
        top: height * 0.18,
        dx: orbit(float1, 16),
        dy: orbitSmall(float1, 18),
        opacity: 0.12,
      },
      {
        emoji: "⚛️",
        size: 44 * s,
        left: width * 0.78,
        top: height * 0.14,
        dx: orbitSmall(float2, 16),
        dy: orbit(float2, 22),
        opacity: 0.10,
      },
      {
        emoji: "🔭",
        size: 46 * s,
        left: width * 0.72,
        top: height * 0.46,
        dx: orbit(float3, 18),
        dy: orbitSmall(float3, 16),
        opacity: 0.10,
      },
      {
        emoji: "🛰️",
        size: 44 * s,
        left: width * 0.10,
        top: height * 0.62,
        dx: orbitSmall(float4, 18),
        dy: orbit(float4, 14),
        opacity: 0.09,
      },
      {
        emoji: "🌌",
        size: 46 * s,
        left: width * 0.42,
        top: height * 0.10,
        dx: orbit(float5, 10),
        dy: orbitSmall(float5, 20),
        opacity: 0.08,
      },
    ];
  }, [float1, float2, float3, float4, float5]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      {/* Physics/space tinted blobs */}
      <View style={[styles.blob, styles.physicsBlobOne]} />
      <View style={[styles.blob, styles.physicsBlobTwo]} />
      <View style={[styles.blob, styles.physicsBlobThree]} />

      {/* Floating icons */}
      {items.map((it, idx) => (
        <Animated.Text
          key={`phy-${idx}`}
          style={[
            styles.floatingEmoji,
            {
              fontSize: it.size,
              left: it.left,
              top: it.top,
              opacity: it.opacity,
              transform: [{ translateX: it.dx }, { translateY: it.dy }],
            },
          ]}
        >
          {it.emoji}
        </Animated.Text>
      ))}

      {/* Star-like dots */}
      <View style={styles.starRow}>
        <View style={[styles.star, { opacity: 0.10 }]} />
        <View style={[styles.star, { opacity: 0.06, marginLeft: 12 }]} />
        <View style={[styles.star, { opacity: 0.08, marginLeft: 10 }]} />
        <View style={[styles.star, { opacity: 0.05, marginLeft: 14 }]} />
      </View>
      <View style={[styles.starRow, { top: height * 0.74, left: width * 0.62 }]}>
        <View style={[styles.star, { opacity: 0.07 }]} />
        <View style={[styles.star, { opacity: 0.10, marginLeft: 12 }]} />
        <View style={[styles.star, { opacity: 0.04, marginLeft: 10 }]} />
      </View>
    </View>
  );
}

export default function PhysicsScreen({ navigation }) {
  const physicsTopics = [
    { title: "The New Cartesian Sign Convention for Spherical Mirrors", modelId: "figure109", hasModel: true },
    { title: "Focal Ray Refraction in Lenses", modelId: "figure1014", hasModel: true },
    { title: "Electric Circuit", modelId: "figure121", hasModel: true },
    { title: "Refraction of Light", modelId: "figure1010", hasModel: true },
    { title: "Image Formation by Convex Lens for Various Object Positions", modelId: "figure1016", hasModel: true },
    { title: "Parallel Rays Through Concave Mirror", modelId: "figure103", hasModel: true },
    { title: "Focal Ray Reflection in Mirrors", modelId: "figure104", hasModel: true },
    { title: "Center of Curvature Ray Reflection", modelId: "figure105", hasModel: true },
    { title: "Oblique Ray Reflection at Mirror Pole", modelId: "figure106", hasModel: true },
    { title: "Ray Diagrams for Concave Mirror Image Formation", modelId: "figure107", hasModel: true },
    { title: "Formation of Image by a Convex Mirror", modelId: "figure108", hasModel: true },
    { title: "Newton's Cradle", modelId: "decoration", hasModel: true },
    { title: "Refraction of Light by Glass", modelId: "figure1011", hasModel: true },
    { title: "Converging and Diverging Action of Lenses", modelId: "figure1012", hasModel: true },
    { title: "Principal Axis Ray Refraction in Lenses", modelId: "figure1013", hasModel: true },
    { title: "Reflection & Refraction Prism", modelId: "prism", hasModel: true },
    { title: "Ray Through Optical Center of Lens", modelId: "figure1015", hasModel: true },
    { title: "Concave and Convex Mirror", modelId: "figure102", hasModel: true },
    { title: "Image Formation by Concave Lens", modelId: "figure1017", hasModel: true },
    { title: "Electrical Conductivity of Metals", modelId: "figure32", hasModel: true },
    { title: "The Human Eye", modelId: "figure111", hasModel: true },
    { title: "Myopia and Its Correction with Concave Lens", modelId: "figure112", hasModel: true },
    { title: "Hypermetropia and Its Correction with Convex Lens", modelId: "figure113", hasModel: true },
    { title: "Refraction of Light Through a Triangular Glass Prism", modelId: "figure114", hasModel: true },
    { title: "Dispersion of White Light by the Glass Prism", modelId: "figure115", hasModel: true },
    { title: "Recombination of the Spectrum of White Light", modelId: "figure116", hasModel: true },
    { title: "Rainbow Formation", modelId: "figure118", hasModel: true },
    { title: "Observing Scattering of Light in Colloidal Solution", modelId: "figure1111", hasModel: true },
  ];

  const handleBackToHome = () => navigation.navigate("Home");

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("PhysicsModel", { modelId: topic.modelId });
    }
  };

  return (
    <LinearGradient
      colors={["#EDE7F6", "#E8EAF6", "#E3F2FD"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />

        {/* Physics themed background */}
        <FloatingPhysicsBackground />

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🚀</Text>
            </View>
            <Text style={styles.title}>Physics</Text>
            <Text style={styles.subtitle}>Explore how the universe works!</Text>
          </View>

          <View style={styles.topicsSection}>
            {physicsTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCardWrapper}
                activeOpacity={0.85}
                onPress={() => handleTopicPress(topic)}
              >
                <View style={styles.topicCard}>
                  <LinearGradient
                    colors={["#667EEA", "#764BA2"]}
                    style={styles.topicNumber}
                  >
                    <Text style={styles.topicNumberText}>{index + 1}</Text>
                  </LinearGradient>
                  <View style={styles.topicContent}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicSubtitle}>Tap to see 3D model ✨</Text>
                  </View>
                  <View style={styles.goButton}>
                    <Text style={styles.goButtonText}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Physics themed background styles */
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  physicsBlobOne: {
    width: width * 0.80,
    height: width * 0.80,
    left: -width * 0.35,
    top: -width * 0.22,
    backgroundColor: "rgba(102,126,234,0.14)",
  },
  physicsBlobTwo: {
    width: width * 0.74,
    height: width * 0.74,
    right: -width * 0.32,
    top: height * 0.20,
    backgroundColor: "rgba(118,75,162,0.12)",
  },
  physicsBlobThree: {
    width: width * 0.88,
    height: width * 0.88,
    left: width * 0.08,
    bottom: -width * 0.48,
    backgroundColor: "rgba(227,242,253,0.60)",
  },
  floatingEmoji: {
    position: "absolute",
  },
  starRow: {
    position: "absolute",
    top: height * 0.33,
    left: width * 0.14,
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(61,44,107,1)",
  },

  /* Original styles unchanged */
  backButton: {
    position: "absolute",
    top: 58,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backButtonText: {
    color: "#4A3D6B",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 105,
    paddingBottom: 40,
  },
  headerSection: { alignItems: "center", marginBottom: 28 },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(102, 126, 234, 0.15)",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
  iconText: { fontSize: 40 },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#3D2C6B",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#7C6BA5",
    textAlign: "center",
    fontWeight: "600",
  },
  topicsSection: { gap: 12, marginBottom: 30 },
  topicCardWrapper: {
    shadowColor: "#667EEA",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  topicCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.12)",
  },
  topicNumber: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  topicNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  topicContent: { flex: 1 },
  topicTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D2051",
    marginBottom: 3,
  },
  topicSubtitle: {
    fontSize: 12,
    color: "#9B8FC2",
    fontWeight: "500",
  },
  goButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#667EEA",
  },
});