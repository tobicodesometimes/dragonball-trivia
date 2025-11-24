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
  const [stage, setStage] = useState('start'); // stage – which screen we’re on: 'start' | 'quiz' | 'result' | 'leaderboard'.
  const [questions, setQuestions] = useState([]); // questions – array of question objects from the backend.
  const [currentIndex, setCurrentIndex] = useState(0); // currentIndex – which question we’re on.
  const [score, setScore] = useState(0); // score – how many correct answers so far.
  const [loading, setLoading] = useState(false); // loading for our state 
  const [error, setError] = useState(''); // handles our error messaging. 

  // Fetches questions from our backend 
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

  // Handles our answering. 
  const handleAnswer = (selectedIndex) => {
    const currentQuestion = questions[currentIndex];

    if (selectedIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
    // moves to the next question or result screen 
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
 
