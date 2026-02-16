import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Injects the Redux store into React
import store from './redux/store'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrapping App in Provider makes Redux state available everywhere */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);