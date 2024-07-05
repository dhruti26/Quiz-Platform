import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TakeQuiz.css';

function TakeQuiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(0);
    };

    const handleOptionChange = (questionId, selectedOption) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: selectedOption,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newScore = 0;
        selectedQuiz.questions.forEach((question) => {
            if (selectedAnswers[question._id] === question.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        setSubmitted(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Take a Quiz</h2>
            {selectedQuiz ? (
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">{selectedQuiz.title}</h3>
                    {selectedQuiz.questions.map((question, qIndex) => (
                        <div key={question._id} className="mb-4 question-card">
                            <h5>{qIndex + 1}. {question.question}</h5>
                            {question.options.map((option, index) => (
                                <div key={index} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        checked={selectedAnswers[question._id] === option}
                                        onChange={() => handleOptionChange(question._id, option)}
                                    />
                                    <label className="form-check-label">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary mt-3">Submit Quiz</button>
                    {submitted && (
                        <div className="mt-4">
                            <h3 className="text-center">Your Score: {score} / {selectedQuiz.questions.length}</h3>
                            <div className="text-center">
                                <button className="btn btn-secondary" onClick={() => setSelectedQuiz(null)}>Take Another Quiz</button>
                            </div>
                        </div>
                    )}
                </form>
            ) : (
                <div className="quiz-list">
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <div key={quiz._id} className="card quiz-card mb-4" onClick={() => handleQuizSelect(quiz)}>
                                <div className="card-body">
                                    <h5 className="card-title">{quiz.title}</h5>
                                    <p className="card-text">Number of Questions: {quiz.questions.length}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Loading quizzes...</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default TakeQuiz;
