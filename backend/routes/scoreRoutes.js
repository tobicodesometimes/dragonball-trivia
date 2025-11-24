// backend/routes/scoreRoutes.js Handles all our scoreRoutes 
import express from 'express';
import Score from '../models/Score.js';

const router = express.Router();

// POST /api/scores
// Saves a new score 
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
// gets top scores
router.get('/top', async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1, createdAt: 1 })
      .limit(10)
      .lean(); // returns plain js objs instead of full Mongoose doc instances (faster). 

    res.json(topScores);
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).json({ message: 'Server error fetching top scores' });
  }
});

// POST /api/scores = ResultScreen uses this to save our score.
// GET /api/scores/top = Leaderboard uses this to show the top 10.

export default router;
