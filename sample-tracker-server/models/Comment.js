const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    project: String,
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Comment', CommentSchema);