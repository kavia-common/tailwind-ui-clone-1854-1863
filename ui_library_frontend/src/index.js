import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Safely read env variables (defaults if unset)
const env = {
  REACT_APP_API_BASE: process.env.REACT_APP_API_BASE || '',
  REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL || '',
  REACT_APP_FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || '',
  REACT_APP_WS_URL: process.env.REACT_APP_WS_URL || '',
  REACT_APP_NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development',
};

if (env.REACT_APP_NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.debug('Environment (safe):', env);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
