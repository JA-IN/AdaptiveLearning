import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import ProgressNavigationBar from "../../components/ui/ProgressNavigationBar";
import LearningContextBreadcrumb from "../../components/ui/LearningContextBreadcrumb";
import QuizHeader from "./components/QuizHeader";
import QuestionCard from "./components/QuestionCard";
import QuizControls from "./components/QuizControls";
import AdaptiveFeedback from "./components/AdaptiveFeedback";
import QuizSidebar from "./components/QuizSidebar";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import { generateQuestion, evaluateAnswer } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { userService } from "../../services/userService";

const ModuleQuizInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get module data from navigation state, localStorage, or use default
  const getModuleData = () => {
    // First: navigation state (from roadmap page)
    if (location?.state?.module) return location.state.module;

    // Second: localStorage (saved by roadmap page handleModuleStart)
    try {
      const saved = localStorage.getItem("Nayi Disha_current_module");
      if (saved) return JSON.parse(saved);
    } catch (e) { }

    // Last resort: hardcoded default
    return {
      id: 2,
      title: "DOM Manipulation",
      description: "Learn to interact with HTML elements using JavaScript",
      difficultyLevel: "intermediate",
      totalQuestions: 15,
      topics: ["Element Selection", "Event Handling", "Dynamic Content"],
    };
  };
  const moduleData = getModuleData();

  // Quiz state management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [rollingWindow, setRollingWindow] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState("medium");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [error, setError] = useState(null);

  // Store questions as they come from backend
  const [questions, setQuestions] = useState([]);

  // Fallback mock questions (only used if API fails)
  const mockQuestions = [
    {
      id: 1,
      number: 1,
      text: "What method is used to select an element by its ID in JavaScript?",
      topic: "Element Selection",
      difficulty: "easy",
      codeExample: `// Select element with ID 'myButton'\nconst button = ?`,
      options: [
        { id: "a", label: "A", text: 'document.getElementById("myButton")' },
        { id: "b", label: "B", text: 'document.querySelector("#myButton")' },
        { id: "c", label: "C", text: 'document.getElementByClass("myButton")' },
        { id: "d", label: "D", text: "Both A and B are correct" },
      ],
      correctAnswer: "d",
      explanation:
        "Both getElementById() and querySelector() with # selector can be used to select elements by ID. getElementById() is more specific and slightly faster, while querySelector() is more flexible.",
    },
    {
      id: 2,
      number: 2,
      text: "Which event listener method allows you to remove the event later?",
      topic: "Event Handling",
      difficulty: "medium",
      context:
        "Consider scenarios where you need to clean up event listeners to prevent memory leaks.",
      options: [
        { id: "a", label: "A", text: "onclick property" },
        { id: "b", label: "B", text: "addEventListener()" },
        { id: "c", label: "C", text: "attachEvent()" },
        { id: "d", label: "D", text: "onEvent() method" },
      ],
      correctAnswer: "b",
      explanation:
        "addEventListener() paired with removeEventListener() allows you to add and remove event listeners. This is crucial for preventing memory leaks in dynamic applications.",
    },
    {
      id: 3,
      number: 3,
      text: "What is the difference between innerHTML and textContent?",
      topic: "Dynamic Content",
      difficulty: "medium",
      codeExample: `const div = document.querySelector('div');\ndiv.innerHTML = '<span>Hello</span>';\ndiv.textContent = '<span>Hello</span>';`,
      options: [
        {
          id: "a",
          label: "A",
          text: "innerHTML parses HTML, textContent treats everything as plain text",
        },
        { id: "b", label: "B", text: "textContent is faster than innerHTML" },
        {
          id: "c",
          label: "C",
          text: "innerHTML is more secure than textContent",
        },
        { id: "d", label: "D", text: "Both A and B are correct" },
      ],
      correctAnswer: "d",
      explanation:
        "innerHTML parses and renders HTML tags, while textContent treats everything as plain text. textContent is also generally faster and safer against XSS attacks.",
    },
    {
      id: 4,
      number: 4,
      text: "How do you prevent the default behavior of an event?",
      topic: "Event Handling",
      difficulty: "easy",
      options: [
        { id: "a", label: "A", text: "event.preventDefault()" },
        { id: "b", label: "B", text: "event.stopPropagation()" },
        { id: "c", label: "C", text: "return false" },
        { id: "d", label: "D", text: "event.cancel()" },
      ],
      correctAnswer: "a",
      explanation:
        "event.preventDefault() prevents the default action of an event from occurring, such as preventing a form submission or link navigation.",
    },
    {
      id: 5,
      number: 5,
      text: "Which method creates a new element in the DOM?",
      topic: "Element Creation",
      difficulty: "easy",
      options: [
        { id: "a", label: "A", text: "document.createElement()" },
        { id: "b", label: "B", text: "document.newElement()" },
        { id: "c", label: "C", text: "document.addElement()" },
        { id: "d", label: "D", text: "document.makeElement()" },
      ],
      correctAnswer: "a",
      explanation:
        "document.createElement() creates a new HTML element that can then be configured and added to the DOM using methods like appendChild().",
    },
  ];

  // Load first question on mount
  useEffect(() => {
    if (!currentQuestion && questions.length === 0) {
      loadNextQuestion();
    }
  }, []);

  // Load next question from backend
  const loadNextQuestion = async () => {
    setLoadingQuestion(true);
    setError(null);

    try {
      // Extract topics from various module data shapes:
      // AI roadmap modules have 'topics', fallback modules have 'keyConcepts'
      const topics = (moduleData.topics && moduleData.topics.length > 0)
        ? moduleData.topics
        : (moduleData.keyConcepts && moduleData.keyConcepts.length > 0)
          ? moduleData.keyConcepts
          : (moduleData.learningObjectives && moduleData.learningObjectives.length > 0)
            ? moduleData.learningObjectives
            : [moduleData.title];

      // Ensure moduleId is a string for consistency
      const moduleId = String(moduleData.id);

      console.log("Requesting question for:", {
        moduleId,
        title: moduleData.title,
        topics,
      });

      // Add a timeout to prevent hanging when Gemini API is slow
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out after 30 seconds")), 30000)
      );

      const response = await Promise.race([
        generateQuestion(moduleId, moduleData.title, topics),
        timeoutPromise
      ]);

      console.log("Full API response:", response);

      // Handle different response structures
      const questionData = response.data || response;
      console.log("Question data extracted:", questionData);

      // Validate response structure
      if (!questionData) {
        throw new Error("No question data received");
      }

      // Handle nested question object structure
      const questionInfo = questionData.question || questionData;

      if (!questionInfo.options || !Array.isArray(questionInfo.options)) {
        console.error("Invalid options:", questionInfo.options);
        throw new Error(
          "Invalid question data structure - options missing or not an array"
        );
      }

      // Transform backend response to match component format
      const formattedQuestion = {
        id: questionInfo.id || questionData.id || `q-${Date.now()}`,
        number: questions.length + 1,
        text: questionInfo.question || "Question text missing",
        topic: questionInfo.topic || "General",
        difficulty: questionInfo.difficulty || questionData.currentDifficulty || "medium",
        options: questionInfo.options.map((opt, idx) => ({
          id: String.fromCharCode(97 + idx), // a, b, c, d
          label: String.fromCharCode(65 + idx), // A, B, C, D
          text: opt,
        })),
        explanation: questionInfo.explanation || "No explanation provided",
        correctAnswer: String.fromCharCode(
          97 + (questionInfo.correctIndex || 0)
        ),
      };

      setCurrentQuestion(formattedQuestion);
      setQuestions((prev) => [...prev, formattedQuestion]);
      setQuestionStartTime(Date.now());
    } catch (err) {
      console.error("Error loading question:", err);
      setError(err.message === "Request timed out after 30 seconds"
        ? "Question generation timed out. Please try again."
        : "Failed to load question. Using fallback.");
      // Use mock question as fallback
      if (mockQuestions[questions.length]) {
        const fallbackQ = mockQuestions[questions.length];
        setCurrentQuestion(fallbackQ);
        setQuestions((prev) => [...prev, fallbackQ]);
      }
    } finally {
      setLoadingQuestion(false);
    }
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(
      `quiz_progress_${moduleData?.id}`
    );
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentQuestionIndex(progress?.currentQuestionIndex || 0);
      setCompletedQuestions(progress?.completedQuestions || []);
      setTimeElapsed(progress?.timeElapsed || 0);
      setStreakCount(progress?.streakCount || 0);
      setRollingWindow(progress?.rollingWindow || []);
      setCurrentDifficulty(progress?.currentDifficulty || "medium");
    }
  }, [moduleData?.id]);

  // Save progress to localStorage
  const saveProgress = () => {
    const progress = {
      currentQuestionIndex,
      completedQuestions,
      timeElapsed,
      streakCount,
      rollingWindow,
      currentDifficulty,
      lastUpdated: new Date()?.toISOString(),
    };
    localStorage.setItem(
      `quiz_progress_${moduleData?.id}`,
      JSON.stringify(progress)
    );
  };

  // Calculate current accuracy
  const calculateAccuracy = () => {
    if (completedQuestions?.length === 0) return 0;
    const correct = completedQuestions?.filter((q) => q?.isCorrect)?.length;
    return (correct / completedQuestions?.length) * 100;
  };

  // Adaptive difficulty algorithm using rolling window
  const updateDifficulty = (isCorrect) => {
    const newWindow = [...rollingWindow, isCorrect]?.slice(-3); // Keep last 3 answers
    setRollingWindow(newWindow);

    if (newWindow?.length >= 3) {
      const correctCount = newWindow?.filter(Boolean)?.length;

      if (correctCount >= 3) {
        setCurrentDifficulty("hard");
        return "increased";
      } else if (correctCount <= 1) {
        setCurrentDifficulty("easy");
        return "decreased";
      } else {
        setCurrentDifficulty("medium");
        return "maintained";
      }
    }
    return null;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerId) => {
    if (!isSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || isSubmitted || !currentQuestion) return;

    setIsLoading(true);

    try {
      // Call backend to evaluate answer
      const answerIndex = selectedAnswer.charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
      const evaluation = await evaluateAnswer(
        moduleData.id,
        currentQuestion.id,
        answerIndex
      );

      const isCorrect = evaluation.isCorrect;
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      // Update streak
      if (isCorrect) {
        setStreakCount((prev) => prev + 1);
      } else {
        setStreakCount(0);
      }

      // Update difficulty based on backend response
      const difficultyChange = updateDifficulty(isCorrect);

      // Record completed question
      const questionResult = {
        questionId: currentQuestion?.id,
        selectedAnswer,
        correctAnswer: currentQuestion?.correctAnswer,
        isCorrect,
        timeSpent,
        difficulty: currentQuestion?.difficulty,
      };

      setCompletedQuestions((prev) => [...prev, questionResult]);
      setIsSubmitted(true);

      // Check if quiz should end based on backend response
      if (evaluation.shouldEndQuiz) {
        console.log("Quiz completed:", evaluation.endReason);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      // Fallback to local evaluation
      const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      if (isCorrect) setStreakCount((prev) => prev + 1);
      else setStreakCount(0);

      const difficultyChange = updateDifficulty(isCorrect);

      setCompletedQuestions((prev) => [
        ...prev,
        {
          questionId: currentQuestion?.id,
          selectedAnswer,
          correctAnswer: currentQuestion?.correctAnswer,
          isCorrect,
          timeSpent,
          difficulty: currentQuestion?.difficulty,
        },
      ]);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }

    // Show feedback (moved outside try-catch)
    const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
    setFeedbackData({
      isCorrect,
      streakCount: isCorrect ? streakCount + 1 : 0,
      difficultyChange: null,
      accuracy: calculateAccuracy(),
    });
    setShowFeedback(true);

    // Save progress
    saveProgress();
  };

  // Handle next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowHint(false);
    setShowFeedback(false);
    saveProgress();

    // Load next question from backend
    loadNextQuestion();
  };

  // Handle quiz completion
  const handleFinishQuiz = async () => {
    const finalAccuracy = calculateAccuracy();
    const totalTime = timeElapsed;

    // Save final results
    const quizResults = {
      moduleId: moduleData?.id,
      moduleTitle: moduleData?.title,
      completedQuestions,
      finalAccuracy,
      totalTime,
      completedAt: new Date()?.toISOString(),
      passed: finalAccuracy >= 70,
    };

    localStorage.setItem(
      `quiz_results_${moduleData?.id}`,
      JSON.stringify(quizResults)
    );

    // Save to database if user is logged in
    if (user && finalAccuracy >= 70) {
      try {
        await userService.updateModuleProgress(user.uid, moduleData?.id, {
          quizScore: finalAccuracy,
          currentModule: null // Clear current module since it's completed
        });
        console.log('Module progress saved to database');
      } catch (error) {
        console.error('Error saving module progress:', error);
        // Continue even if DB save fails
      }
    }

    // Navigate to results or roadmap
    navigate("/ai-generated-roadmap", {
      state: {
        quizCompleted: true,
        results: quizResults,
      },
    });
  };

  // Handle exit quiz
  const handleExitQuiz = () => {
    if (completedQuestions?.length > 0) {
      const confirmExit = window.confirm(
        "Are you sure you want to exit? Your progress will be saved."
      );
      if (!confirmExit) return;
    }

    saveProgress();
    navigate("/ai-generated-roadmap");
  };

  // Handle question jump (for completed questions)
  const handleQuestionJump = (questionIndex) => {
    if (questionIndex < currentQuestionIndex) {
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(
        completedQuestions?.[questionIndex]?.selectedAnswer || null
      );
      setIsSubmitted(true);
      setShowHint(false);
    }
  };

  // Use the current loaded question
  const isLastQuestion =
    completedQuestions?.length >= 20 ||
    (completedQuestions?.length >= 10 && calculateAccuracy() >= 70);
  const accuracy = calculateAccuracy();

  // Learning context for breadcrumb
  const learningContext = {
    technology: "JavaScript",
    goal: "Full Stack Development",
    module: {
      name: moduleData?.title,
      id: moduleData?.id,
      totalQuestions: questions?.length,
    },
    currentQuestion: {
      number: completedQuestions?.length + 1,
      topic: currentQuestion?.topic,
    },
    difficulty: currentQuestion?.difficulty,
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom,_#000000_0%,_rgba(74,26,125,0.5)_0.1%,_#000000_70%)]">
      <Header />
      <ProgressNavigationBar
        isVisible={true}
        currentModule={{
          title: moduleData?.title,
          questionProgress: {
            current: completedQuestions?.length + 1,
            total: 20, // Max questions
          },
        }}
        overallProgress={(completedQuestions?.length / 20) * 100}
        totalModules={1}
      />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Learning Context Breadcrumb */}
          <LearningContextBreadcrumb
            context={learningContext}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quiz Header */}
              <QuizHeader
                moduleTitle={moduleData?.title}
                currentQuestion={completedQuestions?.length + 1}
                totalQuestions={20}
                timeElapsed={timeElapsed}
                onExitQuiz={handleExitQuiz}
              />

              {/* Question Card or Loading */}
              {loadingQuestion ? (
                <div className="glass-card rounded-lg p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse neon-glow">
                    <Icon name="Sparkles" size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient mb-2">
                    Generating Next Question...
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI is adapting the difficulty based on your performance
                  </p>
                </div>
              ) : error ? (
                <div className="glass-card rounded-lg p-8 text-center border border-warning/20">
                  <Icon
                    name="AlertCircle"
                    size={32}
                    className="text-warning mx-auto mb-4"
                  />
                  <p className="text-sm text-muted-foreground mb-4">{error}</p>
                  <Button
                    variant="outline"
                    onClick={loadNextQuestion}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Retry
                  </Button>
                </div>
              ) : currentQuestion ? (
                <QuestionCard
                  question={currentQuestion}
                  onAnswerSelect={handleAnswerSelect}
                  selectedAnswer={selectedAnswer}
                  showFeedback={showFeedback}
                  isSubmitted={isSubmitted}
                />
              ) : null}

              {/* Quiz Controls */}
              <QuizControls
                selectedAnswer={selectedAnswer}
                isSubmitted={isSubmitted}
                isLastQuestion={isLastQuestion}
                isLoading={isLoading}
                onSubmitAnswer={handleSubmitAnswer}
                onNextQuestion={handleNextQuestion}
                onFinishQuiz={handleFinishQuiz}
                showHint={showHint}
                onToggleHint={() => setShowHint(!showHint)}
              />

              {/* Hint Section */}
              {showHint && currentQuestion && (
                <div className="glass-card border border-purple-500/20 rounded-lg p-4 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Lightbulb" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">
                      Hint
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Think about the most commonly used methods for DOM
                    manipulation. Consider both traditional and modern
                    approaches.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <QuizSidebar
                  questions={questions}
                  currentQuestionIndex={completedQuestions?.length}
                  completedQuestions={completedQuestions}
                  accuracy={accuracy}
                  timeElapsed={timeElapsed}
                  isCollapsed={sidebarCollapsed}
                  onToggleCollapse={() =>
                    setSidebarCollapsed(!sidebarCollapsed)
                  }
                  onQuestionJump={handleQuestionJump}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Adaptive Feedback Modal */}
      <AdaptiveFeedback
        isVisible={showFeedback}
        isCorrect={feedbackData?.isCorrect}
        streakCount={feedbackData?.streakCount}
        difficultyChange={feedbackData?.difficultyChange}
        accuracy={feedbackData?.accuracy}
        onClose={() => setShowFeedback(false)}
        autoCloseDelay={3000}
      />
      {/* Mobile Quiz Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-purple-500/20">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
            className="hover:bg-white/5"
          >
            Progress
          </Button>

          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {completedQuestions?.length + 1} / 20
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(accuracy)}% accuracy
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExitQuiz}
            iconName="X"
            className="hover:bg-white/5 text-muted-foreground hover:text-error"
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleQuizInterface;
