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

import { checkToken, getUserInfo, getSavedMovies, saveMovie, deleteMovie,} from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';

function App() {
  const {pathname} =useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false); // статус логина
  const [isLoading, setIsLoading] = useState(false); // статус загрузки
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', ownerId: '' }); // текущий юзер 
  const [likedMovies, setLikedMovies] = useState([]); // любимые фильмы
  const [movies, setAllMovie] = useState([]); // фильмы с серера

    
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

    // Получение карточек фильмов 
    useEffect(() => {
      function loadAllMovies() {
        setIsLoading(true);
        getAllMovies()
          .then((res) => {setAllMovie(res)})
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          })        
    };

    function loadLikeMovies() {
      setIsLoading(true);
      getSavedMovies()
        .then((data) => {
          setLikedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (loggedIn) {
      loadAllMovies();
      loadLikeMovies();
    }
    
    if (loggedIn) {
      loadAllMovies();
      loadLikeMovies();
    }
  }, [loggedIn]);

 // Выход авторизованого пользователя
  function onSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '', ownerId: '' });
    setAllMovie([]);  //??
    navigate('/', { replace: true });
  };

 function savedMovieList(movie) {
    saveMovie(movie)
      .then((userMovie) => {
        setLikedMovies([userMovie, ...likedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function deleteMovieToList(movie) {
    const movieToDelete = likedMovies.find(
      (m) => movie.id === m.movieId || movie.movieId === m.movieId,
    );
    deleteMovie(movieToDelete._id)
      .then((removedMovie) => {
        setLikedMovies((state) =>
          state.filter((item) => item._id !== removedMovie._id),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup'element={
          <Register
            // V
            setLoggedIn={setLoggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setCurrentUser={setCurrentUser}
          />
        }/>
        <Route path='/signin' element={
          <Login
            // V
            setLoggedIn={setLoggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setCurrentUser={setCurrentUser} 
          />
        }/>
        <Route path='/movies' element={
            <ProtectedRouteElement
              element={Movies} //
              allMovies={movies} //
              likedMovies={likedMovies} //
              isLoading={isLoading} //
              loggedIn={loggedIn} //
              savedMovieList={savedMovieList}
              deleteMovieToList={deleteMovieToList}            
            />}
        />
        <Route path='/saved-movies' element={
            <ProtectedRouteElement
              allMovies={movies}
              element={SavedMovies}
              loggedIn={loggedIn} //
              likedMovies={likedMovies} //
              isLoading={isLoading} //     
              savedMovieList={savedMovieList}
              deleteMovieToList={deleteMovieToList} 
            />} 
        />
        <Route path='/profile' element={ 
            <ProtectedRouteElement 
              // V
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
