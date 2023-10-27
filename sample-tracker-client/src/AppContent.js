import React, { useState, useContext, useEffect } from "react";
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import ProjectList from './components/ProjectList';
import CommentList from './components/CommentList';
import CommentInput from './components/CommentInput';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import { AuthContext } from "./components/AuthContext";

const socket = io('http://localhost:8000');

function AppContent() {
    const [projects, setProject] = useState(['TF112-31', 'TF105-30', 'LL203-23']);
    const [currentProject, setCurrentProject] = useState(null);
    const [comments, setComments] = useState([]);
    const { isAuthenticated, setIsAuthenticated, setToken, token, username, setUsername } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            socket.connect();

            socket.on('connect', () => {
                console.log('Connected to server');
            });

            socket.on('newComment', (comment) => {
                setComments((prevComments) => [comment, ...prevComments])
            });

            socket.on('previousComments', (prevComments) => {
                setMessages(prevComments);
            })
        } else {
            socket.disconnect();
        };

        return () => {
            socket.off('connect');
            socket.off('newComment');
            socket.off('previousComments');
        };
    }, [isAuthenticated]);




};


