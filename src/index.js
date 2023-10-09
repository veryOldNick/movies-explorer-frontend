import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import MoviesCardList from './components/Movies/MoviesCardList/MoviesCardList';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='body'>
        {/* <App /> */}
        <MoviesCardList />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
