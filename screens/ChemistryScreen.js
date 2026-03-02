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

export default function ChemistryScreen({ navigation }) {
  const chemistryTopics = [
    {
      title: "Water Ball-and-Stick Model",
      modelId: "waterBallStick",
      hasModel: true,
    },
    {
      title: "Atomic Structure & Periodic Table",
      modelId: "atom",
      hasModel: true,
    },
    {
      title: "Atomic Models & Theory",
      modelId: "atomicModel",
      hasModel: true,
    },
    {
      title: "F Orbital - Quantum Chemistry",
      modelId: "orbitalF",
      hasModel: true,
    },
    {
      title: "Dxz Orbital - Transition Metals",
      modelId: "orbitalDxz",
      hasModel: true,
    },
    {
      title: "Cyclohexane Chair Conformation",
      modelId: "cyclohexane",
      hasModel: true,
    },
    {
      title: "Molecular Structure & Bonding",
      modelId: "molecule",
      hasModel: true,
    },
    {
      title: "Periodic Table of Elements",
      modelId: "periodicTable",
      hasModel: true,
    },
    {
      title: "Carbon Dioxide (CO₂)",
      modelId: "carbonDioxide",
      hasModel: true,
    },
    {
      title: "Glucose - Carbohydrates",
      modelId: "glucose",
      hasModel: true,
    },
    {
      title: "Methane (CH₄) - Alkanes",
      modelId: "methane",
      hasModel: true,
    },
    {
      title: "Ethane Molecule",
      modelId: "ethane",
      hasModel: true,
    },
    {
      title: "Diamond Crystal Structure",
      modelId: "diamond",
      hasModel: true,
    },
    {
      title: "Water Molecule (H₂O)",
      modelId: "water",
      hasModel: true,
    },
    {
      title: "Benzene - Aromatic Compounds",
      modelId: "benzene",
      hasModel: true,
    },
    {
      title: "Dopamine - Neurotransmitters",
      modelId: "dopamine",
      hasModel: true,
    },
    {
      title: "Phenol - Aromatic Alcohols",
      modelId: "phenol",
      hasModel: true,
    },
    {
      title: "Liquid Water Structure",
      modelId: "liquidWater",
      hasModel: true,
    },
    {
      title: "Sodium Chloride (NaCl)",
      modelId: "nacl",
      hasModel: true,
    },
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
            <Text style={styles.subtitle}>
              Mix, match & discover molecules!
            </Text>
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
                      {topic.hasModel
                        ? "Tap to see 3D model ✨"
                        : "Coming soon..."}
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
    color: "#2E7D32",
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
    backgroundColor: "rgba(17, 153, 142, 0.12)",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(17, 153, 142, 0.25)",
  },
  iconText: {
    fontSize: 40,
  },
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
  topicsSection: {
    gap: 12,
    marginBottom: 30,
  },
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
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 3,
  },
  topicTitleDisabled: {
    color: "#9E9E9E",
  },
  topicSubtitle: {
    fontSize: 12,
    color: "#66BB6A",
    fontWeight: "500",
  },
  topicSubtitleDisabled: {
    color: "#BDBDBD",
  },
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
