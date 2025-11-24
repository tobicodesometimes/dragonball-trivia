// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import questionRoutes from "./routes/questionRoutes.js"
import scoreRoutes from "./routes/scoreRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors()); // lets frontend (other origin) call the API
app.use(express.json()); // parses our request bodies 

//Routes
app.use("/api/questions", questionRoutes); // this route triggers our questionRoute
app.use("/api/scores", scoreRoutes); // this route triggers our scoreRoute

//Root test route 
app.get("/", (req, res) => {
    res.send("Dragon Ball Trivia API is running");
});

// Connect to Mongo and start server 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });