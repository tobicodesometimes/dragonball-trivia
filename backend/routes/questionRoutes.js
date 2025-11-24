// backend/routes/questionRoutes.js Handles all our question routes. 
import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// GET /api/questions?category=&difficulty=&limit=10
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, limit = 10 } = req.query;

    const match = {};
    if (category) match.category = category;
    if (difficulty) match.difficulty = difficulty;

    const pipeline = [
      { $match: match }, // filter (if provided)
      { $sample: { size: parseInt(limit, 10) } } // randomizes our questions
    ];

    const questions = await Question.aggregate(pipeline);
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Server error fetching questions' });
  }
});

// we use limit to filter how many questions we want
// match and sample randomizes our questions 
// then we send them back as JSON

export default router;