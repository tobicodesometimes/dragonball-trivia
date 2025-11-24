// src/components/StartScreen.jsx Our Landing Screen
function StartScreen ({onStart, loading, error}) {
    return (
        // Welcome msg & Start Quiz button which calls onStart on App.jsx then triggers startGame() 
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