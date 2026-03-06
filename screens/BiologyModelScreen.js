import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import ModelViewer from "../components/ModelViewer";
import ARModelViewer from "../components/ARModelViewer";
import { getModelById } from "../data/biologyData";

const { width, height } = Dimensions.get("window");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** Same floating background as BiologyScreen */
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
          Animated.timing(anim, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
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
    anim.interpolate({ inputRange: [0, 1], outputRange: [-range, range] });

  const orbitSmall = (anim, range = 10) =>
    anim.interpolate({ inputRange: [0, 1], outputRange: [range, -range] });

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
        left: width * 0.7,
        top: height * 0.46,
        dx: orbit(float3, 18),
        dy: orbitSmall(float3, 16),
        opacity: 0.10,
      },
      {
        emoji: "🔬",
        size: 44 * s,
        left: width * 0.1,
        top: height * 0.62,
        dx: orbitSmall(float4, 18),
        dy: orbit(float4, 14),
        opacity: 0.09,
      },
      {
        emoji: "🫀",
        size: 46 * s,
        left: width * 0.42,
        top: height * 0.1,
        dx: orbit(float5, 10),
        dy: orbitSmall(float5, 20),
        opacity: 0.08,
      },
    ];
  }, [float1, float2, float3, float4, float5]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      <View style={[styles.blob, styles.bioBlobOne]} />
      <View style={[styles.blob, styles.bioBlobTwo]} />
      <View style={[styles.blob, styles.bioBlobThree]} />

      {items.map((it, idx) => (
        <Animated.Text
          key={`bio-bg-${idx}`}
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

      <View style={styles.cellRow}>
        <View style={[styles.cellDot, { opacity: 0.10 }]} />
        <View style={[styles.cellDot, { opacity: 0.06, marginLeft: 12 }]} />
        <View style={[styles.cellDot, { opacity: 0.08, marginLeft: 10 }]} />
        <View style={[styles.cellDot, { opacity: 0.05, marginLeft: 14 }]} />
      </View>
      <View style={[styles.cellRow, { top: height * 0.74, left: width * 0.62 }]}>
        <View style={[styles.cellDot, { opacity: 0.07 }]} />
        <View style={[styles.cellDot, { opacity: 0.10, marginLeft: 12 }]} />
        <View style={[styles.cellDot, { opacity: 0.04, marginLeft: 10 }]} />
      </View>
    </View>
  );
}

export default function BiologyModelScreen({ route, navigation }) {
  const { modelId } = route.params;
  const modelData = getModelById(modelId);
  const [isARMode, setIsARMode] = useState(false);

  const hasARSupport = true;

  const handleBack = () => navigation.goBack();

  if (!modelData) {
    return (
      <LinearGradient colors={["#FCE4EC", "#FFF3E0", "#FFF8E1"]} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" />
          <FloatingBiologyBackground />

          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={styles.errorCardWrapper}>
            <View style={styles.errorCard}>
              <View style={styles.errorIcon}>
                <Text style={{ fontSize: 26 }}>⚠️</Text>
              </View>
              <Text style={styles.errorTitle}>Model not found</Text>
              <Text style={styles.errorText}>Please go back and select another topic.</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#FCE4EC", "#FFF3E0", "#FFF8E1"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <FloatingBiologyBackground />

        {/* Back Button (Top Left)
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity> */}

        {/* AR Toggle (Top Right) */}
        {hasARSupport && (
          <TouchableOpacity
            style={styles.arToggleButton}
            onPress={() => setIsARMode((v) => !v)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={
                isARMode
                  ? ["#F857A6", "#FF5858"]
                  : ["rgba(248, 87, 166, 0.18)", "rgba(255, 88, 88, 0.18)"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.arToggleGradient}
            >
              <Text style={styles.arToggleText}>{isARMode ? "📱 3D View" : "🥽 AR Mode"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Viewer */}
        {isARMode ? (
          <ARModelViewer modelData={modelData} navigation={navigation} />
        ) : (
          <ModelViewer modelData={modelData} navigation={navigation} subject="biology" />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Same BiologyScreen background */
  blob: { position: "absolute", borderRadius: 999 },
  bioBlobOne: {
    width: width * 0.8,
    height: width * 0.8,
    left: -width * 0.35,
    top: -width * 0.22,
    backgroundColor: "rgba(248, 87, 166, 0.12)",
  },
  bioBlobTwo: {
    width: width * 0.74,
    height: width * 0.74,
    right: -width * 0.32,
    top: height * 0.2,
    backgroundColor: "rgba(255, 88, 88, 0.10)",
  },
  bioBlobThree: {
    width: width * 0.88,
    height: width * 0.88,
    left: width * 0.08,
    bottom: -width * 0.48,
    backgroundColor: "rgba(255, 243, 224, 0.70)",
  },
  floatingEmoji: { position: "absolute" },
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

  /* Back Button (match BiologyScreen) */
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
    zIndex: 100,
  },
  backButtonText: {
    color: "#AD1457",
    fontSize: 24,
    fontWeight: "bold",
  },

  /* AR Toggle — same “card-ish” + biology gradient */
  arToggleButton: {
    position: "absolute",
    top: 58,
    right: 20,
    zIndex: 100,
    borderRadius: 18,
    shadowColor: "#F857A6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  arToggleGradient: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(248, 87, 166, 0.18)",
    backgroundColor: "rgba(255,255,255,0.65)",
  },
  arToggleText: {
    color: "#880E4F",
    fontSize: 13,
    fontWeight: "800",
  },

  /* Error Card (match topic card style) */
  errorCardWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  errorCard: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(248, 87, 166, 0.12)",
    shadowColor: "#F857A6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "rgba(248, 87, 166, 0.10)",
    borderWidth: 2,
    borderColor: "rgba(248, 87, 166, 0.20)",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#880E4F",
    marginBottom: 6,
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#E91E63",
    fontWeight: "600",
    textAlign: "center",
  },
});