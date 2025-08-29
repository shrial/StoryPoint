import React, { useState, useEffect } from 'react';
import API from '../api';

const CommentSection = ({ storyId, initialComments, user, onCommentPosted }) => {
    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to comment.');
            return;
        }
        if (!newComment.trim()) return;

        try {
            await API.post(`/stories/${storyId}/comments`, { text: newComment });
            setNewComment('');
            if(onCommentPosted) onCommentPosted();
        } catch (error) {
            console.error('Failed to post comment', error);
        }
    };

    return (
        <div className="card">
            <h3 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem'}}>Comments ({comments.length})</h3>
            {user && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="input-field"
                    />
                    <button type="submit" className="btn-primary">Post</button>
                </form>
            )}
            <div className="comments-list">
                {comments.length > 0 ? comments.map(comment => (
                    <div key={comment._id}>
                        <p style={{fontWeight: 600}}>{comment.user?.username || 'Anonymous'}</p>
                        <p style={{color: '#374151'}}>{comment.text}</p>
                    </div>
                )).reverse() : <p>No comments yet.</p>}
            </div>
        </div>
    );
};
export default CommentSection;