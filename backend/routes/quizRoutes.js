const express = require('express');
const Quiz = require('../models/quiz');

const router = express.Router();

router.post('/quizzes', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
