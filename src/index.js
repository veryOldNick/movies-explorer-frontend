import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import Movies from './components/Movies/Movies';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='body'>
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
