// backend/routes/questionRoutes.js
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
      { $match: match },
      { $sample: { size: parseInt(limit, 10) } }
    ];

    const questions = await Question.aggregate(pipeline);
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Server error fetching questions' });
  }
});

export default router;