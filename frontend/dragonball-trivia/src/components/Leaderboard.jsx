// src/components/Leaderboard.jsx Shows top score pulled from backend.
import { useEffect, useState } from "react";

function Leaderboard({ apiBaseUrl, onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Our mounted useEffect calls the score route, queries for our top 10 scores then our component displays them in a list. 
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/scores/top`);
        if (!res.ok) throw new Error("Failed request");
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [apiBaseUrl]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ol>
          {scores.map((entry) => (
            <li key={entry._id}>
              {entry.name} – {entry.score}/{entry.totalQuestions}
            </li>
          ))}
        </ol>
      )}

      <button onClick={onBack}>Back to Home</button>
    </div>
  );
}

export default Leaderboard;
