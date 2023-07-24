import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";

export default function Login() {
    const signIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log(error)
                // ...
            });
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img
                    src="http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png"
                    alt=""
                />
                <h1>Sign in</h1>
                <p>hillary.slack.com</p>
                <Button onClick={signIn}>Sign in with google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`
const LoginInnerContainer = styled.div`
  padding:100px;
  text-align:center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 25%;
  >img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
  `