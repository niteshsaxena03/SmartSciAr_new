import React, { useState, useEffect, useRef, useMemo } from "react";
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

/** Subject-based theme tokens */
const THEMES = {
  physics: {
    text: "#2D2051",
    mutedText: "#7C6BA5",
    underline: "#667EEA",
    pageBg: "transparent", // IMPORTANT: let parent gradient show
    cardBg: "#FFFFFF",
    cardBorder: "rgba(102,126,234,0.12)",
    softChipBg: "rgba(102,126,234,0.10)",
    backBg: "#FFFFFF",
    backText: "#4A3D6B",
    accentA: "#667EEA",
    accentB: "#764BA2",
    bullet: "#667EEA",
    detailsIconBg: "rgba(102,126,234,0.10)",
    loading: "#667EEA",
    loadingTrack: "rgba(102,126,234,0.18)",
    aiBorder: "#667EEA",
    aiText: "#3D2C6B",
    aiSub: "#9B8FC2",
    quizBorder: "#764BA2",
    quizText: "#5B3FA0",
    quizSub: "#B6A7D8",
    listenBorder: "#667EEA",
    listenText: "#4A3D6B",
    listenSub: "#9B8FC2",
    listenActiveBg: "rgba(102,126,234,0.10)",
    listenActiveBorder: "rgba(118,75,162,0.30)",
    spinner: "#667EEA",
  },
  biology: {
    text: "#880E4F",
    mutedText: "#E91E63",
    underline: "#F857A6",
    pageBg: "transparent",
    cardBg: "#FFFFFF",
    cardBorder: "rgba(248,87,166,0.12)",
    softChipBg: "rgba(248,87,166,0.10)",
    backBg: "#FFFFFF",
    backText: "#AD1457",
    accentA: "#F857A6",
    accentB: "#FF5858",
    bullet: "#F857A6",
    detailsIconBg: "rgba(248,87,166,0.10)",
    loading: "#F857A6",
    loadingTrack: "rgba(248,87,166,0.18)",
    aiBorder: "#F857A6",
    aiText: "#880E4F",
    aiSub: "#F06292",
    quizBorder: "#FF5858",
    quizText: "#C62828",
    quizSub: "#EF9A9A",
    listenBorder: "#F857A6",
    listenText: "#AD1457",
    listenSub: "#F06292",
    listenActiveBg: "rgba(248,87,166,0.10)",
    listenActiveBorder: "rgba(255,88,88,0.30)",
    spinner: "#F857A6",
  },
  chemistry: {
    text: "#1B5E20",
    mutedText: "#4CAF50",
    underline: "#11998E",
    pageBg: "transparent",
    cardBg: "#FFFFFF",
    cardBorder: "rgba(17,153,142,0.12)",
    softChipBg: "rgba(17,153,142,0.10)",
    backBg: "#FFFFFF",
    backText: "#2E7D32",
    accentA: "#11998E",
    accentB: "#38EF7D",
    bullet: "#11998E",
    detailsIconBg: "rgba(17,153,142,0.10)",
    loading: "#11998E",
    loadingTrack: "rgba(17,153,142,0.18)",
    aiBorder: "#11998E",
    aiText: "#1B5E20",
    aiSub: "#66BB6A",
    quizBorder: "#38EF7D",
    quizText: "#11998E",
    quizSub: "#66BB6A",
    listenBorder: "#11998E",
    listenText: "#1B5E20",
    listenSub: "#66BB6A",
    listenActiveBg: "rgba(17,153,142,0.10)",
    listenActiveBorder: "rgba(56,239,125,0.30)",
    spinner: "#11998E",
  },
};

