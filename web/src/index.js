import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux';
import store from './components/redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='1004261782493-85h6acr55sfjv0usi1o98s62h6n3c6ev.apps.googleusercontent.com'>

      <React.StrictMode>
        <App />
      </React.StrictMode>

    </GoogleOAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals