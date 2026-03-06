import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ✅ NEW: font loading
import { useFonts } from "expo-font";
import {
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from "@expo-google-fonts/baloo-2";
import {
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

const { width, height } = Dimensions.get("window");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function FloatingScienceBackground({ fadeAnim }) {
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

  // Stable positions (computed once)
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
        opacity: 0.16,
      },
      {
        emoji: "⚛️",
        size: 42 * s,
        left: width * 0.78,
        top: height * 0.15,
        dx: orbitSmall(float2, 16),
        dy: orbit(float2, 22),
        opacity: 0.14,
      },
      {
        emoji: "🧬",
        size: 48 * s,
        left: width * 0.72,
        top: height * 0.45,
        dx: orbit(float3, 18),
        dy: orbitSmall(float3, 16),
        opacity: 0.13,
      },
      {
        emoji: "🔭",
        size: 44 * s,
        left: width * 0.10,
        top: height * 0.56,
        dx: orbitSmall(float4, 18),
        dy: orbit(float4, 14),
        opacity: 0.12,
      },
      {
        emoji: "🧫",
        size: 46 * s,
        left: width * 0.42,
        top: height * 0.10,
        dx: orbit(float5, 10),
        dy: orbitSmall(float5, 20),
        opacity: 0.11,
      },
    ];
  }, [float1, float2, float3, float4, float5]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}
    >
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
        {/* <View style={[styles.dot, { opacity: 0.14 }]} /> */}
        {/* <View style={[styles.dot, { opacity: 0.08, marginLeft: 12 }]} /> */}
        {/* <View style={[styles.dot, { opacity: 0.12, marginLeft: 10 }]} /> */}
        {/* <View style={[styles.dot, { opacity: 0.06, marginLeft: 14 }]} /> */}
      </View>
      <View style={[styles.dotRow, { top: height * 0.72, left: width * 0.64 }]}>
        <View style={[styles.dot, { opacity: 0.09 }]} />
        <View style={[styles.dot, { opacity: 0.13, marginLeft: 12 }]} />
        <View style={[styles.dot, { opacity: 0.05, marginLeft: 10 }]} />
      </View>
    </Animated.View>
  );
}

export default function WelcomeScreen({ navigation }) {
  // ✅ NEW: load fonts (Fredoka for headings, Nunito for body/UI)
  const [fontsLoaded] = useFonts({
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleGetStarted = () => {
    navigation.navigate("Home");
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  // ✅ NEW: wait for fonts
  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={["#FFF8E7", "#FFF0D4", "#FFE8C8"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />

        {/* Background elements behind everything */}
        <FloatingScienceBackground fadeAnim={fadeAnim} />

        {/* Header Section */}
        <Animated.View
          style={[
            styles.headerSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.title}>SMART SCI AR</Text>
          <Text style={styles.subtitle}>Science Learning, Reimagined.</Text>
          <View style={styles.gradeContainer}>
            <Text style={styles.gradeText}>
              Classes 6-12 • Physics • Chemistry • Biology
            </Text>
          </View>
        </Animated.View>

        {/* Welcome Content */}
        <Animated.View style={[styles.contentSection, { opacity: fadeAnim }]}>
          <Text style={styles.welcomeText}>
            Dive into science with Augmented Reality 🧪🧬
          </Text>
          <Text style={styles.descriptionText}>
            Explore complex concepts with interactive 3D models and simulations,
            bringing your textbooks to life.
          </Text>
        </Animated.View>

        {/* Buttons Section */}
        <Animated.View style={[styles.buttonSection, { opacity: fadeAnim }]}>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#FF9A56", "#FF6B6B"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignupPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#667EEA", "#764BA2"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue as Guest Button */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },

  /* --- Background elements --- */
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blobOne: {
    width: width * 0.78,
    height: width * 0.78,
    left: -width * 0.32,
    top: -width * 0.22,
    backgroundColor: "rgba(255,154,86,0.11)",
  },
  blobTwo: {
    width: width * 0.72,
    height: width * 0.72,
    right: -width * 0.30,
    top: height * 0.18,
    backgroundColor: "rgba(102,126,234,0.11)",
  },
  blobThree: {
    width: width * 0.86,
    height: width * 0.86,
    left: width * 0.10,
    bottom: -width * 0.46,
    backgroundColor: "rgba(255,107,107,0.10)",
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

  /* --- ORIGINAL STYLES (only fontFamily updated) --- */
  headerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#2D2015",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "Baloo2_800ExtraBold",
  },
  subtitle: {
    fontSize: 20,
    color: "#FF9A56",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
  gradeContainer: {
    backgroundColor: "rgba(255,154,86,0.1)",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF9A56",
    marginTop: 10,
  },
  gradeText: {
    color: "#FF9A56",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Nunito_600SemiBold",
  },
  contentSection: {
    flex: 1.5,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D2015",
    textAlign: "center",
    lineHeight: 32,
    fontFamily: "Baloo2_600SemiBold",
  },
  descriptionText: {
    fontSize: 16,
    color: "#8B7355",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: "Nunito_400Regular",
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    width: "100%",
    marginBottom: 30,
  },
  loginButton: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#FF9A56",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 16,
  },
  signupButton: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#667EEA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8,
    fontFamily: "Nunito_700Bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dividerText: {
    color: "#8B7355",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 15,
    marginBottom: -10,
    fontFamily: "Nunito_600SemiBold",
  },
  guestButton: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  guestButtonText: {
    color: "#5A4E3C",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8,
    fontFamily: "Nunito_700Bold",
  },
});