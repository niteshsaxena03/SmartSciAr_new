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
          <LinearGradient
            colors={["#0D1322", "#0A1B36", "#042D45"]}
            style={styles.modalContent}
          >
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsContainer}
            >
              <Text style={styles.resultsTitle}>Quiz Complete!</Text>
              <Text style={styles.modelTitle}>{modelTitle}</Text>

              {/* Score Display */}
              <View style={styles.scoreCard}>
                <LinearGradient
                  colors={["#4895EF", "#4361EE"]}
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

              {/* Answer Review */}
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
                        <Text style={styles.reviewBadgeText}>
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

              {/* Action Buttons */}
              <View style={styles.resultsButtonGroup}>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleRetry}
                >
                  <LinearGradient
                    colors={["#4895EF", "#4361EE"]}
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
          </LinearGradient>
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
        <LinearGradient
          colors={["#0D1322", "#0A1B36", "#042D45"]}
          style={styles.modalContent}
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.quizContainer}
          >
            {/* Header */}
            <Text style={styles.quizTitle}>Quiz</Text>
            <Text style={styles.modelTitle}>{modelTitle}</Text>

            {/* Progress */}
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

            {/* Question Card */}
            <View style={styles.questionCard}>
              <Text style={styles.questionNumber}>
                Question {currentQuestion + 1}
              </Text>
              <Text style={styles.questionText}>{question.question}</Text>
            </View>

            {/* Options */}
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

            {/* Next Button */}
            <TouchableOpacity
              style={[styles.nextButton, !selectedAnswer && styles.nextButtonDisabled]}
              onPress={handleNext}
              disabled={selectedAnswer === null}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  selectedAnswer !== null
                    ? ["#1FCFA6", "#19A485"]
                    : ["#555", "#444"]
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
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.95,
    maxHeight: height * 0.9,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButtonText: {
    color: "#E0E1DD",
    fontSize: 20,
    fontWeight: "bold",
  },
  quizContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  quizTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  modelTitle: {
    fontSize: 16,
    color: "#4CC9F0",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4895EF",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#E0E1DD",
    textAlign: "center",
    opacity: 0.8,
  },
  questionCard: {
    backgroundColor: "rgba(72, 149, 239, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(72, 149, 239, 0.3)",
  },
  questionNumber: {
    fontSize: 14,
    color: "#4CC9F0",
    fontWeight: "600",
    marginBottom: 12,
  },
  questionText: {
    fontSize: 18,
    color: "#E0E1DD",
    fontWeight: "600",
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  optionButtonSelected: {
    backgroundColor: "rgba(72, 149, 239, 0.2)",
    borderColor: "#4895EF",
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
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionRadioSelected: {
    borderColor: "#4895EF",
  },
  optionRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4895EF",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#E0E1DD",
    lineHeight: 22,
  },
  optionTextSelected: {
    fontWeight: "600",
  },
  nextButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Results Styles
  resultsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  scoreCard: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  scoreGradient: {
    padding: 30,
    alignItems: "center",
  },
  scoreMessage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  scorePercentage: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  reviewSection: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E0E1DD",
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewQuestionNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4CC9F0",
  },
  reviewBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctBadge: {
    backgroundColor: "rgba(31, 207, 166, 0.2)",
  },
  incorrectBadge: {
    backgroundColor: "rgba(255, 107, 107, 0.2)",
  },
  reviewBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E0E1DD",
  },
  reviewQuestion: {
    fontSize: 15,
    color: "#E0E1DD",
    marginBottom: 8,
    fontWeight: "500",
  },
  reviewCorrectAnswer: {
    fontSize: 14,
    color: "#1FCFA6",
    fontWeight: "600",
  },
  reviewYourAnswer: {
    fontSize: 14,
    color: "#FF6B6B",
    marginTop: 4,
  },
  resultsButtonGroup: {
    gap: 12,
  },
  retryButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 12,
  },
  closeResultsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
  },
  closeResultsButtonText: {
    color: "#E0E1DD",
    fontSize: 16,
    fontWeight: "bold",
  },
});
