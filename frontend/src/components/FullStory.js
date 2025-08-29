import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

const FullStory = ({ user }) => {
    const { storyId } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStory = async () => {
            try {
                setError('');
                setLoading(true);
                const response = await API.get(`/stories/${storyId}`);
                setStory(response.data);
            } catch (err) {
                setError('Story not found or could not be loaded.');
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [storyId]);

    if (loading) return <p style={{textAlign: 'center', marginTop: '2rem'}}>Loading story...</p>;
    if (error) return <p style={{textAlign: 'center', color: 'red', marginTop: '2rem'}}>{error}</p>;
    if (!story) return null;

    const handleCommentPosted = () => {
         API.get(`/stories/${storyId}`).then(response => {
            setStory(response.data);
        });
    };

    return (
        <div className="container">
            <div className="card">
                <h1 style={{color: '#110068ff',fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem'}}>{story.title}</h1>
                <p style={{color: '#ffffffff', marginBottom: '1.5rem',fontWeight:'bold'}}>by {story.author?.username || 'Anonymous'}</p>
                <div className="story-content">
                    {story.content}
                </div>
                <div style={{marginTop: '2rem', display: 'flex', alignItems: 'center'}}>
                    <LikeButton storyId={story._id} initialLikes={story.likes} user={user} />
                </div>
            </div>
            <CommentSection 
                storyId={story._id} 
                initialComments={story.comments} 
                user={user} 
                onCommentPosted={handleCommentPosted} 
            />
        </div>
    );
};
export default FullStory;