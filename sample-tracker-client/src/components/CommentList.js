import React from "react";

const CommentList = ({comments}) => {
    const reversedComments = [...comments].reverse();

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {reversedComments.map((comment, index) => (
                    <li key={index}>
                        <span className="timestamp">{new Date(comment.timestamp).toLocaleDateString()}</span>
                        <span>{comment.user ? comment.user.username : 'Anonymous'}</span>
                        <span>{comment.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;