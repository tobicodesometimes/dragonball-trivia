// src/components/ResultScreen.jsx
import { useState } from 'react';

function ResultScreen({ score, totalQuestions, onPlayAgain, onViewLeaderboard, apiBaseUrl }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!name) {
      setError('Please enter a name.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch(`${apiBaseUrl}/api/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          score,
          totalQuestions
        })
      });

      if (!res.ok) {
        throw new Error('Failed to save score');
      }

      setSaved(true);
    } catch (err) {
      console.error(err);
      setError('Could not save score. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="result">
      <h2>Quiz Complete!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>

      {!saved && (
        <div className="save-score">
          <p>Save your score to the leaderboard:</p>
          <input
            type="text"
            placeholder="Enter a nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Score'}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {saved && <p>Score saved!</p>}

      <div className="result-buttons">
        <button onClick={onPlayAgain}>Play Again</button>
        <button onClick={onViewLeaderboard}>View Leaderboard</button>
      </div>
    </div>
  );
}

export default ResultScreen;

