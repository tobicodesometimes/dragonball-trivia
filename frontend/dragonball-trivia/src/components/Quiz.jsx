// src/components/Quiz.jsx
function Quiz({ question, currentIndex, totalQuestions, score, onAnswer }) {
  if (!question) return null;

  return (
    <div className="quiz">
      <p>
        Question {currentIndex + 1} / {totalQuestions}
      </p>
      <h2>{question.questionText}</h2>

      <div className="options">
        {question.options.map((opt, index) => (
          <button key={index} onClick={() => onAnswer(index)}>
            {opt}
          </button>
        ))}
      </div>

      <p>Score: {score}</p>
    </div>
  );
}

export default Quiz;
