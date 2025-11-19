// backend/models/Score.js schema setup
import mongoose from "mongoose"

const scoreSchema = new mongoose.Schema(
    {
        name: { type : String, required: true },
        score: { type : String, required: true },
        totalQuestions: { type: Number, required: true}
    },
    { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);

export default Score; 