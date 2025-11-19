// backend/routes/scoreRoutes.js
import express from 'express';
import Score from '../models/Score.js';

const router = express.Router();

// POST /api/scores
router.post('/', async (req, res) => {
  try {
    const { name, score, totalQuestions } = req.body;

    if (!name || score == null || totalQuestions == null) {
      return res
        .status(400)
        .json({ message: 'name, score, and totalQuestions are required' });
    }

    const newScore = await Score.create({ name, score, totalQuestions });
    res.status(201).json(newScore);
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ message: 'Server error saving score' });
  }
});

// GET /api/scores/top
router.get('/top', async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1, createdAt: 1 })
      .limit(10)
      .lean();

    res.json(topScores);
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).json({ message: 'Server error fetching top scores' });
  }
});

export default router;
