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

function FloatingChemistryBackground() {
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
        emoji: "🧪",
        size: 48 * s,
        left: width * 0.08,
        top: height * 0.18,
        dx: orbit(float1, 14),
        dy: orbitSmall(float1, 18),
        opacity: 0.12,
      },
      {
        emoji: "⚗️",
        size: 44 * s,
        left: width * 0.78,
        top: height * 0.14,
        dx: orbitSmall(float2, 16),
        dy: orbit(float2, 22),
        opacity: 0.10,
      },
      {
        emoji: "🧫",
        size: 46 * s,
        left: width * 0.70,
        top: height * 0.46,
        dx: orbit(float3, 18),
        dy: orbitSmall(float3, 16),
        opacity: 0.10,
      },
      {
        emoji: "🔥",
        size: 42 * s,
        left: width * 0.10,
        top: height * 0.62,
        dx: orbitSmall(float4, 18),
        dy: orbit(float4, 14),
        opacity: 0.09,
      },
      {
        emoji: "🧬",
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
      {/* Chemistry tinted blobs */}
      <View style={[styles.blob, styles.chemBlobOne]} />
      <View style={[styles.blob, styles.chemBlobTwo]} />
      <View style={[styles.blob, styles.chemBlobThree]} />

      {/* Floating chemistry icons */}
      {items.map((it, idx) => (
        <Animated.Text
          key={`chem-${idx}`}
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

      {/* “Bubble” dots */}
      <View style={styles.bubbleRow}>
        <View style={[styles.bubbleDot, { opacity: 0.10, transform: [{ scale: 1.0 }] }]} />
        <View style={[styles.bubbleDot, { opacity: 0.06, marginLeft: 12, transform: [{ scale: 0.9 }] }]} />
        <View style={[styles.bubbleDot, { opacity: 0.08, marginLeft: 10, transform: [{ scale: 1.1 }] }]} />
        <View style={[styles.bubbleDot, { opacity: 0.05, marginLeft: 14, transform: [{ scale: 0.85 }] }]} />
      </View>

      <View style={[styles.bubbleRow, { top: height * 0.74, left: width * 0.62 }]}>
        <View style={[styles.bubbleDot, { opacity: 0.07, transform: [{ scale: 1.05 }] }]} />
        <View style={[styles.bubbleDot, { opacity: 0.10, marginLeft: 12, transform: [{ scale: 0.9 }] }]} />
        <View style={[styles.bubbleDot, { opacity: 0.04, marginLeft: 10, transform: [{ scale: 0.8 }] }]} />
      </View>
    </View>
  );
}

export default function ChemistryScreen({ navigation }) {
  const chemistryTopics = [
    { title: "Water Ball-and-Stick Model", modelId: "waterBallStick", hasModel: true },
    { title: "Atomic Structure & Periodic Table", modelId: "atom", hasModel: true },
    { title: "Atomic Models & Theory", modelId: "atomicModel", hasModel: true },
    { title: "F Orbital - Quantum Chemistry", modelId: "orbitalF", hasModel: true },
    { title: "Dxz Orbital - Transition Metals", modelId: "orbitalDxz", hasModel: true },
    { title: "Cyclohexane Chair Conformation", modelId: "cyclohexane", hasModel: true },
    { title: "Molecular Structure & Bonding", modelId: "molecule", hasModel: true },
    { title: "Periodic Table of Elements", modelId: "periodicTable", hasModel: true },
    { title: "Carbon Dioxide (CO₂)", modelId: "carbonDioxide", hasModel: true },
    { title: "Glucose - Carbohydrates", modelId: "glucose", hasModel: true },
    { title: "Methane (CH₄) - Alkanes", modelId: "methane", hasModel: true },
    { title: "Ethane Molecule", modelId: "ethane", hasModel: true },
    { title: "Diamond Crystal Structure", modelId: "diamond", hasModel: true },
    { title: "Water Molecule (H₂O)", modelId: "water", hasModel: true },
    { title: "Benzene - Aromatic Compounds", modelId: "benzene", hasModel: true },
    { title: "Dopamine - Neurotransmitters", modelId: "dopamine", hasModel: true },
    { title: "Phenol - Aromatic Alcohols", modelId: "phenol", hasModel: true },
    { title: "Liquid Water Structure", modelId: "liquidWater", hasModel: true },
    { title: "Sodium Chloride (NaCl)", modelId: "nacl", hasModel: true },
    { title: "Chemical Equilibrium", modelId: null, hasModel: false },
    { title: "Thermochemistry", modelId: null, hasModel: false },
    { title: "Electrochemistry", modelId: null, hasModel: false },
  ];

  const handleBackToHome = () => navigation.navigate("Home");

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("ChemistryModel", { modelId: topic.modelId });
    }
  };

  return (
    <LinearGradient
      colors={["#E8F5E9", "#F1F8E9", "#F9FBE7"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />

        {/* NEW: Chemistry themed background */}
        <FloatingChemistryBackground />

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
              <Text style={styles.iconText}>🧪</Text>
            </View>
            <Text style={styles.title}>Chemistry</Text>
            <Text style={styles.subtitle}>Mix, match & discover molecules!</Text>
          </View>

          <View style={styles.topicsSection}>
            {chemistryTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCardWrapper}
                activeOpacity={topic.hasModel ? 0.85 : 1}
                onPress={() => handleTopicPress(topic)}
              >
                <View
                  style={[
                    styles.topicCard,
                    !topic.hasModel && styles.topicCardDisabled,
                  ]}
                >
                  <LinearGradient
                    colors={
                      topic.hasModel
                        ? ["#11998E", "#38EF7D"]
                        : ["#BDBDBD", "#9E9E9E"]
                    }
                    style={styles.topicNumber}
                  >
                    <Text style={styles.topicNumberText}>{index + 1}</Text>
                  </LinearGradient>
                  <View style={styles.topicContent}>
                    <Text
                      style={[
                        styles.topicTitle,
                        !topic.hasModel && styles.topicTitleDisabled,
                      ]}
                    >
                      {topic.title}
                    </Text>
                    <Text
                      style={[
                        styles.topicSubtitle,
                        !topic.hasModel && styles.topicSubtitleDisabled,
                      ]}
                    >
                      {topic.hasModel ? "Tap to see 3D model ✨" : "Coming soon..."}
                    </Text>
                  </View>
                  {topic.hasModel && (
                    <View style={styles.goButton}>
                      <Text style={styles.goButtonText}>→</Text>
                    </View>
                  )}
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

  /* --- Chemistry themed background (NEW) --- */
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  chemBlobOne: {
    width: width * 0.80,
    height: width * 0.80,
    left: -width * 0.35,
    top: -width * 0.22,
    backgroundColor: "rgba(17, 153, 142, 0.12)",
  },
  chemBlobTwo: {
    width: width * 0.74,
    height: width * 0.74,
    right: -width * 0.32,
    top: height * 0.20,
    backgroundColor: "rgba(56, 239, 125, 0.10)",
  },
  chemBlobThree: {
    width: width * 0.88,
    height: width * 0.88,
    left: width * 0.08,
    bottom: -width * 0.48,
    backgroundColor: "rgba(249, 251, 231, 0.75)",
  },
  floatingEmoji: {
    position: "absolute",
  },
  bubbleRow: {
    position: "absolute",
    top: height * 0.33,
    left: width * 0.14,
    flexDirection: "row",
    alignItems: "center",
  },
  bubbleDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "rgba(27, 94, 32, 1)",
  },

  /* --- Original styles unchanged --- */
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
    color: "#2E7D32",
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
    backgroundColor: "rgba(17, 153, 142, 0.12)",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(17, 153, 142, 0.25)",
  },
  iconText: { fontSize: 40 },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    fontWeight: "600",
  },
  topicsSection: { gap: 12, marginBottom: 30 },
  topicCardWrapper: {
    shadowColor: "#11998E",
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
    borderColor: "rgba(17, 153, 142, 0.12)",
  },
  topicCardDisabled: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor: "rgba(0,0,0,0.06)",
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
    color: "#1B5E20",
    marginBottom: 3,
  },
  topicTitleDisabled: { color: "#9E9E9E" },
  topicSubtitle: {
    fontSize: 12,
    color: "#66BB6A",
    fontWeight: "500",
  },
  topicSubtitleDisabled: { color: "#BDBDBD" },
  goButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(17, 153, 142, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#11998E",
  },
});