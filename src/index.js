import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { GoogleOAuthProvider } from '@react-oauth/google';

// axios에 쿠키 포함 설정
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
