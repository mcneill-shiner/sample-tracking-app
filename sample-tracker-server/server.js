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

app.use(express.json())
app.use(cors())

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.eilpw.mongodb.net/sample_tracker?retryWrites=true&w=majority`;

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
    })
});