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
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function FloatingScienceBackground() {
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
        size: 46 * s,
        left: width * 0.08,
        top: height * 0.18,
        dx: orbit(float1, 14),
        dy: orbitSmall(float1, 18),
        opacity: 0.14,
      },
      {
        emoji: "⚛️",
        size: 42 * s,
        left: width * 0.78,
        top: height * 0.15,
        dx: orbitSmall(float2, 16),
        dy: orbit(float2, 22),
        opacity: 0.12,
      },
      {
        emoji: "🧬",
        size: 48 * s,
        left: width * 0.72,
        top: height * 0.45,
        dx: orbit(float3, 18),
        dy: orbitSmall(float3, 16),
        opacity: 0.11,
      },
      {
        emoji: "🔭",
        size: 44 * s,
        left: width * 0.10,
        top: height * 0.56,
        dx: orbitSmall(float4, 18),
        dy: orbit(float4, 14),
        opacity: 0.10,
      },
      {
        emoji: "🧫",
        size: 46 * s,
        left: width * 0.42,
        top: height * 0.10,
        dx: orbit(float5, 10),
        dy: orbitSmall(float5, 20),
        opacity: 0.09,
      },
    ];
  }, [float1, float2, float3, float4, float5]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      {/* Soft blobs */}
      <View style={[styles.blob, styles.blobOne]} />
      <View style={[styles.blob, styles.blobTwo]} />
      <View style={[styles.blob, styles.blobThree]} />

      {/* Floating science icons */}
      {items.map((it, idx) => (
        <Animated.Text
          key={`sci-${idx}`}
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

      {/* Subtle dots */}
      <View style={styles.dotRow}>
        {/* <View style={[styles.dot, { opacity: 0.12 }]} /> */}
        {/* <View style={[styles.dot, { opacity: 0.07, marginLeft: 12 }]} /> */}
        {/* <View style={[styles.dot, { opacity: 0.10, marginLeft: 10 }]} /> */}
        {/* <View style={[styles.dot, { opacity: 0.06, marginLeft: 14 }]} /> */}
      </View>
      <View style={[styles.dotRow, { top: height * 0.72, left: width * 0.64 }]}>
        <View style={[styles.dot, { opacity: 0.08 }]} />
        <View style={[styles.dot, { opacity: 0.12, marginLeft: 12 }]} />
        <View style={[styles.dot, { opacity: 0.05, marginLeft: 10 }]} />
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { user, userProfile } = useAuth();

  const handlePhysicsPress = () => navigation.navigate("Physics");
  const handleChemistryPress = () => navigation.navigate("Chemistry");
  const handleBiologyPress = () => navigation.navigate("Biology");
  const handleBackToWelcome = () => navigation.navigate("Welcome");
  const handleProfilePress = () => navigation.navigate("Profile");

  return (
    <LinearGradient
      colors={["#FFF8E7", "#FFF0D4", "#FFE8C8"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />

        {/* NEW: Science background elements (keeps app consistent with Welcome screen) */}
        <FloatingScienceBackground />

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToWelcome}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {user && (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#FF9A56", "#FF6B6B"]}
              style={styles.profileButtonGradient}
            >
              <Text style={styles.profileButtonText}>
                {userProfile?.name
                  ? userProfile.name.charAt(0).toUpperCase()
                  : "U"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.greeting}>Hey there! 👋</Text>
            <Text style={styles.title}>
              What do you want{"\n"}to learn today?
            </Text>
            <Text style={styles.subtitle}>
              Pick a subject and start exploring!
            </Text>
          </View>

          <View style={styles.mainContent}>
            {/* Physics Card */}
            <TouchableOpacity
              style={styles.subjectCard}
              activeOpacity={0.85}
              onPress={handlePhysicsPress}
            >
              <LinearGradient
                colors={["#667EEA", "#764BA2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
              >
                <View style={styles.cardEmojiWrap}>
                  <Text style={styles.cardEmoji}>🚀</Text>
                </View>
                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>Physics</Text>
                  <Text style={styles.cardDescription}>
                    Light, mirrors, lenses & circuits — see how things work!
                  </Text>
                </View>
                <View style={styles.cardArrow}>
                  <Text style={styles.cardArrowText}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Chemistry Card */}
            <TouchableOpacity
              style={styles.subjectCard}
              activeOpacity={0.85}
              onPress={handleChemistryPress}
            >
              <LinearGradient
                colors={["#11998E", "#38EF7D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
              >
                <View style={styles.cardEmojiWrap}>
                  <Text style={styles.cardEmoji}>🧪</Text>
                </View>
                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>Chemistry</Text>
                  <Text style={styles.cardDescription}>
                    Atoms, molecules & cool reactions — explore the tiny world!
                  </Text>
                </View>
                <View style={styles.cardArrow}>
                  <Text style={styles.cardArrowText}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Biology Card */}
            <TouchableOpacity
              style={styles.subjectCard}
              activeOpacity={0.85}
              onPress={handleBiologyPress}
            >
              <LinearGradient
                colors={["#F857A6", "#FF5858"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
              >
                <View style={styles.cardEmojiWrap}>
                  <Text style={styles.cardEmoji}>🧬</Text>
                </View>
                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>Biology</Text>
                  <Text style={styles.cardDescription}>
                    Cells, brain, heart & more — discover how life works!
                  </Text>
                </View>
                <View style={styles.cardArrow}>
                  <Text style={styles.cardArrowText}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.funFact}>
            <Text style={styles.funFactEmoji}>💡</Text>
            <Text style={styles.funFactText}>
              Fun fact: Your brain has about 86 billion neurons!
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

  /* --- Background elements (NEW) --- */
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blobOne: {
    width: width * 0.78,
    height: width * 0.78,
    left: -width * 0.32,
    top: -width * 0.22,
    backgroundColor: "rgba(255,154,86,0.10)",
  },
  blobTwo: {
    width: width * 0.72,
    height: width * 0.72,
    right: -width * 0.30,
    top: height * 0.18,
    backgroundColor: "rgba(102,126,234,0.10)",
  },
  blobThree: {
    width: width * 0.86,
    height: width * 0.86,
    left: width * 0.10,
    bottom: -width * 0.46,
    backgroundColor: "rgba(255,107,107,0.09)",
  },
  floatingEmoji: {
    position: "absolute",
  },
  dotRow: {
    position: "absolute",
    top: height * 0.32,
    left: width * 0.14,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(45,32,21,1)",
  },

  /* --- Your original styles (unchanged) --- */
  backButton: {
    position: "absolute",
    top: 58,
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backButtonText: {
    color: "#5A4E3C",
    top: -1,
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    position: "absolute",
    top: 58,
    right: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: "hidden",
    zIndex: 10,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  profileButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 110,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#B8860B",
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#3D2C1E",
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8B7355",
    fontWeight: "500",
  },
  mainContent: {
    gap: 16,
  },
  subjectCard: {
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingVertical: 24,
  },
  cardEmojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardEmoji: {
    fontSize: 30,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
  },
  cardArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  cardArrowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  funFact: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    padding: 16,
    marginTop: 28,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  funFactEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  funFactText: {
    flex: 1,
    fontSize: 14,
    color: "#5A4E3C",
    fontWeight: "500",
    lineHeight: 20,
  },
});