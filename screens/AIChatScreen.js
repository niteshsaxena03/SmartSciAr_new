import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  // Note: StatusBar is often imported from 'expo-status-bar' in Expo apps.
  // Including it in the destructured import from 'react-native' here for compatibility.
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import aiService from "../services/aiService";

// --- Theme Colors Mapping ---
const THEMES = {
  physics: {
    accentGradient: ["#4895EF", "#4CC9F0"], // Bright Blue/Cyan
    inactiveGradient: ["rgba(72, 149, 239, 0.3)", "rgba(76, 201, 240, 0.3)"],
    secondaryText: "#1E6B9E",
  },
  chemistry: {
    accentGradient: ["#4ECDC4", "#8DECB4"], // Green/Cyan
    inactiveGradient: ["rgba(78, 205, 196, 0.3)", "rgba(141, 236, 180, 0.3)"],
    secondaryText: "#1A7A6F",
  },
  biology: {
    accentGradient: ["#FF6B6B", "#FF9B6B"], // Vibrant Red/Pink
    inactiveGradient: ["rgba(255, 107, 107, 0.3)", "rgba(255, 155, 107, 0.3)"],
    secondaryText: "#B52A2A",
  },
};
const BG_GRADIENT = ["#FFF8E7", "#FFF0D4", "#F5F0E8"];

const AIChatScreen = ({ route, navigation }) => {
  // NOTE: This logic assumes 'topicTitle' will contain a keyword (Physics, Chemistry, Biology)
  const { topicTitle } = route.params; 
  
  // Determine the theme based on topic title
  let currentTheme = THEMES.physics; 
  if (topicTitle.toLowerCase().includes("biology")) {
    currentTheme = THEMES.biology;
  } else if (topicTitle.toLowerCase().includes("chemistry")) {
    currentTheme = THEMES.chemistry;
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm your AI assistant for ${topicTitle}. Ask me anything about this topic and I'll help you learn!`,
      isAI: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // NOTE: Passing a dummy description since the original code only passed title
      const response = await aiService.askQuestion(
        userMessage.text,
        topicTitle,
        "dummy-description" 
      );

      const aiMessage = {
        id: messages.length + 2,
        text: response.success ? response.answer : response.error,
        isAI: true,
        timestamp: new Date(),
        isError: !response.success,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        isAI: true,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

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

  const renderMessage = (message) => (
    <Animated.View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isAI ? styles.aiMessageContainer : styles.userMessageContainer,
        { opacity: fadeAnim },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isAI ? styles.aiMessageBubble : styles.userMessageBubble,
          message.isError && styles.errorMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.isAI ? styles.aiMessageText : styles.userMessageText,
            message.isError && styles.errorMessageText,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            message.isAI ? styles.aiTimestamp : styles.userTimestamp,
          ]}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={BG_GRADIENT} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              borderBottomColor: "rgba(0,0,0,0.08)",
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={[styles.backButtonText, { color: "#5A4E3C" }]}>←</Text>
          </TouchableOpacity>
          
          {/* Header Content */}
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={[styles.headerSubtitle, { color: currentTheme.secondaryText }]}>{topicTitle}</Text>
          </View>
          
          {/* AI Status Indicator */}
          <View style={styles.aiIndicator}>
            <View style={[styles.aiDot, { backgroundColor: currentTheme.secondaryText }]} />
            <Text style={[styles.aiStatus, { color: currentTheme.secondaryText }]}>Online</Text>
          </View>
        </Animated.View>

        {/* Chat Messages */}
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map(renderMessage)}

            {/* Loading indicator */}
            {isLoading && (
              <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size="small" color={currentTheme.secondaryText} />
                  <Text style={styles.loadingText}>AI is thinking...</Text>
                </View>
              </Animated.View>
            )}
          </ScrollView>

          {/* Input Container */}
          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderTopColor: "rgba(0,0,0,0.06)",
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder={`Ask about ${topicTitle}...`}
                placeholderTextColor="#B8A090"
                multiline
                maxLength={500}
                onSubmitEditing={handleSendMessage}
                blurOnSubmit={false}
              />
              <LinearGradient
                colors={inputText.trim() ? currentTheme.accentGradient : currentTheme.inactiveGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendButton}
              >
                <TouchableOpacity
                  onPress={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  activeOpacity={0.7}
                  style={styles.sendButtonTouchable}
                >
                  <Text style={styles.sendButtonText}>→</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    top : -4,
    color: "#5A4E3C",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContent: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D2015",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  aiIndicator: {
    alignItems: "center",
  },
  aiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  aiStatus: {
    fontSize: 10,
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    marginVertical: 8,
  },
  aiMessageContainer: {
    alignItems: "flex-start",
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "85%",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  aiMessageBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 5,
    borderColor: "rgba(0,0,0,0.08)",
    borderWidth: 1,
    shadowColor: "#000",
  },
  userMessageBubble: {
    backgroundColor: "#FF9A56",
    borderBottomRightRadius: 5,
    shadowColor: "#000",
  },
  errorMessageBubble: {
    backgroundColor: "#ff6b6b",
    shadowColor: "#ff6b6b",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiMessageText: {
    color: "#2D2015",
  },
  userMessageText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  errorMessageText: {
    color: "#ffffff",
  },
  timestamp: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.7,
  },
  aiTimestamp: {
    color: "#8B7355",
  },
  userTimestamp: {
    color: "rgba(255,255,255,0.8)",
  },
  loadingContainer: {
    alignItems: "flex-start",
    marginVertical: 8,
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.04)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#8B7355",
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  textInput: {
    flex: 1,
    color: "#2D2015",
    fontSize: 16,
    maxHeight: 120,
    paddingVertical: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    overflow: "hidden", 
  },
  sendButtonTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  sendButtonText: {
    top : -2,
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
export default AIChatScreen;