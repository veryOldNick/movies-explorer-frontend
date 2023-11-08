import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate, Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRouteElement } from '../ProtectedRoute/ProtectedRoute'

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { checkToken, getUserInfo, getSavedMovies} from '../../utils/MainApi'

function App() {
  const {pathname} =useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', ownerId: '' });
  const [isTokenOk, setIsTokenOk] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [notMoviesResult, setNotMoviesResult] = useState(false);
  const [checkedShort, setCheckedShort] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email, ownerId: res._id });
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            localStorage.setItem('ownerId', res._id);
            setLoggedIn(true);
            setIsTokenOk(true);
            navigate(pathname, { replace: true });
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);
  
  useEffect(() => {
    if (loggedIn) {
      getUserInfo()
        .then((userInfo) => {          
          setCurrentUser({
            _id: userInfo.data._id,
            name: userInfo.data.name,
            email: userInfo.data.email,          
          });
        })
        .catch(err => { console.log(err) })
    }
  }, [loggedIn]);
  
  useEffect(() => {
    if (loggedIn) {
      if (pathname === '/signup' || pathname === '/signin') {
        navigate('/movies', { replace: true });
      }
    }
  }, [pathname, loggedIn])


  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          setLikedMovies(res.filter(movie => movie.owner === currentUser.ownerId));
          console.log('успех')
        })
        .catch((err) => {
          console.log(err);
        })
    }  
  }, [isTokenOk])

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('movieSearchText');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('checkedShort');
    localStorage.removeItem('ownerId');
    setLoggedIn(false);
    setIsTokenOk(false);
    setCurrentUser({ name: '', email: '', ownerId: '' });
    setMovies([]);
    setSearchedMovies([]);
    setNotMoviesResult(false);
    navigate('/', { replace: true });
  }


  function handleNotMoviesResult(shorMovies, SearchedResultMovies) {
    if (movies[0]) {
      if (checkedShort) {
        shorMovies.length === 0 ?
          setNotMoviesResult(true) :
          setNotMoviesResult(false);
      } else {
        SearchedResultMovies.length === 0 ?
          setNotMoviesResult(true) :
          setNotMoviesResult(false);
      }
    }
  } 
  
  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup'element={
          <Register 
          setLoggedIn={setLoggedIn}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setCurrentUser={setCurrentUser}
          />}
        />
        <Route path='/signin' element={
          <Login 
          setLoggedIn={setLoggedIn} 
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setCurrentUser={setCurrentUser} />} 
        />
        <Route path='/movies' element={
            <ProtectedRouteElement
            element={Movies}
            movies={movies}
            setMovies={setMovies}
            loggedIn={loggedIn}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            searchedMovies={searchedMovies}
            setSearchedMovies={setSearchedMovies}
            notMoviesResult={notMoviesResult}
            setNotMoviesResult={setNotMoviesResult}
            checkedShort={checkedShort}
            setCheckedShort={setCheckedShort}
            handleNotMoviesResult={handleNotMoviesResult}
            />}
        />
        <Route path='/saved-movies' element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
              notMoviesResult={notMoviesResult}
              setNotMoviesResult={setNotMoviesResult}
            />} 
        />
        <Route path='/profile' element={
            <ProtectedRouteElement 
              element={Profile}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
              onSignOut={onSignOut}
            />}
          />
        <Route exact path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
