import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Gemini AI Service for generating roadmaps and quiz questions
 */
class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Extract and clean JSON from Gemini response
   * Handles markdown code blocks, nested code snippets, and malformed JSON
   * @param {string} response - Raw response from Gemini
   * @returns {string} Cleaned JSON string ready for parsing
   */
  extractJSON(response) {
    let jsonText = response.trim();

    // Try to extract JSON from markdown code blocks
    // Match: ```json ... ```, ```javascript ... ```, or ``` ... ```
    const codeBlockMatch = jsonText.match(/```(?:json|javascript)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1].trim();
    }

    // Find the actual JSON object boundaries
    const jsonStart = jsonText.indexOf('{');
    const jsonEnd = jsonText.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON object found in response');
    }

    jsonText = jsonText.substring(jsonStart, jsonEnd + 1);

    // Handle common JSON issues when code snippets are embedded
    // Replace unescaped newlines in strings (common when code is embedded)
    try {
      // First attempt: try parsing as-is
      JSON.parse(jsonText);
      return jsonText;
    } catch (error) {
      // If parsing fails, try to fix common issues
      console.log('⚠️  Initial parse failed, attempting to fix JSON...');

      // Strategy: re-parse with more aggressive cleaning
      // Replace literal newlines within string values with escaped newlines
      // This is a simplified approach - for production, consider using a proper JSON repair library

      try {
        // Attempt to use regex to fix unescaped newlines in strings
        // This regex finds string values and escapes newlines within them
        const fixedJson = jsonText.replace(
          /"([^"]*(?:\\.[^"]*)*)"/g,
          (match, content) => {
            // Escape unescaped newlines and tabs
            const fixed = content
              .replace(/(?<!\\)\n/g, '\\n')
              .replace(/(?<!\\)\r/g, '\\r')
              .replace(/(?<!\\)\t/g, '\\t');
            return `"${fixed}"`;
          }
        );

        JSON.parse(fixedJson);
        console.log('✅ JSON successfully repaired');
        return fixedJson;
      } catch (fixError) {
        console.error('Failed to repair JSON:', fixError.message);
        throw error; // Throw original error
      }
    }
  }

  /**
   * Generate a personalized learning roadmap
   * @param {string} subject - Learning subject (JavaScript, React, Python, Node.js)
   * @param {string} goal - Learning goal (Web Dev, DSA, Full-Stack, etc.)
   * @param {string} level - Skill level (Basic, Intermediate, Advanced)
   * @returns {Promise<object>} Structured roadmap with modules
   */
  async generateRoadmap(subject, goal, level) {
    const prompt = `You are an expert learning path designer. Create a detailed learning roadmap for:

Subject: ${subject}
Goal: ${goal}
Level: ${level}

Generate a structured JSON roadmap with 8-12 modules. Each module should have:
- id: unique identifier (module-1, module-2, etc.)
- title: concise module name
- description: 2-3 sentences explaining what the learner will master
- estimatedHours: realistic time estimate (1-8 hours)
- topics: array of 3-5 key topics covered
- difficulty: one of ["easy", "medium", "hard"]

Return ONLY valid JSON in this exact format:
{
  "roadmap": {
    "title": "Complete roadmap title",
    "description": "Brief overview of the learning journey",
    "totalModules": 10,
    "estimatedTotalHours": 45,
    "modules": [
      {
        "id": "module-1",
        "title": "Module Title",
        "description": "Module description",
        "estimatedHours": 4,
        "topics": ["topic1", "topic2", "topic3"],
        "difficulty": "easy"
      }
    ]
  }
}`;

    let response;
    try {
      const result = await this.model.generateContent(prompt);
      response = result.response.text();

      console.log('\n📋 Gemini Roadmap Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 500) + (response.length > 500 ? '...' : ''));
      console.log('─'.repeat(80));

      // Extract and clean JSON from response
      const jsonText = this.extractJSON(response);

      const parsedData = JSON.parse(jsonText);

      console.log('\n✅ Successfully parsed roadmap with', parsedData.roadmap?.modules?.length || 0, 'modules\n');

      return parsedData;
    } catch (error) {
      console.error('\n❌ Error generating roadmap:', error.message);
      if (response) {
        console.error('Response that failed to parse:', response.substring(0, 500));
      }
      throw new Error('Failed to generate roadmap from AI');
    }
  }

  /**
   * Generate an adaptive quiz question
   * @param {string} moduleTitle - Current module title
   * @param {array} topics - Array of topics for the module
   * @param {string} difficulty - Question difficulty (easy, medium, hard)
   * @returns {Promise<object>} Quiz question with options and explanation
   */
  async generateQuestion(moduleTitle, topics, difficulty, retryCount = 0) {
    const maxRetries = 2;
    const difficultyGuidance = {
      easy: 'Basic understanding, recall, and simple application',
      medium: 'Practical application, problem-solving, and concept integration',
      hard: 'Advanced analysis, edge cases, optimization, and deep understanding'
    };

    const prompt = `You are an expert quiz designer. Create a ${difficulty} difficulty multiple-choice question for:

Module: ${moduleTitle}
Topics: ${topics.join(', ')}
Difficulty Level: ${difficulty} - ${difficultyGuidance[difficulty]}

Generate a single quiz question in this EXACT JSON format:
{
  "question": "Clear, specific question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Detailed explanation of why the answer is correct and others are wrong",
  "difficulty": "${difficulty}",
  "topic": "specific topic from the list"
}

IMPORTANT Requirements:
- Question should be practical and scenario-based when possible
- All 4 options should be plausible
- Explanation should be educational and comprehensive
- If you need to include code in the question, options, or explanation, escape all special characters properly
- All strings must be valid JSON strings (escape quotes, newlines, and backslashes)
- Return ONLY valid JSON, no markdown formatting or code blocks
- DO NOT include code snippets with triple backticks inside the JSON`;

    let response;
    try {
      const result = await this.model.generateContent(prompt);
      response = result.response.text();

      console.log('\n❓ Gemini Question Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 300) + (response.length > 300 ? '...' : ''));
      console.log('─'.repeat(80));

      // Extract and clean JSON from response
      const jsonText = this.extractJSON(response);

      const questionData = JSON.parse(jsonText);

      // Validate required fields
      if (!questionData.question || !Array.isArray(questionData.options) ||
        questionData.correctIndex === undefined || !questionData.explanation) {
        throw new Error('Invalid question format: missing required fields');
      }

      // Add unique ID
      questionData.id = `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      console.log('\n✅ Generated', questionData.difficulty, 'question on topic:', questionData.topic || 'N/A', '\n');

      return questionData;
    } catch (error) {
      console.error(`\n❌ Error generating question (attempt ${retryCount + 1}/${maxRetries + 1}):`, error.message);

      // Retry with a simpler prompt if we haven't exceeded max retries
      if (retryCount < maxRetries) {
        console.log(`🔄 Retrying question generation...\n`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return this.generateQuestion(moduleTitle, topics, difficulty, retryCount + 1);
      }

      console.error('Response that failed to parse:', response?.substring(0, 500));
      throw new Error('Failed to generate question from AI after multiple attempts');
    }
  }

  /**
   * Generate module completion report with insights
   * @param {object} moduleData - Module information
   * @param {object} performance - User performance stats
   * @returns {Promise<object>} Completion report with recommendations
   */
  async generateModuleReport(moduleData, performance) {
    const { accuracy, totalQuestions, correctAnswers, timeSpent, difficultyBreakdown } = performance;

    const prompt = `You are a learning analytics expert. Generate a completion report for:

Module: ${moduleData.title}
Performance:
- Accuracy: ${accuracy}%
- Questions Answered: ${totalQuestions}
- Correct Answers: ${correctAnswers}
- Time Spent: ${timeSpent} minutes
- Difficulty Breakdown: ${JSON.stringify(difficultyBreakdown)}

Generate a JSON report with:
{
  "overallScore": 85,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["area 1", "area 2"],
  "recommendations": ["next step 1", "next step 2"],
  "suggestedResources": [
    {
      "title": "Resource name",
      "type": "article/video/tutorial",
      "url": "https://example.com",
      "reason": "Why this resource is helpful"
    }
  ],
  "careerReadinessImpact": "Brief assessment of how this module contributes to career readiness"
}

Provide honest, constructive feedback. Return ONLY valid JSON.`;

    let response;
    try {
      const result = await this.model.generateContent(prompt);
      response = result.response.text();

      console.log('\n📊 Gemini Report Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 400) + (response.length > 400 ? '...' : ''));
      console.log('─'.repeat(80));

      // Extract and clean JSON from response
      const jsonText = this.extractJSON(response);

      const reportData = JSON.parse(jsonText);

      console.log('\n✅ Generated report with score:', reportData.overallScore || 'N/A', '\n');

      return reportData;
    } catch (error) {
      console.error('\n❌ Error generating report:', error.message);
      if (response) {
        console.error('Response that failed to parse:', response.substring(0, 500));
      }
      throw new Error('Failed to generate completion report');
    }
  }

  /**
   * Generate study material for a module
   * @param {string} moduleTitle - Title of the module
   * @param {Array} topics - Key topics/concepts to cover
   * @param {string} subject - The subject (e.g., "Mahabharata", "JavaScript")
   * @returns {object} Structured study material
   */
  async generateStudyMaterial(moduleTitle, topics, subject) {
    const topicsList = Array.isArray(topics) ? topics.join(', ') : topics;

    const prompt = `You are an expert educator creating comprehensive study material for the module "${moduleTitle}" in the subject "${subject}".

Topics to cover: ${topicsList}

Generate detailed, well-structured study material that a student can read and learn from BEFORE taking a quiz. The content should be educational, clear, and thorough.

Return ONLY valid JSON in this exact format:
{
  "overview": "A 2-3 sentence introduction to what this module covers and why it matters.",
  "sections": [
    {
      "title": "Section heading",
      "content": "Detailed educational content in plain text. This should be 3-5 paragraphs of actual teaching material, explaining concepts clearly with examples. Use simple language. Each section should thoroughly cover one sub-topic.",
      "keyTakeaways": ["Key point 1", "Key point 2", "Key point 3"]
    }
  ],
  "summary": "A concise 2-3 sentence recap of the most important concepts from this module.",
  "furtherReading": [
    {
      "title": "Resource name",
      "description": "Brief description of what this resource covers"
    }
  ]
}

IMPORTANT RULES:
- Generate 3-5 sections covering the main topics
- Each section's "content" should be substantial (at least 3 paragraphs of real educational content)
- Make content specific to "${subject}" - do NOT generate generic placeholder text
- Include real facts, concepts, and explanations
- Key takeaways should be specific and useful
- Further reading should suggest 2-3 relevant resources
- Return ONLY valid JSON, no markdown wrapping`;

    let response;
    try {
      const result = await this.model.generateContent(prompt);
      response = result.response.text();

      console.log('\n📚 Gemini Study Material Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 400) + (response.length > 400 ? '...' : ''));
      console.log('─'.repeat(80));

      const jsonText = this.extractJSON(response);
      const studyData = JSON.parse(jsonText);

      console.log('\n✅ Generated study material:', studyData.sections?.length || 0, 'sections\n');

      return studyData;
    } catch (error) {
      console.error('\n❌ Error generating study material:', error.message);
      if (response) {
        console.error('Response that failed to parse:', response.substring(0, 500));
      }
      throw new Error('Failed to generate study material');
    }
  }
}

export default new GeminiService();
