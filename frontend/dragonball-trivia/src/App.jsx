// src/App.jsx
import { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import Leaderboard from './components/Leaderboard';
import './App.css';

// one-star Dragon Ball img
import oneStarBall from './assets/one_star_db.png';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [stage, setStage] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const startGame = async () => {
    setLoading(true);
    setError('');
    setScore(0);
    setCurrentIndex(0);

    try {
      const res = await fetch(`${API_BASE_URL}/api/questions?limit=10`);
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError('No questions found. Try seeding again.');
        return;
      }

      setQuestions(data);
      setStage('quiz');
    } catch (err) {
      console.error(err);
      setError('Could not load questions. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedIndex) => {
    const currentQuestion = questions[currentIndex];

    if (selectedIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setStage('result');
    }
  };

  const handlePlayAgain = () => setStage('start');
  const handleViewLeaderboard = () => setStage('leaderboard');
  const handleBackHome = () => setStage('start');

  return (
    <div className="app">
      {/*Title row: text + dragon ball */}
      <div className="app-title">
        <h1>Dragon Ball Trivia</h1>
        <img
          src={oneStarBall}
          alt="One-star Dragon Ball"
          className="app-title-icon"
        />
      </div>

      {stage === 'start' && (
        <StartScreen onStart={startGame} loading={loading} error={error} />
      )}

      {stage === 'quiz' && (
        <Quiz
          question={questions[currentIndex]}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          score={score}
          onAnswer={handleAnswer}
        />
      )}

      {stage === 'result' && (
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
          onViewLeaderboard={handleViewLeaderboard}
          apiBaseUrl={API_BASE_URL}
        />
      )}

      {stage === 'leaderboard' && (
        <Leaderboard apiBaseUrl={API_BASE_URL} onBack={handleBackHome} />
      )}
    </div>
  );
}

export default App;
 
