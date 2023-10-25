import React, { useState } from "react";

const CommentInput = ({addComment}) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        addComment(comment);

        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input  
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Comment</button>
        </form>
    );
} 

export default CommentInput;