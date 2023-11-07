require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Comment = require('./models/Comment');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: "*"
    },
});

app.use(express.json());
app.use(cors());

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.eilpw.mongodb.net/sample_tracker?retryWrites=true&w=majority`;

const handleError = (err) => {
    console.log('Error');
    console.log(err);
};

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB database');
}).catch((error) => {
    console.log('MongoDB connection error', error);
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('openProject', async ({project}) => {
        socket.join(project);

        const comments = await Comment.find({project})
            .sort({timestamp: -1})
            .limit(15)
            .populate('user', 'username')

        socket.emit('previousComments', comments);
    });

    socket.on('addComment', async ({ project, comment, userId }) => {
        console.log('comment received')
        const user = await User.findById(userId).catch(handleError);

        if(!user) {
            console.log('User not found');
            return;
        };

        const newComment = new Comment({
            project,
            content: comment,
            user: userId,
        });

        await newComment.save();
        await newComment.populate('user', 'username');

        io.to(project).emit('newComment', newComment);
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })

});

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, email, password: hashedPassword});
    await user.save();
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY);
    res.send({token, username});
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.status(404).send('User not found');
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid password');
    };

    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY);

});

server.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});