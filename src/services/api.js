/**
 * API Service for Nayi Disha Frontend
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://adaptivelearning-vhgp.onrender.com/api';

// Get session ID from localStorage or create new one
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============== ROADMAP API ==============

/**
 * Generate personalized learning roadmap
 * @param {string} subject - Learning subject (JavaScript, React, Python, Node.js)
 * @param {string} goal - Learning goal
 * @param {string} level - Skill level (Basic, Intermediate, Advanced)
 * @returns {Promise<object>} Generated roadmap data
 */
export async function generateRoadmap(subject, goal, level) {
  const sessionId = getSessionId();

  const response = await fetchAPI('/roadmap/generate', {
    method: 'POST',
    body: JSON.stringify({ subject, goal, level, sessionId }),
  });

  // Store roadmap in localStorage as backup
  if (response.success) {
    localStorage.setItem('roadmap', JSON.stringify(response.data));
    localStorage.setItem('roadmapMeta', JSON.stringify({ subject, goal, level }));
  }

  return response.data;
}

/**
 * Get existing roadmap for current session
 * @returns {Promise<object|null>} Roadmap data or null
 */
export async function getRoadmap() {
  const sessionId = getSessionId();

  try {
    const response = await fetchAPI(`/roadmap/${sessionId}`);
    return response.data;
  } catch (error) {
    // If API fails, try localStorage
    const cached = localStorage.getItem('roadmap');
    return cached ? JSON.parse(cached) : null;
  }
}

// ============== QUIZ API ==============

/**
 * Generate next quiz question
 * @param {string} moduleId - Module identifier
 * @param {string} moduleTitle - Module title
 * @param {array} topics - Array of topics for the module
 * @returns {Promise<object>} Question data
 */
export async function generateQuestion(moduleId, moduleTitle, topics) {
  const sessionId = getSessionId();

  const response = await fetchAPI('/quiz/question', {
    method: 'POST',
    body: JSON.stringify({ sessionId, moduleId, moduleTitle, topics }),
  });

  return response.data;
}

/**
 * Evaluate user's answer
 * @param {string} moduleId - Module identifier
 * @param {string} questionId - Question identifier
 * @param {number} userAnswer - User's selected answer index (0-3)
 * @returns {Promise<object>} Evaluation result with correctness and stats
 */
export async function evaluateAnswer(moduleId, questionId, userAnswer) {
  const sessionId = getSessionId();

  const response = await fetchAPI('/quiz/evaluate', {
    method: 'POST',
    body: JSON.stringify({ sessionId, moduleId, questionId, userAnswer }),
  });

  return response.data;
}

/**
 * Get module completion report
 * @param {string} moduleId - Module identifier
 * @param {string} moduleTitle - Module title
 * @returns {Promise<object>} Completion report with insights
 */
export async function getModuleReport(moduleId, moduleTitle) {
  const sessionId = getSessionId();

  const response = await fetchAPI('/quiz/report', {
    method: 'POST',
    body: JSON.stringify({ sessionId, moduleId, moduleTitle }),
  });

  return response.data;
}

/**
 * Get current module progress
 * @param {string} moduleId - Module identifier
 * @returns {Promise<object|null>} Progress data or null
 */
export async function getModuleProgress(moduleId) {
  const sessionId = getSessionId();

  const response = await fetchAPI(`/quiz/progress/${sessionId}/${moduleId}`);
  return response.data;
}

// ============== STUDY MATERIAL API ==============

/**
 * Generate study material for a module
 * @param {string} moduleTitle - Module title
 * @param {array} topics - Array of topics for the module
 * @param {string} subject - The learning subject
 * @returns {Promise<object>} Study material data
 */
export async function generateStudyMaterial(moduleTitle, topics, subject) {
  const response = await fetchAPI('/roadmap/study-material', {
    method: 'POST',
    body: JSON.stringify({ moduleTitle, topics, subject }),
  });

  return response.data;
}

// ============== UTILITY FUNCTIONS ==============

/**
 * Health check - verify backend is running
 * @returns {Promise<boolean>} True if backend is healthy
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

/**
 * Clear current session data
 */
export function clearSession() {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('roadmap');
  localStorage.removeItem('roadmapMeta');
}

/**
 * Get current session info
 * @returns {object} Session information
 */
export function getSessionInfo() {
  return {
    sessionId: getSessionId(),
    roadmapMeta: JSON.parse(localStorage.getItem('roadmapMeta') || 'null'),
  };
}

export default {
  generateRoadmap,
  getRoadmap,
  generateQuestion,
  evaluateAnswer,
  getModuleReport,
  getModuleProgress,
  generateStudyMaterial,
  checkBackendHealth,
  clearSession,
  getSessionInfo,
};
