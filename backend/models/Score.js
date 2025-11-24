// backend/models/Score.js schema setup
import mongoose from "mongoose"

// Defines how a player's score is stored in MongoDB
const scoreSchema = new mongoose.Schema(
    {
        name: { type : String, required: true },
        score: { type : String, required: true },
        totalQuestions: { type: Number, required: true}
    },
    { timestamps: true } // add createdAt and updatedAt
);

// Each time someone saves their result, we create one Score document.

const Score = mongoose.model("Score", scoreSchema);

export default Score; 