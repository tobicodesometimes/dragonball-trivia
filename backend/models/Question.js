import mongoose from "mongoose"

// backend/models/Question.js schema setup 

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: String, required: true },
    correctIndex: { type: Number, required: true},
    category: { type: String, default: "Dragon Ball"},
    difficulty: { type: String, default: "easy" }
});

const Question = mongoose.model("Question", questionSchema);

export default Question; 