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
                setComments((prevComments) => [...prevComments, comment])
            });

            socket.on('previousComments', (prevComments) => {
                setComments(prevComments);
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

    const handleLogin = (token, username) => {
        localStorage.setItem('token', token);
        setToken(token);
        localStorage.setItem('username', username);
        setUsername(username);
        setIsAuthenticated(true);
    };

    const handleSignup = (token, username) => {
        localStorage.setItem('token', token);
        setToken(token);
        localStorage.setItem('username', username);
        setUsername(username);
        setIsAuthenticated(true);        
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setToken(null);
        setUsername(null);
        socket.disconnect();
    };

    const openProject = (project) => {
        setCurrentProject(project);
        socket.emit('openProject', {project});
    };

    const addComment = (comment) => {
        if(token) {
            const decodedToken = jwtDecode(token);

            const userId = decodedToken.userId;

            socket.emit('addComment', { project: currentProject, comment, userId });
            console.log(`comment emitted: ${currentProject}, ${comment}, ${userId}`)
        };
    };

    return (
        <div className="App">
            {isAuthenticated ? (
                <>
                    <span>Welcome, {username}</span>
                    <button onClick={handleLogout}>Logout</button>
                    <ProjectList projects={projects} openProject={openProject} />
                    {currentProject && (
                        <>
                            <h1>Current Project: {currentProject}</h1>
                            <CommentList comments={comments} />
                            <CommentInput addComment={addComment} />
                        </>
                    )} 
                </>
            ) : (
                <>
                    <h1>Login</h1>
                    <LoginForm onLogin={handleLogin} />
                    <h1>Signup</h1>
                    <SignupForm onSignup={handleSignup} />
                </>
            )}
        </div>
    );

};

export default AppContent;


