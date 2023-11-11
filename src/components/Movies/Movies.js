import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getAllMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader'

function Movies() {
  const [movies, setAllMovie] = useState([]); // фильмы с серера
  const [preloaderOn, setPreloaderOn] = useState(false); // установка флага прелоадера


  // Получение карточек фильмов с сервера
  useEffect(() =>{
    getAllMovies()
      .then((res) => {setAllMovie(res)})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreloaderOn(false);
      })
      
  },[]);


  // console.log(movies);

  return (
    // <main className='movies' aria-label='коллекция'>
    //   <SearchForm />
    //   <MoviesCardList />
    // </main>
    <main className='movies' aria-label='Страница поиска фильмов'>
    <SearchForm
    />
    {preloaderOn ? <Preloader /> :
    <MoviesCardList
      movies={movies}
    />}
  </main>
  );
}

export default Movies;
