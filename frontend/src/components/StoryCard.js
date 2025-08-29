import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
    const snippet = story.content.substring(0, 150) + (story.content.length > 150 ? '...' : '');

    return (
        <div className="card">
            <h2 style={{color: '#110068ff',fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem'}}>{story.title}</h2>
            <p style={{color: '#ffffffff', marginBottom: '1rem', fontWeight: 500,fontSize: '1.1rem'}}>by {story.author?.username || 'Anonymous'}</p>
            <p style={{color: '#000000ff', marginBottom: '1rem',fontWeight:'500'}}>{snippet}</p>
            <Link to={`/stories/${story._id}`} className="link">
                Read More &rarr;
            </Link>
        </div>
    );
};
export default StoryCard;