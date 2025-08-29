import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed.');
        }
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Login</h2>
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '1rem'}}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
                    </div>
                    <div style={{marginBottom: '1.5rem'}}>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
                    </div>
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p style={{textAlign: 'center', marginTop: '1rem'}}>
                    Don't have an account? <Link to="/register" className="link">Register</Link>
                </p>
            </div>
        </div>
    );
};
export default Login;
