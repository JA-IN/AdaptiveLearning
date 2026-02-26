/**
 * Rolling Window Algorithm for Adaptive Quiz Difficulty
 * Adjusts question difficulty based on recent performance (last 3 questions)
 */

/**
 * Calculate next difficulty level based on rolling window of recent answers
 * @param {array} recentAnswers - Array of recent answer objects with {correct: boolean, difficulty: string}
 * @param {number} windowSize - Size of rolling window (default: 3)
 * @returns {string} Next difficulty level: 'easy', 'medium', or 'hard'
 */
export function calculateNextDifficulty(recentAnswers, windowSize = 3) {
  // If no answers yet, start with medium
  if (!recentAnswers || recentAnswers.length === 0) {
    return 'medium';
  }

  // Get last N answers (rolling window)
  const window = recentAnswers.slice(-windowSize);

  // Calculate score: +1 for correct, -1 for incorrect
  const score = window.reduce((acc, answer) => {
    return acc + (answer.correct ? 1 : -1);
  }, 0);

  // Adjust difficulty based on score
  if (score >= 2) {
    return 'hard'; // User is doing well, increase difficulty
  } else if (score <= -2) {
    return 'easy'; // User is struggling, decrease difficulty
  } else {
    return 'medium'; // Keep medium difficulty
  }
}

/**
 * Determine if quiz should end based on performance
 * @param {array} allAnswers - All answers for the current module
 * @param {number} minQuestions - Minimum questions before checking (default: 10)
 * @param {number} maxQuestions - Maximum questions allowed (default: 20)
 * @returns {object} { shouldEnd: boolean, reason: string }
 */
export function shouldEndQuiz(allAnswers, minQuestions = 5, maxQuestions = 10) {
  const totalQuestions = allAnswers.length;

  // Must answer at least minimum questions
  if (totalQuestions < minQuestions) {
    return { shouldEnd: false, reason: 'minimum_not_reached' };
  }

  // Force end if max questions reached
  if (totalQuestions >= maxQuestions) {
    return { shouldEnd: true, reason: 'max_questions_reached' };
  }

  // Calculate accuracy
  const correctAnswers = allAnswers.filter(a => a.correct).length;
  const accuracy = (correctAnswers / totalQuestions) * 100;

  // End if accuracy >= 70% after minimum questions
  if (accuracy >= 70) {
    return { shouldEnd: true, reason: 'target_accuracy_reached' };
  }

  // End if accuracy >= 80% in first 10 questions
  if (totalQuestions === 10 && accuracy >= 80) {
    return { shouldEnd: true, reason: 'early_mastery' };
  }

  return { shouldEnd: false, reason: 'continue' };
}

/**
 * Calculate performance statistics
 * @param {array} answers - All answers for analysis
 * @returns {object} Performance statistics
 */
export function calculatePerformanceStats(answers) {
  if (!answers || answers.length === 0) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 0,
      difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
      topicPerformance: {}
    };
  }

  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(a => a.correct).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  // Difficulty breakdown
  const difficultyBreakdown = {
    easy: { total: 0, correct: 0 },
    medium: { total: 0, correct: 0 },
    hard: { total: 0, correct: 0 }
  };

  // Topic performance
  const topicPerformance = {};

  answers.forEach(answer => {
    // Difficulty stats
    if (answer.difficulty) {
      difficultyBreakdown[answer.difficulty].total++;
      if (answer.correct) {
        difficultyBreakdown[answer.difficulty].correct++;
      }
    }

    // Topic stats
    if (answer.topic) {
      if (!topicPerformance[answer.topic]) {
        topicPerformance[answer.topic] = { total: 0, correct: 0 };
      }
      topicPerformance[answer.topic].total++;
      if (answer.correct) {
        topicPerformance[answer.topic].correct++;
      }
    }
  });

  // Calculate accuracy per difficulty
  Object.keys(difficultyBreakdown).forEach(key => {
    const data = difficultyBreakdown[key];
    data.accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
  });

  // Calculate accuracy per topic
  Object.keys(topicPerformance).forEach(key => {
    const data = topicPerformance[key];
    data.accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
  });

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    difficultyBreakdown,
    topicPerformance
  };
}

/**
 * Get strengths and weaknesses based on performance
 * @param {object} stats - Performance statistics from calculatePerformanceStats
 * @returns {object} { strengths: array, weaknesses: array }
 */
export function identifyStrengthsWeaknesses(stats) {
  const strengths = [];
  const weaknesses = [];

  // Check overall accuracy
  if (stats.accuracy >= 80) {
    strengths.push('Excellent overall understanding');
  } else if (stats.accuracy < 60) {
    weaknesses.push('Needs improvement in foundational concepts');
  }

  // Check difficulty performance
  const { difficultyBreakdown } = stats;
  if (difficultyBreakdown.hard.total > 0 && difficultyBreakdown.hard.accuracy >= 70) {
    strengths.push('Strong grasp of advanced concepts');
  }
  if (difficultyBreakdown.easy.total > 0 && difficultyBreakdown.easy.accuracy < 70) {
    weaknesses.push('Needs to strengthen basic fundamentals');
  }

  // Check topic performance
  Object.entries(stats.topicPerformance).forEach(([topic, data]) => {
    if (data.accuracy >= 80) {
      strengths.push(`Strong in ${topic}`);
    } else if (data.accuracy < 60) {
      weaknesses.push(`Needs practice in ${topic}`);
    }
  });

  return { strengths, weaknesses };
}

export default {
  calculateNextDifficulty,
  shouldEndQuiz,
  calculatePerformanceStats,
  identifyStrengthsWeaknesses
};
