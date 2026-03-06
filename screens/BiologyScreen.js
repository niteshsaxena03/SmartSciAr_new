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

function FloatingBiologyBackground() {
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
        emoji: "🧬",
        size: 48 * s,
        left: width * 0.08,
        top: height * 0.18,
        dx: orbit(float1, 14),
        dy: orbitSmall(float1, 18),
        opacity: 0.12,
      },
      {
        emoji: "🦠",
        size: 44 * s,
        left: width * 0.78,
        top: height * 0.14,
        dx: orbitSmall(float2, 16),
        dy: orbit(float2, 22),
        opacity: 0.10,
      },
      {
        emoji: "🌿",
        size: 46 * s,
        left: width * 0.70,
        top: height * 0.46,
        dx: orbit(float3, 18),
        dy: orbitSmall(float3, 16),
        opacity: 0.10,
      },
      {
        emoji: "🔬",
        size: 44 * s,
        left: width * 0.10,
        top: height * 0.62,
        dx: orbitSmall(float4, 18),
        dy: orbit(float4, 14),
        opacity: 0.09,
      },
      {
        emoji: "🫀",
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
      {/* Biology tinted blobs */}
      <View style={[styles.blob, styles.bioBlobOne]} />
      <View style={[styles.blob, styles.bioBlobTwo]} />
      <View style={[styles.blob, styles.bioBlobThree]} />

      {/* Floating biology icons */}
      {items.map((it, idx) => (
        <Animated.Text
          key={`bio-${idx}`}
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

      {/* “Cell dots” */}
      <View style={styles.cellRow}>
        <View style={[styles.cellDot, { opacity: 0.10 }]} />
        <View style={[styles.cellDot, { opacity: 0.06, marginLeft: 12 }]} />
        <View style={[styles.cellDot, { opacity: 0.08, marginLeft: 10 }]} />
        <View style={[styles.cellDot, { opacity: 0.05, marginLeft: 14 }]} />
      </View>
      <View
        style={[styles.cellRow, { top: height * 0.74, left: width * 0.62 }]}
      >
        <View style={[styles.cellDot, { opacity: 0.07 }]} />
        <View style={[styles.cellDot, { opacity: 0.10, marginLeft: 12 }]} />
        <View style={[styles.cellDot, { opacity: 0.04, marginLeft: 10 }]} />
      </View>
    </View>
  );
}

export default function BiologyScreen({ navigation }) {
  const biologyTopics = [
    { title: "Neuron Structure", modelId: "neuron", hasModel: true },
    { title: "Animal Cell Structure", modelId: "animalCell", hasModel: true },
    { title: "Human Brain Structure", modelId: "humanBrain", hasModel: true },
    { title: "Heart and Lungs", modelId: "heartLungs", hasModel: true },
    { title: "Digestive System", modelId: "digestiveSystem", hasModel: true },
    { title: "Cell Model - Basic Structure", modelId: "cellModel", hasModel: true },
    { title: "Plant Cell Structure", modelId: "plantCell", hasModel: true },
    { title: "Human Cell", modelId: "humanCell", hasModel: true },
    { title: "Prokaryotic Cell", modelId: "prokaryoteCell", hasModel: true },
    { title: "DNA & RNA Structure", modelId: "dnaRna", hasModel: true },
    { title: "Human Heart", modelId: "humanHeart", hasModel: true },
    { title: "Human Eye Structure", modelId: "humanEye", hasModel: true },
    { title: "Human Skull", modelId: "humanSkull", hasModel: true },
    { title: "Human Skeleton", modelId: "skeleton", hasModel: true },
    { title: "Excretory System", modelId: "excretorySystem", hasModel: true },
    { title: "Coronavirus (COVID-19)", modelId: "coronavirus", hasModel: true },
    { title: "Female Muscular System", modelId: "femaleMuscular", hasModel: true },
    { title: "Cervical Vertebra", modelId: "cervicalVertebra", hasModel: true },
    { title: "Python Skull", modelId: "pythonSkull", hasModel: true },
  ];

  const handleBackToHome = () => navigation.navigate("Home");

  const handleTopicPress = (topic) => {
    if (topic.hasModel) {
      navigation.navigate("BiologyModel", { modelId: topic.modelId });
    }
  };

  return (
    <LinearGradient
      colors={["#FCE4EC", "#FFF3E0", "#FFF8E1"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />

        {/* NEW: Biology themed background */}
        <FloatingBiologyBackground />

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
              <Text style={styles.iconText}>🧬</Text>
            </View>
            <Text style={styles.title}>Biology</Text>
            <Text style={styles.subtitle}>Discover the secrets of life!</Text>
          </View>

          <View style={styles.topicsSection}>
            {biologyTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCardWrapper}
                activeOpacity={0.85}
                onPress={() => handleTopicPress(topic)}
              >
                <View style={styles.topicCard}>
                  <LinearGradient
                    colors={["#F857A6", "#FF5858"]}
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
  container: {
    flex: 1,
  },

  /* --- Biology themed background (NEW) --- */
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  bioBlobOne: {
    width: width * 0.80,
    height: width * 0.80,
    left: -width * 0.35,
    top: -width * 0.22,
    backgroundColor: "rgba(248, 87, 166, 0.12)",
  },
  bioBlobTwo: {
    width: width * 0.74,
    height: width * 0.74,
    right: -width * 0.32,
    top: height * 0.20,
    backgroundColor: "rgba(255, 88, 88, 0.10)",
  },
  bioBlobThree: {
    width: width * 0.88,
    height: width * 0.88,
    left: width * 0.08,
    bottom: -width * 0.48,
    backgroundColor: "rgba(255, 243, 224, 0.70)",
  },
  floatingEmoji: {
    position: "absolute",
  },
  cellRow: {
    position: "absolute",
    top: height * 0.33,
    left: width * 0.14,
    flexDirection: "row",
    alignItems: "center",
  },
  cellDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(136, 14, 79, 1)",
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
    color: "#AD1457",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 105,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(248, 87, 166, 0.12)",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(248, 87, 166, 0.25)",
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#880E4F",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#E91E63",
    textAlign: "center",
    fontWeight: "600",
  },
  topicsSection: {
    gap: 12,
    marginBottom: 30,
  },
  topicCardWrapper: {
    shadowColor: "#F857A6",
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
    borderColor: "rgba(248, 87, 166, 0.12)",
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
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#880E4F",
    marginBottom: 3,
  },
  topicSubtitle: {
    fontSize: 12,
    color: "#F06292",
    fontWeight: "500",
  },
  goButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(248, 87, 166, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F857A6",
  },
});