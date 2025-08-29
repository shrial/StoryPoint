import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


import './App.css';


import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import FullStory from './components/FullStory';
import StoryForm from './components/StoryForm';
import UserProfile from './components/UserProfile';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) { return <Navigate to="/login" />; }
    return children;
};

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                setUser(decodedUser.user);
            } catch (error) {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <Router>
            <Navbar token={token} setToken={setToken} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register setToken={setToken} />} />
                    <Route path="/stories/:storyId" element={<FullStory user={user} />} />
                    <Route path="/write" element={<ProtectedRoute><StoryForm /></ProtectedRoute>} />
                    <Route path="/profile/:userId" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                {user ? <Navigate to={`/profile/${user.id}`} /> : <Navigate to="/login" />}
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}
export default App;
