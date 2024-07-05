import React, { useState } from 'react';
import axios from 'axios';
import './CreateQuiz.css';

function CreateQuiz() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleQuestionChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].question = e.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswer = e.target.value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const quiz = { title, questions };
        try {
            await axios.post('http://localhost:5000/quizzes', quiz);
            setTitle('');
            setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
            alert('Quiz created successfully!');
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create a Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Quiz Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="card mt-4 question-card">
                        <div className="card-body">
                            <div className="form-group">
                                <label>Question {qIndex + 1}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={question.question}
                                    onChange={(e) => handleQuestionChange(qIndex, e)}
                                    required
                                />
                            </div>
                            {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="form-group">
                                    <label>Option {oIndex + 1}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                        required
                                    />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Correct Answer</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={question.correctAnswer}
                                    onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                                    required
                                />
                            </div>
                            {questions.length > 1 && (
                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveQuestion(qIndex)}>
                                    Remove Question
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mt-3" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button type="submit" className="btn btn-primary mt-3 ml-2">
                    Create Quiz
                </button>
            </form>
        </div>
    );
}

export default CreateQuiz;
