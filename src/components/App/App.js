import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../Main/Main.js'
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const location = useLocation();
  
  // useEffect(
  //   () => {if (location.pathname === '/') {setLoggedIn(false)}}, [location]
  // );

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/signup' element={<Register setLoggedIn={setLoggedIn}/>}/>
        <Route path='/signin' element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/saved-movies' element={<SavedMovies/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route exact path='*' element={<NotFound/>}/>
      </Routes>
      <Footer />
    </div>    
  );
};

export default App;
