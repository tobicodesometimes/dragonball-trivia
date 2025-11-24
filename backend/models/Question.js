// backend/models/Question.js schema setup 
import mongoose from "mongoose"

// Defines how our question is stored in MongoDB
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true }, // e.g 4 options & our array of answers.
    correctIndex: { type: Number, required: true}, // 0-3
    category: { type: String, default: "Dragon Ball"},
    difficulty: { type: String, default: "easy" }
});

// This becomes the questions collection in Mongo.
// The rest of the backend uses this model to read/write question docs.

const Question = mongoose.model("Question", questionSchema);

export default Question; 