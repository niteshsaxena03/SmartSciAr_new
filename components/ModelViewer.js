import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Speech from "expo-speech";
import QuizModal from "./QuizModal";
import { hasQuiz, getQuizByModel } from "../data/quizData";

const { width } = Dimensions.get("window");

const ModelViewer = ({ modelData, navigation, subject }) => {
  const { embedUrl, title, description, id } = modelData;
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Check if this model has a quiz
  const modelHasQuiz = hasQuiz(subject, id);
  const quizData = modelHasQuiz ? getQuizByModel(subject, id) : null;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (isLoading) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [isLoading]);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleWebViewLoad = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowDescription(true);
    }, 1000);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleSpeak = async () => {
    const speaking = await Speech.isSpeakingAsync();
    if (speaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      const text = description.map((p) => p.replace(/^•\s*/, "")).join(". ");
      setIsSpeaking(true);
      Speech.speak(text, {
        language: "en",
        rate: 0.95,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Background */}
      <Animated.View style={[styles.backgroundGradient, { opacity: fadeAnim }]} />

      {/* Back Button */}
      <Animated.View
        style={[
          styles.backArrowContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backArrow}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* Model Viewer */}
        <Animated.View
          style={[
            styles.modelContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: isLoading ? pulseAnim : scaleAnim },
              ],
            },
          ]}
        >
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#00f5d4" />
              <Text style={styles.loadingText}>Preparing Model...</Text>
              <View style={styles.loadingBar}>
                <Animated.View
                  style={[
                    styles.loadingProgress,
                    {
                      transform: [{ scaleX: pulseAnim }],
                    },
                  ]}
                />
              </View>
            </View>
          )}

          <WebView
            source={{ uri: embedUrl }}
            style={styles.modelFrame}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onLoad={handleWebViewLoad}
            onLoadEnd={handleWebViewLoad}
          />
        </Animated.View>

        {/* Toggle Description */}
        <Animated.View
          style={[
            styles.descriptionToggle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleDescription}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleButtonText}>
              {showDescription ? "Hide Details" : "Show Details"}
            </Text>
            <Animated.Text
              style={[
                styles.toggleArrow,
                {
                  transform: [
                    {
                      rotate: showDescription ? "180deg" : "0deg",
                    },
                  ],
                },
              ]}
            >
              ▼
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Ask AI */}
        <Animated.View
          style={[
            styles.aiButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.aiButton}
            onPress={() =>
              navigation.navigate("AIChat", {
                topicTitle: title,
                topicDescription: description.join(" "),
              })
            }
            activeOpacity={0.85}
          >
            <View style={styles.aiButtonGlow} />
            <Text style={styles.aiButtonIcon}>🤖</Text>
            <Text style={styles.aiButtonText}>Ask AI</Text>
            <Text style={styles.aiButtonSubtext}>Smart instant answers</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Take Quiz Button */}
        {modelHasQuiz && (
          <Animated.View
            style={[
              styles.quizButtonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => setQuizVisible(true)}
              activeOpacity={0.85}
            >
              <View style={styles.quizButtonGlow} />
              <Text style={styles.quizButtonIcon}>📝</Text>
              <Text style={styles.quizButtonText}>Take Quiz</Text>
              <Text style={styles.quizButtonSubtext}>Test your knowledge</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Listen Button */}
        <Animated.View
          style={[
            styles.listenButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.listenButton,
              isSpeaking && styles.listenButtonActive,
            ]}
            onPress={handleSpeak}
            activeOpacity={0.85}
          >
            <View style={styles.listenButtonGlow} />
            <Text style={styles.listenButtonIcon}>
              {isSpeaking ? "⏹️" : "🔊"}
            </Text>
            <Text style={styles.listenButtonText}>
              {isSpeaking ? "Stop" : "Listen"}
            </Text>
            <Text style={styles.listenButtonSubtext}>
              {isSpeaking ? "Tap to stop audio" : "Hear the description"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Description */}
        {showDescription && (
          <Animated.View
            style={[
              styles.descriptionContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionTitle}>Key Insights</Text>
              <View style={styles.descriptionIcon}>
                <Text style={styles.iconText}>✨</Text>
              </View>
            </View>

            {description.map((point, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.pointContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, -20],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.pointBullet} />
                <Text style={styles.descriptionPoint}>{point}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>

      {/* Quiz Modal */}
      {modelHasQuiz && (
        <QuizModal
          visible={quizVisible}
          onClose={() => setQuizVisible(false)}
          quizData={quizData}
          modelTitle={title}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: "transparent",
  },
  backArrowContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
  },
  backArrow: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  backArrowText: {
    color: "#5A4E3C",
    fontSize: 22,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 115,
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2D2015",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: "#FF9A56",
    marginTop: 10,
    borderRadius: 3,
  },
  modelContainer: {
    width: "100%",
    height: 420,
    marginBottom: 24,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  modelFrame: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: 22,
  },
  loadingText: {
    color: "#FF9A56",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15,
  },
  loadingBar: {
    width: 180,
    height: 5,
    backgroundColor: "rgba(255,154,86,0.15)",
    borderRadius: 3,
    marginTop: 18,
    overflow: "hidden",
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#FF9A56",
    borderRadius: 3,
  },
  descriptionToggle: {
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  toggleButtonText: {
    color: "#5A4E3C",
    fontSize: 17,
    fontWeight: "700",
  },
  toggleArrow: {
    color: "#FF9A56",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D2015",
  },
  descriptionIcon: {
    width: 38,
    height: 38,
    backgroundColor: "#FFF3E0",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    paddingLeft: 4,
  },
  pointBullet: {
    width: 8,
    height: 8,
    backgroundColor: "#FF9A56",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 7,
  },
  descriptionPoint: {
    fontSize: 15,
    lineHeight: 23,
    color: "#4A3D2E",
    flex: 1,
  },
  aiButtonContainer: {
    marginBottom: 14,
  },
  aiButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#4ECDC4",
    position: "relative",
    shadowColor: "#4ECDC4",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  aiButtonGlow: {
    display: "none",
  },
  aiButtonIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  aiButtonText: {
    color: "#2BA89E",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 3,
  },
  aiButtonSubtext: {
    color: "#7ECEC8",
    fontSize: 13,
    fontWeight: "500",
  },
  quizButtonContainer: {
    marginBottom: 14,
  },
  quizButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FF9A56",
    position: "relative",
    shadowColor: "#FF9A56",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  quizButtonGlow: {
    display: "none",
  },
  quizButtonIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  quizButtonText: {
    color: "#E07B3A",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 3,
  },
  quizButtonSubtext: {
    color: "#F0AA7A",
    fontSize: 13,
    fontWeight: "500",
  },
  listenButtonContainer: {
    marginBottom: 16,
  },
  listenButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#9B7BDB",
    position: "relative",
    shadowColor: "#9B7BDB",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  listenButtonActive: {
    backgroundColor: "#F3EDFF",
    borderColor: "#7C5CBF",
  },
  listenButtonGlow: {
    display: "none",
  },
  listenButtonIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  listenButtonText: {
    color: "#7C5CBF",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 3,
  },
  listenButtonSubtext: {
    color: "#B8A4D8",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default ModelViewer;
