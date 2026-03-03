import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function PhysicsScreen({ navigation }) {
  const physicsTopics = [
    {
      title: "The New Cartesian Sign Convention for Spherical Mirrors",
      modelId: "figure109",
      hasModel: true,
    },
    {
      title: "Focal Ray Refraction in Lenses",
      modelId: "figure1014",
      hasModel: true,
    },
    {
      title: "Electric Circuit",
      modelId: "figure121",
      hasModel: true,
    },
    {
      title: "Refraction of Light",
      modelId: "figure1010",
      hasModel: true,
    },
    {
      title: "Image Formation by Convex Lens for Various Object Positions",
      modelId: "figure1016",
      hasModel: true,
    },
    {
      title: "Parallel Rays Through Concave Mirror",
      modelId: "figure103",
      hasModel: true,
    },
    {
      title: "Focal Ray Reflection in Mirrors",
      modelId: "figure104",
      hasModel: true,
    },
    {
      title: "Center of Curvature Ray Reflection",
      modelId: "figure105",
      hasModel: true,
    },
    {
      title: "Oblique Ray Reflection at Mirror Pole",
      modelId: "figure106",
      hasModel: true,
    },
    {
      title: "Ray Diagrams for Concave Mirror Image Formation",
      modelId: "figure107",
      hasModel: true,
    },
    {
      title: "Formation of Image by a Convex Mirror",
      modelId: "figure108",
      hasModel: true,
    },
    {
      title: "Newton's Cradle",
      modelId: "decoration",
      hasModel: true,
    },
    {
      title: "Refraction of Light by Glass",
      modelId: "figure1011",
      hasModel: true,
    },
    {
      title: "Converging and Diverging Action of Lenses",
      modelId: "figure1012",
      hasModel: true,
    },
    {
      title: "Principal Axis Ray Refraction in Lenses",
      modelId: "figure1013",
      hasModel: true,
    },
    {
      title: "Reflection & Refraction Prism",
      modelId: "prism",
      hasModel: true,
    },
    {
      title: "Ray Through Optical Center of Lens",
      modelId: "figure1015",
      hasModel: true,
    },
    {
      title: "Concave and Convex Mirror",
      modelId: "figure102",
      hasModel: true,
    },
    {
      title: "Image Formation by Concave Lens",
      modelId: "figure1017",
      hasModel: true,
    },
    {
      title: "Electrical Conductivity of Metals",
      modelId: "figure32",
      hasModel: true,
    },
    {
      title: "The Human Eye",
      modelId: "figure111",
      hasModel: true,
    },
    {
      title: "Myopia and Its Correction with Concave Lens",
      modelId: "figure112",
      hasModel: true,
    },
    {
      title: "Hypermetropia and Its Correction with Convex Lens",
      modelId: "figure113",
      hasModel: true,
    },
    {
      title: "Refraction of Light Through a Triangular Glass Prism",
      modelId: "figure114",
      hasModel: true,
    },
    {
      title: "Dispersion of White Light by the Glass Prism",
      modelId: "figure115",
      hasModel: true,
    },
    {
      title: "Recombination of the Spectrum of White Light",
      modelId: "figure116",
      hasModel: true,
    },
    {
      title: "Rainbow Formation",
      modelId: "figure118",
      hasModel: true,
    },
    {
      title: "Observing Scattering of Light in Colloidal Solution",
      modelId: "figure1111",
      hasModel: true,
    },
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
            <Text style={styles.subtitle}>
              Explore how the universe works!
            </Text>
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
                    <Text style={styles.topicSubtitle}>
                      Tap to see 3D model ✨
                    </Text>
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
    backgroundColor: "rgba(102, 126, 234, 0.15)",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
  iconText: {
    fontSize: 40,
  },
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
  topicsSection: {
    gap: 12,
    marginBottom: 30,
  },
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
  topicContent: {
    flex: 1,
  },
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
