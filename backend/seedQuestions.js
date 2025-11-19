// backend/seedQuestions.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';

dotenv.config();

const questions = [
  {
    questionText: 'What is the name of Goku’s father?',
    options: ['Raditz', 'Bardock', 'King Vegeta', 'Nappa'],
    correctIndex: 1,
    category: 'Saiyan Saga',
    difficulty: 'easy'
  },
  {
    questionText: 'Who kills Frieza on Earth in Dragon Ball Z?',
    options: ['Goku', 'Future Trunks', 'Vegeta', 'Piccolo'],
    correctIndex: 1,
    category: 'Android Saga',
    difficulty: 'easy'
  },
  {
    questionText: 'What transformation does Gohan achieve during his fight with Cell?',
    options: ['Super Saiyan', 'Super Saiyan 2', 'Super Saiyan 3', 'Ultra Instinct'],
    correctIndex: 1,
    category: 'Cell Saga',
    difficulty: 'medium'
  },
  {
    questionText: 'Which Dragon Ball character is known as the “Prince of all Saiyans”?',
    options: ['Goku', 'Vegeta', 'Broly', 'Tarble'],
    correctIndex: 1,
    category: 'General',
    difficulty: 'easy'
  },
  {
    questionText: 'What is the name of the technique Goku learns from King Kai?',
    options: ['Destructo Disc', 'Special Beam Cannon', 'Spirit Bomb', 'Final Flash'],
    correctIndex: 2,
    category: 'Saiyan Saga',
    difficulty: 'easy'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB (seed)');

    // Clear existing questions if you want a clean slate
    await Question.deleteMany({});
    console.log('Cleared old questions');

    await Question.insertMany(questions);
    console.log('Inserted new Dragon Ball questions');

    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (err) {
    console.error('Error seeding questions:', err);
    process.exit(1);
  }
}

seed();
