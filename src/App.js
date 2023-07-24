import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';



function App() {
    const [user] = useAuthState(auth);
    return (
        <Router>
            {
                !user ?
                    <Login /> :
                    <>
                        <Header />
                        <AppBody>
                            <Sidebar />
                            <Chat />
                        </AppBody>
                    </>
            }
        </Router >
    );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`