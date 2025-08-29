import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
    const snippet = story.content.substring(0, 150) + (story.content.length > 150 ? '...' : '');

    return (
        <div className="card">
            <h2 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem'}}>{story.title}</h2>
            <p style={{color: '#4b5563', marginBottom: '1rem'}}>by {story.author?.username || 'Anonymous'}</p>
            <p style={{color: '#1f2937', marginBottom: '1rem'}}>{snippet}</p>
            <Link to={`/stories/${story._id}`} className="link">
                Read More &rarr;
            </Link>
        </div>
    );
};
export default StoryCard;