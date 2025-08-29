import React, { useState, useEffect } from 'react';
import API from '../api';
import StoryCard from './StoryCard';

const Home = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await API.get('/stories');
                setStories(response.data);
            } catch (err) {
                setError('Could not fetch stories.');
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    if (loading) return <p style={{textAlign: 'center', marginTop: '2rem',color:'rgb(255,255,255)'}}>Loading stories...</p>;
    if (error) return <p style={{textAlign: 'center', color: 'red', marginTop: '2rem'}}>{error}</p>;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 'bold',color:'rgb(255,255,255)'}}>Latest Stories</h1>
            {stories.length > 0 ? (
                stories.map(story => <StoryCard key={story._id} story={story} />)
            ) : (
                <p style={{textAlign: 'center', color: '#6b7280'}}>No stories have been written yet.</p>
            )}
        </div>
    );
};
export default Home;