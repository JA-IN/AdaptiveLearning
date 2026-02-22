import geminiService from '../services/geminiService.js';
import sessionStore from '../utils/sessionStore.js';

/**
 * Generate personalized learning roadmap
 * POST /api/roadmap/generate
 * Body: { subject, goal, level, sessionId }
 */
export async function generateRoadmap(req, res) {
  try {
    const { subject, goal, level, sessionId = 'default' } = req.body;

    // Validate required fields
    if (!subject || !goal || !level) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: subject, goal, and level are required'
      });
    }

    console.log(`
🚀 Generating roadmap for: ${subject} | ${goal} | ${level}`);

    // Generate roadmap using Gemini AI
    const roadmapData = await geminiService.generateRoadmap(subject, goal, level);

    console.log(`📦 Roadmap generated successfully: ${roadmapData.roadmap?.title || 'Untitled'}`);
    console.log(`   Modules: ${roadmapData.roadmap?.totalModules || 0}`);
    console.log(`   Est. Hours: ${roadmapData.roadmap?.estimatedTotalHours || 0}`);
    console.log(`   Session: ${sessionId}`);
    console.log(`   Response size: ${JSON.stringify(roadmapData).length} bytes\n`);

    // Store roadmap in session
    sessionStore.storeRoadmap(sessionId, {
      ...roadmapData.roadmap,
      subject,
      goal,
      level,
      createdAt: new Date()
    });

    res.json({
      success: true,
      data: roadmapData.roadmap,
      sessionId
    });

  } catch (error) {
    console.error('Error in generateRoadmap:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate roadmap. Please try again.',
      details: error.message
    });
  }
}

/**
 * Get existing roadmap for a session
 * GET /api/roadmap/:sessionId
 */
export async function getRoadmap(req, res) {
  try {
    const { sessionId } = req.params;

    const roadmap = sessionStore.getRoadmap(sessionId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        error: 'Roadmap not found for this session'
      });
    }

    res.json({
      success: true,
      data: roadmap
    });

  } catch (error) {
    console.error('Error in getRoadmap:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve roadmap',
      details: error.message
    });
  }
}

/**
 * Generate study material for a module
 * POST /api/roadmap/study-material
 * Body: { moduleTitle, topics, subject }
 */
export async function generateStudyMaterial(req, res) {
  try {
    const { moduleTitle, topics, subject } = req.body;

    if (!moduleTitle || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: moduleTitle and subject are required'
      });
    }

    console.log(`\n📚 Generating study material for: ${moduleTitle} (${subject})`);

    const studyData = await geminiService.generateStudyMaterial(
      moduleTitle,
      topics || [],
      subject
    );

    console.log(`✅ Study material generated: ${studyData.sections?.length || 0} sections\n`);

    res.json({
      success: true,
      data: studyData
    });

  } catch (error) {
    console.error('Error in generateStudyMaterial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate study material. Please try again.',
      details: error.message
    });
  }
}

export default {
  generateRoadmap,
  getRoadmap,
  generateStudyMaterial
};
