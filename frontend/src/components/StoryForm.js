import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const StoryForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/stories', { title, content });
            navigate(`/stories/${response.data._id}`);
        } catch (err) {
            setError('Failed to publish story. Please try again.');
        }
    };

    return (
        <div className="form-container" style={{maxWidth: '800px'}}>
            <div className="card">
                <h2 style={{textAlign: 'center', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold'}}>Write Your Story</h2>
                {error && <p style={{color: '#ef4444', textAlign: 'center'}}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '1rem'}}>
                        <input
                            type="text"
                            placeholder="Story Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div style={{marginBottom: '1.5rem'}}>
                        <textarea
                            placeholder="Tell your story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="input-field"
                            style={{height: '20rem', resize: 'vertical'}}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Publish</button>
                </form>
            </div>
        </div>
    );
};
export default StoryForm;