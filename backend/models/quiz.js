// models/quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: String,
    questions: [
        {
            question: String,
            options: [String],
            correctAnswer: String,
        },
    ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
