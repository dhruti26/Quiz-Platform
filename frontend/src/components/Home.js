import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [quizzes, setQuizzes] = useState([]);

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

    return (
        <div className="home">
            <h1 className="text-center mb-4">Welcome to Quiz Platform</h1>
            <div className="row">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="col-md-4 mb-4">
                            <div className="card quiz-card">
                                <div className="card-body">
                                    <h5 className="card-title">{quiz.title}</h5>
                                    <p className="card-text">Number of Questions: {quiz.questions.length}</p>
                                    <Link to="/take" className="btn btn-primary">Take Quiz</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No quizzes available. Please create one!</p>
                )}
            </div>
        </div>
    );
}

export default Home;
