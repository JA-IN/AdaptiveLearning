import express from 'express';
import { generateRoadmap, getRoadmap, generateStudyMaterial } from '../controllers/roadmapController.js';

const router = express.Router();

// POST /api/roadmap/generate - Generate new roadmap
router.post('/generate', generateRoadmap);

// POST /api/roadmap/study-material - Generate study material for a module
router.post('/study-material', generateStudyMaterial);

// GET /api/roadmap/:sessionId - Get existing roadmap
router.get('/:sessionId', getRoadmap);

export default router;
