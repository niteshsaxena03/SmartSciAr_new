import React, { useEffect, useRef } from "react";
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

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
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
  }, []);

  const handleGetStarted = () => {
    navigation.navigate("Home");
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <LinearGradient
      colors={["#FFF8E7", "#FFF0D4", "#FFE8C8"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />

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
  },
  subtitle: {
    fontSize: 20,
    color: "#FF9A56",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
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
  },
  contentSection: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D2015",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 32,
  },
  descriptionText: {
    fontSize: 16,
    color: "#8B7355",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    width: "100%",
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
  },
});
