import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

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
            <Text style={styles.title}>What do you want{"\n"}to learn today?</Text>
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