const ModelViewer = ({ modelData, navigation, subject = "physics" }) => {
  const { embedUrl, title, description, id } = modelData;

  const theme = useMemo(() => THEMES[subject] ?? THEMES.physics, [subject]);

  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const modelHasQuiz = hasQuiz(subject, id);
  const quizData = modelHasQuiz ? getQuizByModel(subject, id) : null;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );

    if (isLoading) pulseAnimation.start();
    else pulseAnimation.stop();

    return () => pulseAnimation.stop();
  }, [isLoading, fadeAnim, slideAnim, scaleAnim, pulseAnim]);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -50, duration: 300, useNativeDriver: true }),
    ]).start(() => navigation.goBack());
  };

  const handleWebViewLoad = () => {
    setIsLoading(false);
    setTimeout(() => setShowDescription(true), 1000);
  };

  const toggleDescription = () => setShowDescription((v) => !v);

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

  useEffect(() => () => Speech.stop(), []);

  // build subject-aware styles
  const s = getStyles(theme);

  return (
    <SafeAreaView style={s.container}>
      <Animated.View style={[s.backgroundGradient, { opacity: fadeAnim }]} />

      <Animated.View style={[s.backArrowContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity style={s.backArrow} onPress={handleBack} activeOpacity={0.7}>
          <Text style={s.backArrowText}>←</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={s.scrollView} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[s.titleContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
          <Text style={s.title}>{title}</Text>
          <View style={s.titleUnderline} />
        </Animated.View>

        <Animated.View
          style={[
            s.modelContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: isLoading ? pulseAnim : scaleAnim }],
            },
          ]}
        >
          {isLoading && (
            <View style={s.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.spinner} />
              <Text style={s.loadingText}>Preparing Model...</Text>
              <View style={s.loadingBar}>
                <Animated.View style={[s.loadingProgress, { transform: [{ scaleX: pulseAnim }] }]} />
              </View>
            </View>
          )}

          <WebView
            source={{ uri: embedUrl }}
            style={s.modelFrame}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onLoad={handleWebViewLoad}
            onLoadEnd={handleWebViewLoad}
          />
        </Animated.View>

        <Animated.View style={[s.descriptionToggle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity style={s.toggleButton} onPress={toggleDescription} activeOpacity={0.8}>
            <Text style={s.toggleButtonText}>{showDescription ? "Hide Details" : "Show Details"}</Text>
            <Animated.Text style={[s.toggleArrow, { transform: [{ rotate: showDescription ? "180deg" : "0deg" }] }]}>
              ▼
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[s.aiButtonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
          <TouchableOpacity
            style={s.aiButton}
            onPress={() =>
              navigation.navigate("AIChat", {
                topicTitle: title,
                topicDescription: description.join(" "),
              })
            }
            activeOpacity={0.85}
          >
            <View style={s.aiButtonGlow} />
            <Text style={s.aiButtonIcon}>🤖</Text>
            <Text style={s.aiButtonText}>Ask AI</Text>
            <Text style={s.aiButtonSubtext}>Smart instant answers</Text>
          </TouchableOpacity>
        </Animated.View>

        {modelHasQuiz && (
          <Animated.View style={[s.quizButtonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
            <TouchableOpacity style={s.quizButton} onPress={() => setQuizVisible(true)} activeOpacity={0.85}>
              <View style={s.quizButtonGlow} />
              <Text style={s.quizButtonIcon}>📝</Text>
              <Text style={s.quizButtonText}>Take Quiz</Text>
              <Text style={s.quizButtonSubtext}>Test your knowledge</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Animated.View style={[s.listenButtonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
          <TouchableOpacity style={[s.listenButton, isSpeaking && s.listenButtonActive]} onPress={handleSpeak} activeOpacity={0.85}>
            <View style={s.listenButtonGlow} />
            <Text style={s.listenButtonIcon}>{isSpeaking ? "⏹️" : "🔊"}</Text>
            <Text style={s.listenButtonText}>{isSpeaking ? "Stop" : "Listen"}</Text>
            <Text style={s.listenButtonSubtext}>{isSpeaking ? "Tap to stop audio" : "Hear the description"}</Text>
          </TouchableOpacity>
        </Animated.View>

        {showDescription && (
          <Animated.View style={[s.descriptionContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={s.descriptionHeader}>
              <Text style={s.descriptionTitle}>Key Insights</Text>
              <View style={s.descriptionIcon}>
                <Text style={s.iconText}>✨</Text>
              </View>
            </View>

            {description.map((point, index) => (
              <Animated.View
                key={index}
                style={[
                  s.pointContainer,
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
                <View style={s.pointBullet} />
                <Text style={s.descriptionPoint}>{point}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>

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

/** Create styles based on theme */
function getStyles(t) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.pageBg, // transparent so outer gradient shows
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
      backgroundColor: t.backBg,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    backArrowText: {
      color: t.backText,
      fontSize: 22,
      fontWeight: "700",
    },
    scrollView: { flex: 1, zIndex: 2 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 115, paddingBottom: 50 },
    titleContainer: { alignItems: "center", marginBottom: 24 },
    title: {
      fontSize: 26,
      fontWeight: "800",
      color: t.text,
      textAlign: "center",
      letterSpacing: 0.5,
    },
    titleUnderline: {
      width: 60,
      height: 4,
      backgroundColor: t.underline,
      marginTop: 10,
      borderRadius: 3,
    },
    modelContainer: {
      width: "100%",
      height: 420,
      marginBottom: 24,
      borderRadius: 22,
      overflow: "hidden",
      backgroundColor: t.cardBg,
      borderWidth: 1,
      borderColor: t.cardBorder,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
    modelFrame: { width: "100%", height: "100%", borderRadius: 22 },
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
      color: t.loading,
      fontSize: 17,
      fontWeight: "600",
      marginTop: 15,
    },
    loadingBar: {
      width: 180,
      height: 5,
      backgroundColor: t.loadingTrack,
      borderRadius: 3,
      marginTop: 18,
      overflow: "hidden",
    },
    loadingProgress: {
      height: "100%",
      backgroundColor: t.loading,
      borderRadius: 3,
    },
    descriptionToggle: { marginBottom: 16 },
    toggleButton: {
      backgroundColor: t.cardBg,
      borderRadius: 16,
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: t.cardBorder,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    toggleButtonText: { color: t.text, fontSize: 17, fontWeight: "700" },
    toggleArrow: { color: t.underline, fontSize: 16, fontWeight: "bold" },

    aiButtonContainer: { marginBottom: 14 },
    aiButton: {
      backgroundColor: t.cardBg,
      borderRadius: 18,
      padding: 18,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: t.aiBorder,
      shadowColor: t.aiBorder,
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 3,
    },
    aiButtonGlow: { display: "none" },
    aiButtonIcon: { fontSize: 28, marginBottom: 6 },
    aiButtonText: { color: t.aiText, fontSize: 19, fontWeight: "800", marginBottom: 3 },
    aiButtonSubtext: { color: t.aiSub, fontSize: 13, fontWeight: "500" },

    quizButtonContainer: { marginBottom: 14 },
    quizButton: {
      backgroundColor: t.cardBg,
      borderRadius: 18,
      padding: 18,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: t.quizBorder,
      shadowColor: t.quizBorder,
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 3,
    },
    quizButtonGlow: { display: "none" },
    quizButtonIcon: { fontSize: 28, marginBottom: 6 },
    quizButtonText: { color: t.quizText, fontSize: 19, fontWeight: "800", marginBottom: 3 },
    quizButtonSubtext: { color: t.quizSub, fontSize: 13, fontWeight: "500" },

    listenButtonContainer: { marginBottom: 16 },
    listenButton: {
      backgroundColor: t.cardBg,
      borderRadius: 18,
      padding: 18,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: t.listenBorder,
      shadowColor: t.listenBorder,
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 3,
    },
    listenButtonActive: {
      backgroundColor: t.listenActiveBg,
      borderColor: t.listenActiveBorder,
    },
    listenButtonGlow: { display: "none" },
    listenButtonIcon: { fontSize: 28, marginBottom: 6 },
    listenButtonText: { color: t.listenText, fontSize: 19, fontWeight: "800", marginBottom: 3 },
    listenButtonSubtext: { color: t.listenSub, fontSize: 13, fontWeight: "500" },

    descriptionContainer: {
      backgroundColor: t.cardBg,
      borderRadius: 20,
      padding: 22,
      borderWidth: 1,
      borderColor: t.cardBorder,
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
    descriptionTitle: { fontSize: 20, fontWeight: "800", color: t.text },
    descriptionIcon: {
      width: 38,
      height: 38,
      backgroundColor: t.detailsIconBg,
      borderRadius: 19,
      justifyContent: "center",
      alignItems: "center",
    },
    iconText: { fontSize: 18 },
    pointContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 14,
      paddingLeft: 4,
    },
    pointBullet: {
      width: 8,
      height: 8,
      backgroundColor: t.bullet,
      borderRadius: 4,
      marginRight: 12,
      marginTop: 7,
    },
    descriptionPoint: {
      fontSize: 15,
      lineHeight: 23,
      color: t.mutedText,
      flex: 1,
      fontWeight: "500",
    },
  });
}

export default ModelViewer;