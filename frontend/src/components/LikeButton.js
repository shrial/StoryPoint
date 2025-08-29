import React, { useState, useEffect } from 'react';
import API from '../api';

const LikeButton = ({ storyId, initialLikes, user }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(user ? likes.includes(user.id) : false);
    }, [likes, user]);

    const handleLike = async () => {
        if (!user) {
            alert('You must be logged in to like a story.');
            return;
        }
        try {
            const response = await API.post(`/stories/${storyId}/like`);
            setLikes(response.data);
        } catch (error) {
            console.error('Failed to like story', error);
        }
    };

    return (
        <button onClick={handleLike} className={`like-btn ${isLiked ? 'liked' : ''}`}>
            <svg xmlns="http://www.w.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{likes.length}</span>
        </button>
    );
};
export default LikeButton;