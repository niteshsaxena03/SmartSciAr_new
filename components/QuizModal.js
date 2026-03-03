import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function QuizModal({ visible, onClose, quizData, modelTitle }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Reset quiz state when modal opens
  React.useEffect(() => {
    if (visible) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setShowResults(false);
      setScore(0);
    }
  }, [visible]);

  if (!quizData || !quizData.questions) {
    return null;
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    // Save the answer
    const isCorrect =
      selectedAnswer === quizData.questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, { selected: selectedAnswer, isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage === 100) return "Perfect! 🌟";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Practicing! 📚";
  };

  // Results Screen
  if (showResults) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsContainer}
            >
              <Text style={styles.resultsTitle}>Quiz Complete!</Text>
              <Text style={styles.modelTitle}>{modelTitle}</Text>

              <View style={styles.scoreCard}>
                <LinearGradient
                  colors={["#FF9A56", "#FF6B6B"]}
                  style={styles.scoreGradient}
                >
                  <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
                  <Text style={styles.scoreText}>
                    {score} / {quizData.questions.length}
                  </Text>
                  <Text style={styles.scorePercentage}>
                    {Math.round((score / quizData.questions.length) * 100)}%
                  </Text>
                </LinearGradient>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewTitle}>Review Answers</Text>
                {quizData.questions.map((question, index) => (
                  <View key={question.id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewQuestionNumber}>
                        Q{index + 1}
                      </Text>
                      <View
                        style={[
                          styles.reviewBadge,
                          answers[index].isCorrect
                            ? styles.correctBadge
                            : styles.incorrectBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.reviewBadgeText,
                            answers[index].isCorrect
                              ? styles.correctBadgeText
                              : styles.incorrectBadgeText,
                          ]}
                        >
                          {answers[index].isCorrect ? "✓ Correct" : "✗ Wrong"}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.reviewQuestion}>{question.question}</Text>
                    <Text style={styles.reviewCorrectAnswer}>
                      Correct: {question.options[question.correctAnswer]}
                    </Text>
                    {!answers[index].isCorrect && (
                      <Text style={styles.reviewYourAnswer}>
                        Your answer: {question.options[answers[index].selected]}
                      </Text>
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.resultsButtonGroup}>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleRetry}
                >
                  <LinearGradient
                    colors={["#FF9A56", "#FF6B6B"]}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Retry Quiz</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeResultsButton} onPress={onClose}>
                  <Text style={styles.closeResultsButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // Quiz Questions Screen
  const question = quizData.questions[currentQuestion];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.quizContainer}
          >
            <Text style={styles.quizTitle}>Quiz</Text>
            <Text style={styles.modelTitle}>{modelTitle}</Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        ((currentQuestion + 1) / quizData.questions.length) * 100
                      }%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                Question {currentQuestion + 1} of {quizData.questions.length}
              </Text>
            </View>

            <View style={styles.questionCard}>
              <Text style={styles.questionNumber}>
                Question {currentQuestion + 1}
              </Text>
              <Text style={styles.questionText}>{question.question}</Text>
            </View>

            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.optionRadio,
                        selectedAnswer === index && styles.optionRadioSelected,
                      ]}
                    >
                      {selectedAnswer === index && (
                        <View style={styles.optionRadioInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        selectedAnswer === index && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !selectedAnswer && styles.nextButtonDisabled]}
              onPress={handleNext}
              disabled={selectedAnswer === null}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  selectedAnswer !== null
                    ? ["#FF9A56", "#FF6B6B"]
                    : ["#CCCCCC", "#BBBBBB"]
                }
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {currentQuestion === quizData.questions.length - 1
                    ? "Finish"
                    : "Next"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.93,
    maxHeight: height * 0.88,
    borderRadius: 24,
    padding: 22,
    backgroundColor: "#FFF8F0",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButtonText: {
    color: "#8B7355",
    fontSize: 18,
    fontWeight: "bold",
  },
  quizContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  quizTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#2D2015",
    textAlign: "center",
    marginBottom: 6,
  },
  modelTitle: {
    fontSize: 15,
    color: "#FF9A56",
    textAlign: "center",
    marginBottom: 22,
    fontWeight: "700",
  },
  progressContainer: {
    marginBottom: 22,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF9A56",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: "#8B7355",
    textAlign: "center",
    fontWeight: "600",
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 154, 86, 0.2)",
    shadowColor: "#FF9A56",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  questionNumber: {
    fontSize: 13,
    color: "#FF9A56",
    fontWeight: "700",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 17,
    color: "#2D2015",
    fontWeight: "600",
    lineHeight: 25,
  },
  optionsContainer: {
    marginBottom: 22,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.07)",
  },
  optionButtonSelected: {
    backgroundColor: "#FFF3E8",
    borderColor: "#FF9A56",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.15)",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionRadioSelected: {
    borderColor: "#FF9A56",
  },
  optionRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF9A56",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#4A3D2E",
    lineHeight: 21,
  },
  optionTextSelected: {
    fontWeight: "700",
    color: "#2D2015",
  },
  nextButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  resultsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  resultsTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#2D2015",
    textAlign: "center",
    marginBottom: 6,
  },
  scoreCard: {
    marginBottom: 26,
    borderRadius: 22,
    overflow: "hidden",
  },
  scoreGradient: {
    padding: 28,
    alignItems: "center",
    borderRadius: 22,
  },
  scoreMessage: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  scoreText: {
    fontSize: 46,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  scorePercentage: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  reviewSection: {
    marginBottom: 22,
  },
  reviewTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#2D2015",
    marginBottom: 14,
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewQuestionNumber: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FF9A56",
  },
  reviewBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctBadge: {
    backgroundColor: "#E8F5E9",
  },
  incorrectBadge: {
    backgroundColor: "#FFEBEE",
  },
  reviewBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  correctBadgeText: {
    color: "#2E7D32",
  },
  incorrectBadgeText: {
    color: "#C62828",
  },
  reviewQuestion: {
    fontSize: 14,
    color: "#4A3D2E",
    marginBottom: 8,
    fontWeight: "500",
    lineHeight: 20,
  },
  reviewCorrectAnswer: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "700",
  },
  reviewYourAnswer: {
    fontSize: 13,
    color: "#C62828",
    marginTop: 4,
    fontWeight: "500",
  },
  resultsButtonGroup: {
    gap: 10,
  },
  retryButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  closeResultsButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 15,
    borderWidth: 1.5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
  closeResultsButtonText: {
    color: "#8B7355",
    fontSize: 16,
    fontWeight: "700",
  },
});
