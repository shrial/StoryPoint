import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import StoryCard from './StoryCard';

const UserProfile = () => {
    const { userId } = useParams();
    const [userStories, setUserStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserStories = async () => {
            try {
                const response = await API.get('/stories');
                const filteredStories = response.data.filter(story => story.author._id === userId);
                setUserStories(filteredStories);

                // Set the username from the first story found
                if (filteredStories.length > 0) {
                    setUsername(filteredStories[0].author.username);
                } else {
                    setUsername('User Profile');
                }
            } catch (err) {
                setError('Could not fetch user stories.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserStories();
    }, [userId]); 

    if (loading) return <p style={{textAlign: 'center', marginTop: '2rem'}}>Loading profile...</p>;
    if (error) return <p style={{textAlign: 'center', color: 'red', marginTop: '2rem'}}>{error}</p>;

    return (
        <div className="container">
            <h1 style={{color:'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>{username}'s Stories</h1>
            {userStories.length > 0 ? (
                userStories.map(story => <StoryCard key={story._id} story={story} />)
            ) : (
                <p style={{textAlign: 'center', color: '#6b7280'}}>This user has not written any stories yet.</p>
            )}
        </div>
    );
};

export default UserProfile;