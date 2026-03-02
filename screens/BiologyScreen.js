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

export default function BiologyScreen({ navigation }) {
  const biologyTopics = [
    { title: "Neuron Structure", modelId: "neuron", hasModel: true },
    { title: "Animal Cell Structure", modelId: "animalCell", hasModel: true },
    { title: "Human Brain Structure", modelId: "humanBrain", hasModel: true },
    { title: "Heart and Lungs", modelId: "heartLungs", hasModel: true },
    { title: "Digestive System", modelId: "digestiveSystem", hasModel: true },
    {
      title: "Cell Model - Basic Structure",
      modelId: "cellModel",
      hasModel: true,
    },
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
    {
      title: "Female Muscular System",
      modelId: "femaleMuscular",
      hasModel: true,
    },
    {
      title: "Cervical Vertebra",
      modelId: "cervicalVertebra",
      hasModel: true,
    },
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
            <Text style={styles.subtitle}>
              Discover the secrets of life!
            </Text>
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
