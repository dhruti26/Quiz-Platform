import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Quiz Platform</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">Create Quiz</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/take">Take Quiz</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateQuiz />} />
                        <Route path="/take" element={<TakeQuiz />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
