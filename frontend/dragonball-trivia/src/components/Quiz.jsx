// src/components/Quiz.jsx Renders one question at a time. 
// uses props from App.jsx = question, currentIndex, totalQuestions, score and onAnswer(index) callback when a user picks an option.

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

// displays current question, the question text and maps question.options into buttons.
// When you click an option, it calls onAnswer(index) which lives in App then updates score and advances.
// No direct backend call from here; just UI + state callbacks.

export default Quiz;
