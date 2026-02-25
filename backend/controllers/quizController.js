import geminiService from '../services/geminiService.js';
import sessionStore from '../utils/sessionStore.js';
import {
  calculateNextDifficulty,
  shouldEndQuiz,
  calculatePerformanceStats
} from '../utils/adaptiveAlgorithm.js';

/**
 * Generate next quiz question based on adaptive difficulty
 * POST /api/quiz/question
 * Body: { sessionId, moduleId, moduleTitle, topics }
 */
export async function generateQuestion(req, res) {
  try {
    const { sessionId = 'default', moduleId, moduleTitle, topics } = req.body;

    // Validate required fields
    if (!moduleId || !moduleTitle || !topics || !Array.isArray(topics)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: moduleId, moduleTitle, and topics array are required'
      });
    }

    // Get recent answers to calculate next difficulty
    const recentAnswers = sessionStore.getRecentAnswers(sessionId, moduleId, 3);
    const difficulty = calculateNextDifficulty(recentAnswers);

    console.log(`
❓ Generating ${difficulty} question for module: ${moduleTitle}`);
    console.log(`   Topics: ${topics.join(', ')}`);
    console.log(`   Session: ${sessionId}`);

    // Generate question using Gemini AI
    const question = await geminiService.generateQuestion(moduleTitle, topics, difficulty);

    console.log(`   Question ID: ${question.id}`);
    console.log(`   Options: ${question.options?.length || 0}\n`);

    // Store question metadata in session (for verification)
    const moduleProgress = sessionStore.getModuleProgress(sessionId, moduleId) || {};
    if (!moduleProgress.questionHistory) {
      moduleProgress.questionHistory = [];
    }
    moduleProgress.questionHistory.push({
      questionId: question.id,
      correctIndex: question.correctIndex,
      difficulty: question.difficulty,
      topic: question.topic,
      askedAt: new Date()
    });
    sessionStore.storeModuleProgress(sessionId, moduleId, moduleProgress);

    res.json({
      success: true,
      data: {
        question,
        currentDifficulty: difficulty,
        questionNumber: (recentAnswers.length || 0) + 1
      }
    });

  } catch (error) {
    console.error('Error in generateQuestion:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate question. Please try again.',
      details: error.message
    });
  }
}

/**
 * Evaluate answer and update progress
 * POST /api/quiz/evaluate
 * Body: { sessionId, moduleId, questionId, userAnswer }
 */
export async function evaluateAnswer(req, res) {
  try {
    const { sessionId = 'default', moduleId, questionId, userAnswer } = req.body;

    // Validate required fields
    if (!moduleId || !questionId || userAnswer === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: moduleId, questionId, and userAnswer are required'
      });
    }

    // Get module progress
    const moduleProgress = sessionStore.getModuleProgress(sessionId, moduleId);

    if (!moduleProgress || !moduleProgress.questionHistory) {
      return res.status(400).json({
        success: false,
        error: 'Module progress not found. Generate a question first.'
      });
    }

    // Find the question in history
    const questionData = moduleProgress.questionHistory.find(q => q.questionId === questionId);

    if (!questionData) {
      return res.status(404).json({
        success: false,
        error: 'Question not found in history'
      });
    }

    // Check if answer is correct
    const isCorrect = userAnswer === questionData.correctIndex;

    // Store answer in session
    sessionStore.addAnswer(sessionId, moduleId, {
      questionId,
      userAnswer,
      correctAnswer: questionData.correctIndex,
      correct: isCorrect,
      difficulty: questionData.difficulty,
      topic: questionData.topic
    });

    // Get all answers to check if quiz should end
    const allAnswers = sessionStore.getModuleProgress(sessionId, moduleId).answers || [];
    const quizStatus = shouldEndQuiz(allAnswers);

    // Calculate current stats
    const stats = calculatePerformanceStats(allAnswers);

    res.json({
      success: true,
      data: {
        isCorrect,
        correctAnswer: questionData.correctIndex,
        shouldEndQuiz: quizStatus.shouldEnd,
        endReason: quizStatus.reason,
        stats: {
          totalQuestions: stats.totalQuestions,
          correctAnswers: stats.correctAnswers,
          accuracy: stats.accuracy
        }
      }
    });

  } catch (error) {
    console.error('Error in evaluateAnswer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to evaluate answer',
      details: error.message
    });
  }
}

/**
 * Get module completion report
 * POST /api/quiz/report
 * Body: { sessionId, moduleId, moduleTitle }
 */
export async function getModuleReport(req, res) {
  try {
    const { sessionId = 'default', moduleId, moduleTitle } = req.body;

    if (!moduleId || !moduleTitle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: moduleId and moduleTitle are required'
      });
    }

    // Get module progress
    const moduleProgress = sessionStore.getModuleProgress(sessionId, moduleId);

    if (!moduleProgress || !moduleProgress.answers) {
      return res.status(400).json({
        success: false,
        error: 'No quiz data found for this module'
      });
    }

    // Calculate performance stats
    const stats = calculatePerformanceStats(moduleProgress.answers);

    // Calculate time spent (mock - in real app would track actual time)
    const timeSpent = Math.ceil(stats.totalQuestions * 1.5); // ~1.5 min per question

    // Generate AI report using Gemini
    const aiReport = await geminiService.generateModuleReport(
      { title: moduleTitle },
      { ...stats, timeSpent }
    );

    // Combine stats with AI insights
    const report = {
      ...stats,
      timeSpent,
      ...aiReport,
      completedAt: new Date()
    };

    // Mark module as completed in session
    moduleProgress.completed = true;
    moduleProgress.completedAt = new Date();
    moduleProgress.finalReport = report;
    sessionStore.storeModuleProgress(sessionId, moduleId, moduleProgress);

    res.json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Error in getModuleReport:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate module report',
      details: error.message
    });
  }
}

/**
 * Get module progress
 * GET /api/quiz/progress/:sessionId/:moduleId
 */
export async function getModuleProgress(req, res) {
  try {
    const { sessionId, moduleId } = req.params;

    const progress = sessionStore.getModuleProgress(sessionId, moduleId);

    if (!progress) {
      return res.json({
        success: true,
        data: null
      });
    }

    // Calculate current stats
    const stats = progress.answers ? calculatePerformanceStats(progress.answers) : null;

    res.json({
      success: true,
      data: {
        ...progress,
        stats
      }
    });

  } catch (error) {
    console.error('Error in getModuleProgress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve progress',
      details: error.message
    });
  }
}

export default {
  generateQuestion,
  evaluateAnswer,
  getModuleReport,
  getModuleProgress
};
