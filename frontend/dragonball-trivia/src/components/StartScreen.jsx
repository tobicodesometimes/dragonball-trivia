// src/components/StartScreen.jsx
function StartScreen ({onStart, loading, error}) {
    return (
        <div className = "start-screen">
            <p>Test your Dragon Ball knowledge!</p>
            {error && <p className = "error"> {error} </p>}
            <button onClick = {onStart} disabled={loading}>
            {loading ? 'Loading questions...' : 'Start Quiz'}
            </button>
        </div>
    );
}

export default StartScreen; 